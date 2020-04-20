# Example usage:
# ./exit-untouched.sh path/with/changes/needed/to/continue/1 path/with/changes/needed/to/continue/2

# 1. Get all the arguments passed to the script
ARRAY_PATHS_TO_SEARCH="$*"

LATEST_COMMIT_HEAD=$(git rev-parse --short HEAD)

LATEST_COMMIT_MASTER=$(git rev-parse --short master)

COMMIT_RANGE="${LATEST_COMMIT_HEAD}..${LATEST_COMMIT_MASTER}"
ARRAY_CHANGED_PATHS=( $(git diff --format="" --name-only $COMMIT_RANGE | cut -d"/" -f1-5 | sort -u) )

HAS_CHANGES=0
for CHANGED_PATH in "${ARRAY_CHANGED_PATHS[@]}"; do
  if [[ $HAS_CHANGES -eq 1 ]]; then
    continue
  fi

  for SEARCH_PATH in "${ARRAY_PATHS_TO_SEARCH[@]}"; do
    if [[ $HAS_CHANGES -eq 1 ]]; then
      continue
    fi

    if [[ $CHANGED_PATH = $SEARCH_PATH* ]]; then
      HAS_CHANGES=1
    fi
  done
done

echo "Searched paths:"
for path in "${ARRAY_PATHS_TO_SEARCH[@]}"; do
  echo "  $path"
done
echo ""
echo "Changed paths:"
for path in "${ARRAY_CHANGED_PATHS[@]}"; do
  echo "  $path"
done
echo ""

if [ $HAS_CHANGES -eq 0 ]; then
  echo "🛑 No relevant changes were found. Exiting..."
  circleci step halt
else
  echo "✨ Some relevant code changes were found. Continuing..."
fi
