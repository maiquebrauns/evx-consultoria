@echo off
chcp 65001 >nul
title Evx Consultoria - Abrir no Celular
cd /d "%~dp0"

echo ============================================================
echo           EVX CONSULTORIA - INICIANDO SERVIDOR
echo ============================================================
echo.
echo Procurando instalacao do Node.js...

set "NODE_CMD=node"
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    ) else if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
        set "NODE_CMD=%LOCALAPPDATA%\Programs\node\node.exe"
    ) else (
        echo [ERRO] Node.js nao foi encontrado no sistema.
        echo Por favor, instale o Node.js em https://nodejs.org
        pause
        exit /b 1
    )
)

echo [OK] Node.js localizado.
echo.
echo Abrindo tela de conexao com QR Code no seu navegador...
start "" http://localhost:3000/celular

echo.
echo Servidor em execucao! Mantenha esta janela aberta enquanto navega.
echo.
"%NODE_CMD%" local-server.js

pause
