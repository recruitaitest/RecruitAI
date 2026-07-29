#!/bin/bash
echo "=========================================="
echo "Starting AI Resume Management Platform..."
echo "=========================================="

# Trap SIGINT and SIGTERM to stop all child background processes on exit
cleanup() {
    echo -e "\nStopping all background services..."
    kill 0
    exit
}
trap cleanup SIGINT SIGTERM

# 1. Start MinIO (Storage Server)
if [ -f "./Backend/minio" ]; then
    echo "[1/5] Starting MinIO Storage Server..."
    ./Backend/minio server ./Backend/data --console-address ":9001" > /dev/null 2>&1 &
elif command -v minio &> /dev/null; then
    echo "[1/5] Starting MinIO Storage Server..."
    minio server ./Backend/data --console-address ":9001" > /dev/null 2>&1 &
else
    echo "[1/5] MinIO binary not found locally. (Install via: wget https://dl.min.io/server/minio/release/linux-amd64/minio && chmod +x minio)"
fi

# 2. Start Redis
if command -v redis-server &> /dev/null; then
    echo "[2/5] Starting Redis Server..."
    redis-server > /dev/null 2>&1 &
else
    echo "[2/5] redis-server binary not in PATH. Assuming systemd redis service (sudo systemctl start redis)."
fi

# 3. Start Celery Worker
echo "[3/5] Starting Celery Worker..."
(cd Backend && { [ -d "venv" ] && source venv/bin/activate; celery -A app.celery_app worker -l info; }) &

# 4. Start FastAPI Backend
echo "[4/5] Starting FastAPI Backend..."
(cd Backend && { [ -d "venv" ] && source venv/bin/activate; uvicorn app.main:app --reload; }) &

# 5. Start Next.js Frontend
echo "[5/5] Starting Next.js Frontend..."
(cd Frontend && npm run dev) &

echo "=========================================="
echo "All services running! Press Ctrl+C to exit."
echo "=========================================="

wait
