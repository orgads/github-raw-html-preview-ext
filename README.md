# GitHub Raw HTML Preview

A Chrome extension that allows you to preview HTML, CSS, JavaScript, and JSON files directly from GitHub repositories with a single click.

## Features

✨ **Preview Button on GitHub** - Adds a green "Preview" button next to "Raw" on GitHub file pages (public repositories only)  
🔄 **Toggle Functionality** - Switch between raw text and rendered view on raw.githubusercontent.com  
📁 **Multi-format Support** - Works with HTML, CSS, JS, and JSON files  
🎨 **Native Integration** - Clean design that matches GitHub's interface  
🔒 **Privacy Focused** - No data collection or tracking  

## Installation

### From Chrome Web Store
*(Coming soon - extension will be published to Chrome Web Store)*

### Manual Installation (Developer Mode)
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the extension directory
5. The extension will be installed and active

## How to Use

### On GitHub File Pages
1. Navigate to any HTML, CSS, JavaScript, or JSON file on GitHub
2. Click the green **"Preview"** button next to "Raw"
3. The file opens in a new tab with proper rendering

### On Raw GitHub Pages
1. When viewing files on raw.githubusercontent.com
2. Use the floating toggle button (👁️ Preview / 📄 View Raw) to switch views
3. Click the extension icon for settings

## Supported File Types

- **HTML files** (.html, .htm) - Full rendering with CSS and JavaScript
- **CSS files** (.css) - Syntax-highlighted preview
- **JavaScript files** (.js) - Properly formatted code view
- **JSON files** (.json) - Formatted and syntax-highlighted

## How It Works

The extension uses Chrome's `declarativeNetRequest` API to modify HTTP headers for files served from raw.githubusercontent.com:

- Changes `Content-Type` from `text/plain` to appropriate MIME types
- Removes Content Security Policy headers that block rendering
- Adds CORS headers for external resources
- Enables proper browser rendering of web files

## Settings

Access extension settings by clicking the extension icon:
- **Enable Preview** - Turn the extension on/off
- **Auto-render HTML** - Automatically render HTML files when accessed directly

## Development

### File Structure
```
├── manifest.json          # Extension configuration
├── github-preview.js      # GitHub page integration
├── github-preview.css     # GitHub button styling
├── raw-toggle.js          # Raw page toggle functionality
├── raw-toggle.css         # Raw page styling
├── popup.html            # Extension settings popup
├── popup.js              # Popup functionality
├── rules.json            # Header modification rules
└── icon*.png             # Extension icons
```

### Building
1. Make changes to source files
2. Test in Chrome with "Load unpacked"
3. Create ZIP for distribution

## Privacy

This extension:
- ✅ Does not collect any personal data
- ✅ Does not track browsing history
- ✅ Processes everything locally in your browser
- ✅ Only accesses GitHub and raw.githubusercontent.com domains

## License

MIT License - Feel free to use and modify

## Contributing

Issues and pull requests welcome! Please ensure:
- Test thoroughly with different file types
- Follow existing code style
- Update documentation as needed
