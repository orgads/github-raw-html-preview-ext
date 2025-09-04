// Add Preview button next to Raw button on GitHub file pages
(function() {
  function addPreviewButton() {
    // Check if we're on a file page
    const rawButton = document.querySelector('a[data-testid="raw-button"], a[href*="/raw/"], a[id*="raw-url"]');
    if (!rawButton) return;

    // Check if it's an HTML/CSS/JS/JSON file
    const filePath = window.location.pathname;
    if (!filePath.match(/\.(html?|css|js|json)$/i)) return;

    // Check if preview button already exists
    if (document.querySelector('.github-html-preview-btn')) return;

    // Check if repository is private
    if (isPrivateRepository()) {
      console.log('GitHub Raw HTML Preview: Skipping private repository');
      return;
    }

    // Create wrapper div (same structure as Raw button)
    const previewWrapper = document.createElement('div');

    // Create preview button with identical structure
    const previewButton = document.createElement('a');
    previewButton.className = rawButton.className.replace('github-html-preview-btn', '').trim();
    previewButton.classList.add('github-html-preview-btn');
    previewButton.setAttribute('data-loading', 'false');
    previewButton.setAttribute('data-no-visuals', 'true');
    previewButton.setAttribute('data-size', 'small');
    previewButton.setAttribute('data-variant', 'default');

    // Create button content span (matching Raw button structure)
    const buttonContent = document.createElement('span');
    buttonContent.setAttribute('data-component', 'buttonContent');
    buttonContent.className = rawButton.querySelector('[data-component="buttonContent"]')?.className || '';

    // Create text span
    const textSpan = document.createElement('span');
    textSpan.setAttribute('data-component', 'text');
    textSpan.className = rawButton.querySelector('[data-component="text"]')?.className || '';
    textSpan.textContent = 'Preview';

    // Assemble the structure
    buttonContent.appendChild(textSpan);
    previewButton.appendChild(buttonContent);
    previewWrapper.appendChild(previewButton);

    // Build preview URL - convert GitHub raw URL to raw.githubusercontent.com URL
    const rawUrl = rawButton.href || rawButton.getAttribute('href');
    if (rawUrl) {
      let previewUrl;

      // Check if it's already a raw.githubusercontent.com URL
      if (rawUrl.includes('raw.githubusercontent.com')) {
        previewUrl = rawUrl;
      } else {
        // Convert GitHub raw URL to raw.githubusercontent.com format
        // From: https://github.com/{user}/{repo}/raw/{branch}/{file}
        // To: https://raw.githubusercontent.com/{user}/{repo}/{branch}/{file}

        // Parse the current page URL to get repo info
        const pathParts = window.location.pathname.split('/');
        const user = pathParts[1];
        const repo = pathParts[2];

        // Extract branch and file path from raw URL
        const rawUrlMatch = rawUrl.match(/\/raw\/(.*)/);
        if (rawUrlMatch) {
          const branchAndPath = rawUrlMatch[1];
          previewUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branchAndPath}`;
        } else {
          // Fallback: use the raw URL as-is
          previewUrl = rawUrl;
        }
      }

      // Add preview parameter
      previewUrl = previewUrl + (previewUrl.includes('?') ? '&' : '?') + 'preview=true';
      previewButton.href = previewUrl;
      previewButton.target = '_blank';
    }

    // Insert the wrapper div before the Raw button's wrapper div
    const rawWrapper = rawButton.parentElement;
    rawWrapper.parentNode.insertBefore(previewWrapper, rawWrapper);
  }

  // Check if the current repository is private
  function isPrivateRepository() {
    return Boolean(document.querySelector('.octicon-lock'));
  }

  // Run on page load
  addPreviewButton();

  // Also run when content changes (for SPA navigation)
  const observer = new MutationObserver(() => {
    addPreviewButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
