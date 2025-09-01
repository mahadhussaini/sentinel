@echo off
REM Fixed deployment script for Vercel
echo 🚀 Deploying DesAIgn Cybersecurity Guardian to Vercel...
echo ====================================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

REM Check if logged in
echo 🔐 Checking Vercel authentication...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Not logged in to Vercel. Please login:
    vercel login
    if %errorlevel% neq 0 (
        echo ❌ Login failed
        pause
        exit /b 1
    )
)

echo ✅ Authentication confirmed
echo 📦 Starting deployment...

REM Clean any existing .next directory
if exist ".next" (
    echo 🧹 Cleaning previous build...
    rmdir /s /q .next
)

REM Build the project
echo 🔨 Building project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful
echo 🚀 Deploying to Vercel...

REM Deploy to Vercel
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Deployment successful!
    echo 🌐 Your app is now live on Vercel
    echo.
    echo 📋 Next steps:
    echo   - Visit your Vercel dashboard to see the deployment
    echo   - Check the deployment logs if needed
    echo   - Set up a custom domain if desired
) else (
    echo.
    echo ❌ Deployment failed
    echo 📖 Check the error messages above
    echo 🔧 Common solutions:
    echo   - Make sure you're logged in: vercel login
    echo   - Check your internet connection
    echo   - Try deploying again
)

echo.
pause
