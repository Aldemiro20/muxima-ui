#!/bin/bash

# ========================================
# Muxima UI - NPM Publishing Script
# ========================================

set -e  # Exit on error

echo "🚀 Muxima UI - NPM Publishing Tool"
echo "====================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if logged in to NPM
echo -e "${BLUE}Checking NPM authentication...${NC}"
if ! npm whoami &> /dev/null; then
    echo -e "${RED}❌ You are not logged in to NPM${NC}"
    echo -e "${YELLOW}Please run: npm login${NC}"
    exit 1
fi

NPM_USER=$(npm whoami)
echo -e "${GREEN}✅ Logged in as: $NPM_USER${NC}"
echo ""

# Ask for confirmation
read -p "Do you want to continue with the publishing process? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Publishing cancelled."
    exit 0
fi

# Step 1: Clean previous builds
echo -e "${BLUE}🧹 Cleaning previous builds...${NC}"
rm -rf dist/
echo -e "${GREEN}✅ Clean complete${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 3: Run tests (if available)
# echo -e "${BLUE}🧪 Running tests...${NC}"
# npm run test
# echo -e "${GREEN}✅ Tests passed${NC}"
# echo ""

# Step 4: Build all packages
echo -e "${BLUE}🏗️  Building all packages...${NC}"
npm run build:all
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Step 5: List packages to publish
echo -e "${BLUE}📋 Packages to publish:${NC}"

PACKAGES=(
    "packages/components/button"
    "packages/components/alert"
    "packages/components/avatar"
    "packages/components/badge"
    "packages/components/card"
    "packages/components/chip"
    "packages/components/loading"
    "packages/components/progress"
    "packages/components/skeleton"
    "packages/components/accordion"
    "packages/form/input"
    "packages/form/checkbox"
    "packages/form/radio-button"
    "packages/form/select"
    "packages/form/toggle"
    "packages/data/pagination"
    "packages/data/table"
    "packages/navigation/tabs"
    "packages/overlay/modal"
    "packages/overlay/toast"
)

for package in "${PACKAGES[@]}"; do
    echo "  - $package"
done
echo ""

# Confirm publishing
read -p "Proceed with publishing these packages? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Publishing cancelled."
    exit 0
fi

# Step 6: Publish each package
echo -e "${BLUE}📤 Publishing packages to NPM...${NC}"
echo ""

PUBLISHED=0
FAILED=0
SKIPPED=0

for package in "${PACKAGES[@]}"; do
    PACKAGE_NAME=$(basename "$package")
    DIST_PATH="dist/$package"
    
    echo -e "${BLUE}Publishing @muxima-ui/$PACKAGE_NAME...${NC}"
    
    if [ ! -d "$DIST_PATH" ]; then
        echo -e "${YELLOW}⚠️  Package not found in dist: $DIST_PATH${NC}"
        SKIPPED=$((SKIPPED+1))
        continue
    fi
    
    cd "$DIST_PATH"
    
    if npm publish --access public; then
        echo -e "${GREEN}✅ @muxima-ui/$PACKAGE_NAME published successfully${NC}"
        PUBLISHED=$((PUBLISHED+1))
    else
        echo -e "${RED}❌ Failed to publish @muxima-ui/$PACKAGE_NAME${NC}"
        FAILED=$((FAILED+1))
    fi
    
    cd - > /dev/null
    echo ""
done

# Step 7: Summary
echo "====================================="
echo -e "${BLUE}📊 Publishing Summary${NC}"
echo "====================================="
echo -e "${GREEN}✅ Published: $PUBLISHED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo -e "${YELLOW}⚠️  Skipped: $SKIPPED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All packages published successfully!${NC}"
    echo ""
    echo "📚 View your packages at:"
    echo "https://www.npmjs.com/~$NPM_USER"
    echo ""
    echo "📖 Documentation available at:"
    echo "https://muxima-ui.up.railway.app"
else
    echo -e "${RED}⚠️  Some packages failed to publish. Please check the errors above.${NC}"
    exit 1
fi
