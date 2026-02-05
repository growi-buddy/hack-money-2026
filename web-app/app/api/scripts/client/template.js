const apiBaseUrl = '{{API_BASE_URL}}';

// Extract campaignId from URL query parameter utm_id
function getCampaignIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('utm_id');
}

const campaignId = getCampaignIdFromUrl();

// Session ID management - persisted in localStorage, generated locally
function getOrCreateSessionId() {
  const STORAGE_KEY = 'growi_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);

  if (!sessionId) {
    sessionId = 'ses_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem(STORAGE_KEY, sessionId);
  }

  return sessionId;
}

// Fetch selectors for the campaign
async function fetchCampaignSelectors(campaignId) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/client/events-selectors?id=${campaignId}`
    );
    const data = await response.json();

    if (!data.success) {
      console.error('[GROWI] Error fetching selectors:', data.error);
      return [];
    }

    return data.data;
  } catch (error) {
    console.error('[GROWI] Error fetching selectors:', error);
    return [];
  }
}

// Send tracked event to the API
async function sendEvent(campaignRewardEventId, selectorEventType, metadata = {}) {
  try {
    const payload = {
      campaignRewardEventId,
      sessionId: getOrCreateSessionId(),
      userAgent: navigator.userAgent,
      data: {
        selectorEventType,
        url: window.location.href,
        ...metadata,
      },
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(
      `${apiBaseUrl}/api/client/event`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error('[GROWI] Error sending event:', data.error);
      return false;
    }

    console.log('[GROWI] Event tracked:', data.data.event.id);
    return true;
  } catch (error) {
    console.error('[GROWI] Error sending event:', error);
    return false;
  }
}

// Setup event listener for a selector
function setupEventListener(selectorData) {
  const { campaignRewardEventId, selector, selectorEventType, rewardEventName } = selectorData;

  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.warn(`[GROWI] No elements found for selector: ${selector}`);
    return;
  }

  elements.forEach(function(element) {
    switch (selectorEventType) {
      case 'ONCLICK':
        element.addEventListener('click', function(e) {
          console.log(`[GROWI] ONCLICK event: ${rewardEventName}`, selector);
          sendEvent(campaignRewardEventId, 'ONCLICK', {
            targetTag: e.target.tagName,
            targetText: e.target.innerText ? e.target.innerText.substring(0, 100) : null,
          });
        });
        break;

      case 'HOVER':
        element.addEventListener('mouseenter', function(e) {
          console.log(`[GROWI] HOVER event: ${rewardEventName}`, selector);
          sendEvent(campaignRewardEventId, 'HOVER', {
            targetTag: e.target.tagName,
          });
        });
        break;

      case 'DOUBLE_CLICK':
        element.addEventListener('dblclick', function(e) {
          console.log(`[GROWI] DOUBLE_CLICK event: ${rewardEventName}`, selector);
          sendEvent(campaignRewardEventId, 'DOUBLE_CLICK', {
            targetTag: e.target.tagName,
          });
        });
        break;

      default:
        console.warn(`[GROWI] Unknown event type: ${selectorEventType}`);
    }
  });

  console.log(`[GROWI] Listener set for ${selector} (${selectorEventType})`);
}

// Initialize GROWI tracking
async function initGrowi() {
  if (!campaignId) {
    console.warn('[GROWI] No campaign ID found in URL (utm_id parameter)');
    return;
  }

  console.log(`[GROWI] Initializing for campaign: ${campaignId}`);

  const selectors = await fetchCampaignSelectors(campaignId);

  if (selectors.length === 0) {
    console.warn('[GROWI] No selectors configured for this campaign');
    return;
  }

  console.log(`[GROWI] Found ${selectors.length} selectors to track`);

  selectors.forEach(function(selectorData) {
    setupEventListener(selectorData);
  });

  console.log('[GROWI] Tracking initialized successfully');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGrowi);
} else {
  initGrowi();
}