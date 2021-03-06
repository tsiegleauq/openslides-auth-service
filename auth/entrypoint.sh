#!/bin/bash

export STORAGE_PORT="${STORAGE_PORT:-6379}"
export MESSAGE_BUS_PORT="${MESSAGE_BUS_PORT:-6379}"

wait-for-it --timeout=10 "$STORAGE_HOST:$STORAGE_PORT"
wait-for-it --timeout=10 "$MESSAGE_BUS_HOST:$MESSAGE_BUS_PORT"

./key-gen.sh

exec "$@"
