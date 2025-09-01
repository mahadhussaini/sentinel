@echo off
REM DesAIgn Cybersecurity Guardian - Vercel Deployment Script (Windows)
REM This script helps deploy the application to Vercel on Windows

echo 🚀 DesAIgn Cybersecurity Guardian - Vercel Deployment
echo ==================================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI is not installed.
    echo 📦 Installing Vercel CLI globally...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI. Please install it manually: npm install -g vercel
        pause
        exit /b 1
    )
)

REM Check if user is logged in to Vercel
echo 🔐 Checking Vercel authentication...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ You are not logged in to Vercel.
    echo 🔑 Please login to Vercel:
    vercel login
    if %errorlevel% neq 0 (
        echo ❌ Login failed. Please try again.
        pause
        exit /b 1
    )
) else (
    echo ✅ You are logged in to Vercel.
)

REM Check if this is a git repository
if not exist ".git" (
    echo ⚠️  This is not a git repository.
    echo 🔧 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: DesAIgn Cybersecurity Guardian"
    echo ✅ Git repository initialized.
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  No remote repository found.
    echo 📝 Please set up a GitHub repository and add it as remote:
    echo    1. Create a new repository on GitHub
    echo    2. Run: git remote add origin https://github.com/yourusername/your-repo.git
    echo    3. Run: git push -u origin main
    echo.
    echo Alternatively, you can deploy directly without git:
)

REM Check if already linked to Vercel project
if exist ".vercel\project.json" (
    echo ✅ Project already linked to Vercel.
    echo 📤 Deploying to existing project...
    vercel --prod
) else (
    REM Deploy to Vercel
    echo 🚀 Deploying to Vercel...
    echo 📋 Deployment options:
    echo    1. Deploy with existing project (if you have one)
    echo    2. Create new project
    echo.

    set /p link_existing="Do you want to link to an existing Vercel project? (y/n): "

    if /i "%link_existing%"=="y" (
        echo 🔗 Linking to existing project...
        vercel link
        echo 📤 Starting deployment...
        vercel --prod
    ) else (
        echo 🆕 Creating new Vercel project...
        echo 📤 Starting deployment...
        vercel --prod
    )
)

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Deployment completed successfully!
    echo 🌐 Your app should be available at the URL shown above.
    echo.
    echo 📖 For more information, check the DEPLOYMENT.md file.
) else (
    echo.
    echo ❌ Deployment failed. Please check the error messages above.
    echo 📖 Check DEPLOYMENT.md for troubleshooting steps.
)

echo.
pause
