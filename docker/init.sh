#!/bin/bash
# Ensure the directory exists
mkdir -p /app/data

# Create the database file if it doesn't exist
if [ ! -f /app/data/gamedb.db ]; then
    touch /app/data/gamedb.db
fi

# Set appropriate permissions
chmod -R 777 /app/data

sqlite3 /app/data/gamedb.db "CREATE TABLE IF NOT EXISTS gamedb (id INTEGER PRIMARY KEY, value INTEGER(15), hasSeen BOOL, markedToBeDestoyed BOOL);"
