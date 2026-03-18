@echo off
REM Clean up stuck git rebase and push to GitHub

cd /d D:\KARTHIK\code\Firebase\PCS

echo ===== Cleanup Stuck Rebase =====
git rebase --abort

echo.
echo ===== Reset to HEAD =====
git reset --hard HEAD

echo.
echo ===== Check Status =====
git status

echo.
echo ===== Push to GitHub =====
git push origin main --force-with-lease

echo.
echo ===== Push Complete! =====
pause
