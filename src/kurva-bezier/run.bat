@echo off
start cmd /c "npm run dev"
cmd /c "cd app/api && uvicorn main:app --reload"