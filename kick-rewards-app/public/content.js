// Content script for Köfte/Meatball extension
console.log('Köfte/Meatball content script loaded on Kick.com');

let moderationPanelInjected = false;
let moderationPanelVisible = false;

// Create moderation panel container
function createModerationPanel() {
  if (moderationPanelInjected) return;

  console.log('Creating moderation panel...');
  
  // Create panel container
  const panelContainer = document.createElement('div');
  panelContainer.id = 'meatball-moderation-panel';
  panelContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100vh;
    z-index: 10000;
    transition: right 0.3s ease-in-out;
    font-family: 'Inter', system-ui, sans-serif;
  `;

  // Create iframe for the moderation panel
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('index.html') + '?view=panel';
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background: #252036;
  `;

  panelContainer.appendChild(iframe);
  document.body.appendChild(panelContainer);

  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'meatball-toggle-btn';
  toggleButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  `;
  toggleButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #8A98DB 0%, #A36FDB 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(138, 152, 219, 0.3);
    transition: all 0.3s ease;
    font-family: 'Inter', system-ui, sans-serif;
  `;

  toggleButton.addEventListener('mouseenter', () => {
    toggleButton.style.transform = 'scale(1.05)';
    toggleButton.style.boxShadow = '0 6px 25px rgba(138, 152, 219, 0.4)';
  });

  toggleButton.addEventListener('mouseleave', () => {
    toggleButton.style.transform = 'scale(1)';
    toggleButton.style.boxShadow = '0 4px 20px rgba(138, 152, 219, 0.3)';
  });

  toggleButton.addEventListener('click', toggleModerationPanel);
  document.body.appendChild(toggleButton);

  moderationPanelInjected = true;
  console.log('Moderation panel created successfully');
}

// Toggle moderation panel visibility
function toggleModerationPanel() {
  const panel = document.getElementById('meatball-moderation-panel');
  const button = document.getElementById('meatball-toggle-btn');
  
  if (!panel || !button) return;

  if (moderationPanelVisible) {
    // Hide panel
    panel.style.right = '-350px';
    button.style.right = '20px';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    `;
    moderationPanelVisible = false;
  } else {
    // Show panel
    panel.style.right = '0px';
    button.style.right = '370px';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    `;
    moderationPanelVisible = true;
  }

  console.log('Moderation panel toggled:', moderationPanelVisible ? 'visible' : 'hidden');
}

// Listen for messages from popup/background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);

  switch (request.action) {
    case 'openModerationPanel':
      if (!moderationPanelInjected) {
        createModerationPanel();
      }
      if (!moderationPanelVisible) {
        toggleModerationPanel();
      }
      sendResponse({ success: true });
      break;

    case 'toggleModerationPanel':
      toggleModerationPanel();
      sendResponse({ success: true });
      break;

    case 'getModerationPanelState':
      sendResponse({ 
        injected: moderationPanelInjected, 
        visible: moderationPanelVisible 
      });
      break;

    default:
      console.log('Unknown action:', request.action);
  }
});

// Auto-inject moderation panel when page loads
function initExtension() {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtension);
    return;
  }

  // Check if we're on a Kick.com page
  if (window.location.hostname.includes('kick.com')) {
    console.log('Köfte/Meatball extension initializing on Kick.com...');
    
    // Wait a bit for the page to fully load
    setTimeout(() => {
      createModerationPanel();
    }, 2000);
  }
}

// Initialize when script loads
initExtension();

// Handle navigation changes (SPA)
let currentUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;
    console.log('Navigation detected, reinitializing...');
    setTimeout(initExtension, 1000);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Köfte/Meatball content script initialization complete');