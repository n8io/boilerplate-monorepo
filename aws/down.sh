#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

TMP_DIR=${TMP_DIR:-"${DIR}/../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/down.log"}

mkdir -p "${LOG_DIR}"

echo $(date) > "${LOG_FILE}"

"${DIR}/aws-down.sh" | tee -a "${LOG_FILE}"
