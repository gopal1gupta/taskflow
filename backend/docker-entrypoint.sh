#!/bin/sh

set -e

echo "================================="
echo "Starting TaskFlow Backend"
echo "================================="

echo "Waiting for PostgreSQL to become available..."

DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-taskflow}"
DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-postgres}"
DATABASE_URL="${DATABASE_URL:-postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME}"
export DATABASE_URL

for attempt in $(seq 1 30); do
  if node -e "const { Pool } = require('pg'); const pool = new Pool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD }); pool.query('SELECT 1').then(() => process.exit(0)).catch(() => process.exit(1));"; then
    break
  fi

  echo "PostgreSQL not ready yet (attempt $attempt/30). Retrying..."
  sleep 2
done

echo "Running database migrations..."

npm run migrate:up

echo "Database migration completed"

echo "Starting Express server..."

node dist/server.js