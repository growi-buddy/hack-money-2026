const siteId = 'your-id-here'; // Change this with the real ID

async function fetchSelectorsFromEndpoint(id) {
  try {
    const response = await fetch(`https:///api/selectors?id=${id}`);
    const data = await response.json();
    return data.selectors; // Expects an array of selectors
  } catch (error) {
    console.error('Error fetching selectors:', error);
    return [];
  }
}

// Function to add click listeners
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

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addListeners);
} else {
  addListeners();
}
