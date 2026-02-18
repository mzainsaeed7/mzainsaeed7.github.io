@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM Safe clean: removes common build/cache directories for Next.js/Node
REM Does NOT touch source files, git, or configuration.

set "ROOT=%~dp0"
set "DRY_RUN=0"

REM Items to remove (directories)
set DIRS=.next out node_modules dist build coverage .turbo .cache .vercel .swc .parcel-cache .eslintcache .pnpm-store

REM Items to remove (files)
set FILES=.env.local .env.development.local .env.test.local .env.production.local

if /I "%1"=="--dry-run" set "DRY_RUN=1"

pushd "%ROOT%" >nul

if not "%DRY_RUN%"=="1" (
  echo This will delete build/cache artifacts in:
  echo   %CD%
  echo.
  echo Directories:
  for %%D in (%DIRS%) do if exist "%%D" echo   %%D
  echo.
  echo Files:
  for %%F in (%FILES%) do if exist "%%F" echo   %%F
  echo.
  set /p CONFIRM=Proceed? (y/N): 
  if /I not "!CONFIRM!"=="y" (
    echo Aborted.
    popd >nul
    exit /b 1
  )
) else (
  echo DRY RUN: no files will be deleted.
)

echo.
for %%D in (%DIRS%) do (
  if exist "%%D" (
    if "%DRY_RUN%"=="1" (
      echo [dry-run] rmdir /s /q "%%D"
    ) else (
      rmdir /s /q "%%D"
      echo Removed directory: %%D
    )
  )
)

for %%F in (%FILES%) do (
  if exist "%%F" (
    if "%DRY_RUN%"=="1" (
      echo [dry-run] del /q "%%F"
    ) else (
      del /q "%%F"
      echo Removed file: %%F
    )
  )
)

echo.
echo Done.
popd >nul
endlocal
