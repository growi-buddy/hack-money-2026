const siteId = '{{SITE_ID}}';
const apiBaseUrl = '{{API_BASE_URL}}';

function getOrCreateSessionId() {
  const STORAGE_KEY = 'growi_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  
  return sessionId;
}

const sessionId = getOrCreateSessionId();

async function fetchSelectorsFromEndpoint(id) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/selectors?id=${id}`,
    );
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error fetching selectors:', data.error);
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching selectors:', error);
    return [];
  }
}

async function sendEvent(selectorId, eventType, metadata = {}) {
  try {
    const payload = {
      siteId,
      sessionId,
      selectorId,
      eventType,
      timestamp: new Date().toISOString(),
      metadata,
    };
    
    const response = await fetch(
      `${apiBaseUrl}/api/events`,
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
      console.error('Error sending event:', data.error);
      return false;
    }
    
    console.log('Event sent successfully:', data.data);
    return true;
  } catch (error) {
    console.error('Error sending event:', error);
    return false;
  }
}

function setupEventListener(selectorData) {
  const { id: selectorId, selector, eventType } = selectorData;
  
  document.querySelectorAll(selector).forEach(function (element) {
    switch (eventType) {
      case 'ONCLICK':
        element.addEventListener('click', function (e) {
          console.log('ONCLICK event triggered:', selector);
          sendEvent(selectorId, 'ONCLICK', {
            target: e.target.tagName,
            text: e.target.innerText?.substring(0, 50),
          });
        });
        break;
      
      case 'HOVER':
        element.addEventListener('mouseenter', function (e) {
          console.log('HOVER event triggered:', selector);
          sendEvent(selectorId, 'HOVER', {
            target: e.target.tagName,
          });
        });
        break;
      
      case 'DOUBLE_CLICK':
        element.addEventListener('dblclick', function (e) {
          console.log('DOUBLE_CLICK event triggered:', selector);
          sendEvent(selectorId, 'DOUBLE_CLICK', {
            target: e.target.tagName,
          });
        });
        break;
    }
  });
}

async function addListeners() {
  const selectors = await fetchSelectorsFromEndpoint(siteId);
  
  selectors.forEach(function (selectorData) {
    setupEventListener(selectorData);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addListeners);
} else {
  void addListeners();
}
