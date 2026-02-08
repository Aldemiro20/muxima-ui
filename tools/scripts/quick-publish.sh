#!/bin/bash

# ========================================
# Muxima UI - Quick Publish All (Simple)
# Publica todos os pacotes que têm package.json
# ========================================

set -e

echo ""
echo "🚀 Muxima UI - Quick Publish"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Check NPM login
echo -e "${BLUE}Checking NPM login...${NC}"
if ! NPM_USER=$(npm whoami 2>&1); then
    echo -e "${RED}❌ Not logged in to NPM${NC}"
    echo -e "${YELLOW}Please run: npm login${NC}"
    echo ""
    exit 1
fi
echo -e "${GREEN}✅ Logged in as: $NPM_USER${NC}"
echo ""

# Build all
echo -e "${BLUE}🏗️  Building all packages...${NC}"
npm run build:all
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Find and publish all packages
echo -e "${BLUE}📤 Publishing all packages...${NC}"
echo ""

PUBLISHED=0
FAILED=0
SKIPPED=0

find dist/packages -name "package.json" -maxdepth 3 | while IFS= read -r pkg; do
    DIR=$(dirname "$pkg")
    PACKAGE_NAME=$(node -p "require('$pkg').name")
    
    echo -e "${CYAN}Publishing $PACKAGE_NAME...${NC}"
    
    cd "$DIR"
    
    if npm publish --access public 2>&1 | grep -q "success"; then
        echo -e "  ${GREEN}✅ Published successfully${NC}"
        PUBLISHED=$((PUBLISHED + 1))
    elif npm publish --access public 2>&1 | grep -q "already exists"; then
        echo -e "  ${YELLOW}⚠️  Skipped (already exists)${NC}"
        SKIPPED=$((SKIPPED + 1))
    else
        echo -e "  ${RED}❌ Failed${NC}"
        FAILED=$((FAILED + 1))
    fi
    
    cd - > /dev/null
    echo ""
done

# Summary
echo "============================="
echo -e "${BLUE}📊 Summary${NC}"
echo "============================="
echo -e "${GREEN}✅ Published: $PUBLISHED${NC}"
echo -e "${YELLOW}⚠️  Skipped: $SKIPPED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Done!${NC}"
    echo -e "${CYAN}View at: https://www.npmjs.com/~$NPM_USER${NC}"
    echo ""
else
    echo -e "${RED}⚠️  Some packages failed${NC}"
    echo ""
    exit 1
fi
