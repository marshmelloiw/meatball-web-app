// Background service worker for Meatball Extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Köfte/Meatball extension yüklendi!');
  
  // Set default extension icon
  chrome.action.setIcon({
    path: {
      16: 'icons/icon16.png',
      32: 'icons/icon32.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png'
    }
  });
  
  // Set default popup
  chrome.action.setPopup({
    popup: 'popup.html'
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup - handled automatically by manifest
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background script received message:', request);
  
  switch (request.action) {
    case 'openModerationPanel':
      // Forward message to content script
      if (sender.tab?.id) {
        chrome.tabs.sendMessage(sender.tab.id, request);
      }
      break;
      
    case 'saveModerationData':
      // Save moderation data to storage
      chrome.storage.local.set({ 
        moderationData: request.data 
      }, () => {
        sendResponse({ success: true });
      });
      return true; // Keep message channel open for async response
      
    case 'getModerationData':
      // Get moderation data from storage
      chrome.storage.local.get(['moderationData'], (result) => {
        sendResponse({ data: result.moderationData });
      });
      return true; // Keep message channel open for async response
      
    case 'updateBadge':
      // Update extension badge with notifications count
      chrome.action.setBadgeText({
        text: request.count ? request.count.toString() : '',
        tabId: sender.tab?.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#ff6b6b'
      });
      break;
      
    default:
      console.log('Unknown action:', request.action);
  }
});

// Handle tab updates to inject content script on Kick.com
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('kick.com')) {
    console.log('Kick.com page loaded, injecting content script');
    
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(err => {
      console.log('Content script already injected or error:', err);
    });
  }
});

// Cleanup on extension unload
chrome.runtime.onSuspend.addListener(() => {
  console.log('Köfte/Meatball extension suspending...');
});