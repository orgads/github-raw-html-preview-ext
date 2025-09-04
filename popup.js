// Popup script for extension settings
document.addEventListener('DOMContentLoaded', function() {
  const enablePreviewToggle = document.getElementById('enable-preview');
  const autoRenderToggle = document.getElementById('auto-render');
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  // Load saved settings
  chrome.storage.local.get(['enablePreview', 'autoRender'], function(result) {
    enablePreviewToggle.checked = result.enablePreview !== false;
    autoRenderToggle.checked = result.autoRender === true;
    updateStatus(result.enablePreview !== false);
  });

  // Save settings when toggled
  enablePreviewToggle.addEventListener('change', function() {
    const enabled = enablePreviewToggle.checked;
    chrome.storage.local.set({enablePreview: enabled});
    updateStatus(enabled);

    // Enable/disable the declarativeNetRequest rules
    if (enabled) {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['ruleset_1']
      });
    } else {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['ruleset_1']
      });
    }
  });

  autoRenderToggle.addEventListener('change', function() {
    chrome.storage.local.set({autoRender: autoRenderToggle.checked});
  });

  function updateStatus(enabled) {
    if (enabled) {
      statusIndicator.className = 'status active';
      statusText.textContent = 'active';
    } else {
      statusIndicator.className = 'status inactive';
      statusText.textContent = 'inactive';
    }
  }
});
