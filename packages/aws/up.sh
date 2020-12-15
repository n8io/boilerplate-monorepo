#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

LOG_DIR=${LOG_DIR:-"${DIR}/.tmp"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/aws.env"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/aws.log"}

mkdir -p "${LOG_DIR}"

echo $(date) > "${LOG_FILE}"
echo "" > "${ENV_FILE}"

"${DIR}/aws-up.sh" | tee -a "${LOG_FILE}"
