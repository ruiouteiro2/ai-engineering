#!/usr/bin/env bash
set -euo pipefail
# Uses the dedicated development container; do not point this at an unrelated service.
backup_dir="${1:-.data/backups}"
mkdir -p "$backup_dir"
chmod 700 "$backup_dir"
backup_file="$backup_dir/ai-engineering-$(date -u +%Y%m%dT%H%M%SZ).dump"
docker exec ai-engineering-postgres pg_dump -U ai_app -d ai_engineering -Fc > "$backup_file"
chmod 600 "$backup_file"
printf 'Backup created: %s\n' "$backup_file"
