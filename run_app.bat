@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

set "DRY_RUN=0"
if /I "%~1"=="--dry-run" set "DRY_RUN=1"

echo.
echo ========================================
echo   Fabiansyah Putra - Portfolio Launcher
echo ========================================
echo.
echo Project Directory: %PROJECT_DIR%
echo.

REM Check for Node.js
where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not on PATH.
  echo Please install Node.js from https://nodejs.org/
  echo Then run this script again.
  echo.
  pause
  exit /b 1
)

REM Check for npm
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm.cmd is not available on PATH.
  echo Please ensure Node.js is properly installed.
  echo.
  pause
  exit /b 1
)

REM Verify Node.js version
for /f "tokens=*" %%i in ('node --version') do set "NODE_VERSION=%%i"
echo [INFO] Node.js detected: %NODE_VERSION%

REM Check for npm version
for /f "tokens=*" %%i in ('npm --version') do set "NPM_VERSION=%%i"
echo [INFO] npm detected: %NPM_VERSION%
echo.

REM Check and install Node dependencies
if exist "package.json" (
  echo [INFO] package.json found. Checking dependencies...
  if not exist "node_modules" (
    echo [INFO] node_modules missing. Installing Node dependencies...
    if "%DRY_RUN%"=="1" (
      echo [DRY RUN] npm.cmd install
      echo.
    ) else (
      call npm.cmd install
      if errorlevel 1 (
        echo.
        echo [ERROR] npm install failed. Please check your internet connection.
        echo.
        pause
        exit /b 1
      )
      echo [SUCCESS] Dependencies installed successfully.
      echo.
    )
  ) else (
    echo [INFO] Node dependencies already present. Skipping installation.
    echo.
  )
) else (
  echo [WARN] No package.json found. Skipping Node dependency checks.
  echo.
)

REM Check for Python dependencies (if needed)
if exist "requirements.txt" (
  echo [INFO] requirements.txt found.
  where python >nul 2>&1
  if errorlevel 1 (
    echo [WARN] Python is not installed, but requirements.txt was found.
    echo If you need Python dependencies, install Python from https://www.python.org/
    echo.
  ) else (
    echo [INFO] Installing Python dependencies from requirements.txt...
    if "%DRY_RUN%"=="1" (
      echo [DRY RUN] python -m pip install -r requirements.txt
    ) else (
      call python -m pip install -r requirements.txt
      if errorlevel 1 (
        echo [WARN] Python dependency installation failed.
        echo Continuing anyway...
      ) else (
        echo [SUCCESS] Python dependencies installed successfully.
      )
    )
    echo.
  )
) else (
  echo [INFO] No requirements.txt found. No Python dependencies to install.
  echo.
)

if "%DRY_RUN%"=="1" (
  echo ========================================
  echo DRY RUN MODE
  echo ========================================
  echo [DRY RUN] npm.cmd run dev -- --host 127.0.0.1
  echo [DRY RUN] start http://127.0.0.1:5173
  echo.
  echo No actual changes were made.
  pause
  exit /b 0
)

echo [INFO] Starting local development server on http://127.0.0.1:5173
echo [INFO] This may take a few seconds...
start "Portfolio Dev Server" cmd /k "cd /d ""%PROJECT_DIR%"" && npm.cmd run dev -- --host 127.0.0.1"

echo [INFO] Waiting for the dev server to initialize...
timeout /t 6 /nobreak >nul

echo [INFO] Launching website in your default browser...
start "" "http://127.0.0.1:5173"

echo.
echo ========================================
echo [SUCCESS] Development server launched!
echo ========================================
echo.
echo Your portfolio website is now running at:
echo   http://127.0.0.1:5173
echo.
echo Press Ctrl+C in the server window to stop the development server.
echo.

exit /b 0
