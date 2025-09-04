#!/bin/bash

# GitHub Raw HTML Preview Extension Deployment Script
# This script packages the Chrome extension for distribution

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Configuration
EXTENSION_NAME="github-raw-html-preview"
DIST_DIR="dist"
ZIP_NAME="${EXTENSION_NAME}-$(date +%Y%m%d-%H%M%S).zip"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Create zip package for Chrome Web Store
echo "🎁 Creating distribution package..."
zip "$DIST_DIR/$ZIP_NAME" \
  manifest.json \
  *.js \
  *.css \
  *.html \
  *.png \
  rules.json \
  README.md \
  PRIVACY.md \
  -x "*.DS_Store" "*.git*" "*node_modules*" "*.log"

echo "📊 Package contents:"
unzip -l "$DIST_DIR/$ZIP_NAME"

echo ""
echo "✅ Deployment complete!"
echo "📦 Distribution package: ./$DIST_DIR/$ZIP_NAME"
echo ""
echo "🎯 Next steps:"
echo "1. Test the extension by loading this folder in Chrome (Developer mode)"
echo "2. Upload $DIST_DIR/$ZIP_NAME to Chrome Web Store"
echo "3. Submit for review"