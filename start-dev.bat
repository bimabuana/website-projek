@echo off

REM Start Laravel backend serve di jendela baru
start cmd /k "php artisan serve --host=192.168.43.91 --port=8000"

REM Start React dev server di jendela ini (atau juga bisa pakai start cmd /k)
npm run dev

pause
