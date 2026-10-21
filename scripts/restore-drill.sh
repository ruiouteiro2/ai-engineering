#!/usr/bin/env bash
set -euo pipefail
backup_file="${1:?Usage: bash scripts/restore-drill.sh path/to/backup.dump}"
restore_db="ai_restore_$(date -u +%Y%m%d%H%M%S)"
docker exec ai-engineering-postgres createdb -U ai_app "$restore_db"
docker exec -i ai-engineering-postgres pg_restore -U ai_app -d "$restore_db" --no-owner --exit-on-error < "$backup_file"
docker exec ai-engineering-postgres psql -U ai_app -d "$restore_db" -v ON_ERROR_STOP=1 -c "SELECT count(*) AS products FROM products; SELECT count(*) AS orders FROM orders;"
printf 'Restored into separate database: %s. Source database was not changed.\n' "$restore_db"
