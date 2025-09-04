// Add toggle button on raw.githubusercontent.com pages
(function() {
  let isPreviewMode = false;

  // Check if this is a file we should handle
  function shouldHandleFile() {
    const url = window.location.href;
    return url.match(/\.(html?|css|js|json)(\?|$)/i) || url.includes('preview=true');
  }

  // Check if preview mode is requested
  function isPreviewRequested() {
    return window.location.search.includes('preview=true');
  }

  // Create toggle button
  function createToggleButton() {
    if (!shouldHandleFile()) return;
    if (document.querySelector('.raw-preview-toggle')) return;

    // Set preview mode based on URL
    isPreviewMode = isPreviewRequested();

    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'raw-preview-toggle';
    toggleContainer.innerHTML = `
      <button id="toggle-preview-btn">
        <span class="toggle-icon">${isPreviewMode ? '📄' : '👁️'}</span>
        <span class="toggle-text">${isPreviewMode ? 'View Raw' : 'Preview'}</span>
      </button>
    `;

    document.body.appendChild(toggleContainer);

    // Add click handler
    document.getElementById('toggle-preview-btn').addEventListener('click', toggleView);
  }

  // Toggle between raw and preview
  function toggleView() {
    const url = window.location.href;
    const urlObj = new URL(url);

    if (!isPreviewMode) {
      // Switch to preview mode - add preview=true parameter
      urlObj.searchParams.set('preview', 'true');
      window.location.href = urlObj.toString();
    } else {
      // Switch back to raw mode - remove preview parameter
      urlObj.searchParams.delete('preview');
      window.location.href = urlObj.toString();
    }
  }

  // Update toggle button text
  function updateToggleButton() {
    const btn = document.getElementById('toggle-preview-btn');
    if (btn) {
      btn.querySelector('.toggle-icon').textContent = isPreviewMode ? '📄' : '👁️';
      btn.querySelector('.toggle-text').textContent = isPreviewMode ? 'View Raw' : 'Preview';
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggleButton);
  } else {
    setTimeout(createToggleButton, 100);
  }
})();
