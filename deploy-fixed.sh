#!/bin/bash

# Fixed deployment script for Vercel
echo "🚀 Deploying DesAIgn Cybersecurity Guardian to Vercel..."
echo "==================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        exit 1
    fi
fi

# Check if logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login:"
    vercel login
    if [ $? -ne 0 ]; then
        echo "❌ Login failed"
        exit 1
    fi
fi

echo "✅ Authentication confirmed"
echo "📦 Starting deployment..."

# Clean any existing .next directory
if [ -d ".next" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf .next
fi

# Build the project
echo "🔨 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo "🚀 Deploying to Vercel..."

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "🌐 Your app is now live on Vercel"
    echo ""
    echo "📋 Next steps:"
    echo "  - Visit your Vercel dashboard to see the deployment"
    echo "  - Check the deployment logs if needed"
    echo "  - Set up a custom domain if desired"
else
    echo ""
    echo "❌ Deployment failed"
    echo "📖 Check the error messages above"
    echo "🔧 Common solutions:"
    echo "  - Make sure you're logged in: vercel login"
    echo "  - Check your internet connection"
    echo "  - Try deploying again"
fi
