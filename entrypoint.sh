#!/bin/sh

main() {
  yarn config set cache-folder "$YARN_CACHE_FOLDER" 1>/dev/null

  lerna bootstrap --loglevel silent
}

main

# Call command issued to the docker service
exec "$@"
