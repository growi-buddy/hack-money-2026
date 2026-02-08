const apiBaseUrl = '{{API_BASE_URL}}';

// Extract campaignId from URL query parameter utm_id
function getCampaignIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('utm_id').split(',');
}

const [ campaignId, participationId ] = getCampaignIdFromUrl();

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
      `${apiBaseUrl}/api/client/events-selectors?id=${campaignId}`,
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
async function sendEvent(campaignSiteEventId, selectorEventType, metadata = {}) {
  try {
    const payload = {
      campaignSiteEventId,
      sessionId: getOrCreateSessionId(),
      userAgent: navigator.userAgent,
      participationId,
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
      },
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

// Validate if a string is a valid CSS selector
function isValidSelector(selector) {
  // Check if selector looks like a URL (contains :// or starts with http)
  if (/^https?:\/\//.test(selector) || selector.includes('://')) {
    return false;
  }
  
  try {
    document.querySelector(selector);
    return true;
  } catch (e) {
    return false;
  }
}

function urlMatchesSelector(selector) {
  const currentPath = window.location.pathname;
  const currentUrl = window.location.href;
  
  if (currentPath === selector) {
    return true;
  }
  
  if (currentUrl === selector) {
    return true;
  }
  
  if (selector.includes('*')) {
    const pattern = selector.replace(/\*/g, '.*');
    const regex = new RegExp('^' + pattern + '$');
    return regex.test(currentPath) || regex.test(currentUrl);
  }
  
  if (currentPath.includes(selector) || currentUrl.includes(selector)) {
    return true;
  }
  
  return false;
}

function setupLandingPageViewListener(selectorData) {
  const { campaignSiteEventId, selector, siteEventName } = selectorData;
  
  let lastMatchedUrl = null;
  
  function checkAndSendEvent() {
    const currentUrl = window.location.href;
    
    if (urlMatchesSelector(selector)) {
      // if (lastMatchedUrl !== currentUrl) {
      console.log(`[GROWI] LANDING_PAGE_VIEW event: ${siteEventName}`, 'selector:', selector, 'matched:', currentUrl);
      sendEvent(campaignSiteEventId, 'LANDING_PAGE_VIEW', {
        matchedUrl: currentUrl,
        selector: selector,
      });
      lastMatchedUrl = currentUrl;
      // }
    } else {
      // Reset if we navigate away from the matching URL
      lastMatchedUrl = null;
    }
  }
  
  // Check on initial load
  checkAndSendEvent();
  
  // Listen for browser back/forward buttons
  window.addEventListener('popstate', checkAndSendEvent);
  
  // Listen for pushState and replaceState (for SPAs like React, Next.js)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    checkAndSendEvent();
  };
  
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    checkAndSendEvent();
  };
  
  // Listen for hash changes
  window.addEventListener('hashchange', checkAndSendEvent);
  
  console.log(`[GROWI] LANDING_PAGE_VIEW listener set for selector: ${selector}`);
}

function setupEventListener(selectorData) {
  const { campaignSiteEventId, selector, selectorEventType, eventType, siteEventName } = selectorData;
  
  console.info('[GROWI] Setuping event:', selectorData);
  if (eventType === 'LANDING_PAGE_VIEW') {
    setupLandingPageViewListener(selectorData);
    return;
  } else if (eventType === 'VIEW_ITEM') {
    if (!selector || !isValidSelector(selector)) {
      console.error(`[GROWI] Invalid CSS selector: "${selector}" for event: ${siteEventName}`);
      return;
    }
    const elements = document.querySelectorAll(selector);
    console.info(`[GROWI] Tracking click elements:`, { elements, selector });
    elements.forEach(function (element) {
      element.addEventListener('click', function (e) {
        console.log(`[GROWI] ONCLICK event: ${siteEventName}`, selector);
        sendEvent(campaignSiteEventId, 'ONCLICK', {
          targetTag: e.target.tagName,
          targetText: e.target.innerText ? e.target.innerText.substring(0, 100) : null,
        });
      });
    });
    return;
  }
  
  // Validate selector before using it (for non-LANDING_PAGE_VIEW events)
  if (!selector || !isValidSelector(selector)) {
    console.error(`[GROWI] Invalid CSS selector: "${selector}" for event: ${siteEventName}`);
    return;
  }
  
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    console.warn(`[GROWI] No elements found for selector: ${selector}`);
    return;
  }
  
  elements.forEach(function (element) {
    switch (selectorEventType) {
      case 'ONCLICK':
        element.addEventListener('click', function (e) {
          console.log(`[GROWI] ONCLICK event: ${siteEventName}`, selector);
          sendEvent(campaignSiteEventId, 'ONCLICK', {
            targetTag: e.target.tagName,
            targetText: e.target.innerText ? e.target.innerText.substring(0, 100) : null,
          });
        });
        break;
      
      case 'HOVER':
        element.addEventListener('mouseenter', function (e) {
          console.log(`[GROWI] HOVER event: ${siteEventName}`, selector);
          sendEvent(campaignSiteEventId, 'HOVER', {
            targetTag: e.target.tagName,
          });
        });
        break;
      
      case 'DOUBLE_CLICK':
        element.addEventListener('dblclick', function (e) {
          console.log(`[GROWI] DOUBLE_CLICK event: ${siteEventName}`, selector);
          sendEvent(campaignSiteEventId, 'DOUBLE_CLICK', {
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
  
  selectors.forEach(function (selectorData) {
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
