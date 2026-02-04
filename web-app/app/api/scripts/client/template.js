const siteId = '{{SITE_ID}}';

async function fetchSelectorsFromEndpoint(id) {
  try {
    const response = await fetch(`https://api.local.growi.app/api/selectors?id=${id}`);
    const data = await response.json();
    return data.selectors; // Expects an array of selectors
  } catch (error) {
    console.error('Error fetching selectors:', error);
    return [];
  }
}

function setupEventListener(selector, eventType) {
  document.querySelectorAll(selector).forEach(function (element) {
    switch (eventType) {
      case 'ONCLICK':
        element.addEventListener('click', function (e) {
          console.log('ONCLICK event triggered:', selector);
          sendEvent(selector, 'ONCLICK');
        });
        break;
      
      case 'HOVER':
        element.addEventListener('mouseenter', function (e) {
          console.log('HOVER event triggered:', selector);
          sendEvent(selector, 'HOVER');
        });
        break;
      
      case 'DOUBLE_CLICK':
        element.addEventListener('dblclick', function (e) {
          console.log('DOUBLE_CLICK event triggered:', selector);
          sendEvent(selector, 'DOUBLE_CLICK');
        });
        break;
      
      case 'FORM_SUBMIT':
        element.addEventListener('submit', function (e) {
          console.log('FORM_SUBMIT event triggered:', selector);
          sendEvent(selector, 'FORM_SUBMIT');
        });
        break;
    }
  });
}

async function addListeners() {
  const selectors = await fetchSelectorsFromEndpoint(siteId);
  
  selectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (button) {
      button.addEventListener('click', function (e) {
        console.log('Button clicked:', e.target);
        console.log('Selector used:', selector);
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addListeners);
} else {
  void addListeners();
}
