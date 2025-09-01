#!/bin/bash

# DesAIgn Cybersecurity Guardian - Vercel Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 DesAIgn Cybersecurity Guardian - Vercel Deployment"
echo "=================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI globally..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ You are not logged in to Vercel."
    echo "🔑 Please login to Vercel:"
    vercel login
else
    echo "✅ You are logged in to Vercel."
fi

# Check if this is a git repository
if [ ! -d ".git" ]; then
    echo "⚠️  This is not a git repository."
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: DesAIgn Cybersecurity Guardian"
    echo "✅ Git repository initialized."
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No remote repository found."
    echo "📝 Please set up a GitHub repository and add it as remote:"
    echo "   1. Create a new repository on GitHub"
    echo "   2. Run: git remote add origin https://github.com/yourusername/your-repo.git"
    echo "   3. Run: git push -u origin main"
    echo ""
    echo "Alternatively, you can deploy directly without git:"
fi

# Ensure static files are properly copied
echo "📁 Preparing static files..."
mkdir -p .next/static
mkdir -p .next/public
cp -r public/* .next/static/ 2>/dev/null || echo "⚠️  No public files to copy to static"
cp -r public/* .next/public/ 2>/dev/null || echo "⚠️  No public files to copy to public"

# Check if already linked to Vercel project
if [ -f ".vercel/project.json" ]; then
    echo "✅ Project already linked to Vercel."
    echo "📤 Deploying to existing project..."
    vercel --prod
else
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    echo "📋 Deployment options:"
    echo "   1. Deploy with existing project (if you have one)"
    echo "   2. Create new project"
    echo ""

    read -p "Do you want to link to an existing Vercel project? (y/n): " link_existing

    if [[ $link_existing =~ ^[Yy]$ ]]; then
        echo "🔗 Linking to existing project..."
        vercel link
        echo "📤 Starting deployment..."
        vercel --prod
    else
        echo "🆕 Creating new Vercel project..."
        echo "📤 Starting deployment..."
        vercel --prod
    fi
fi

echo ""
echo "🎉 Deployment completed!"
echo "🌐 Your app should be available at the URL shown above."
echo ""
echo "📖 For more information, check the DEPLOYMENT.md file."
