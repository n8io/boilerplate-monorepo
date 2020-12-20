#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

TMP_DIR=${TMP_DIR:-"${DIR}/../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
UP_ENV_FILE=${UP_ENV_FILE:-"${LOG_DIR}/.env.up"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/.env"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/up.log"}

mkdir -p "${LOG_DIR}"
touch "${UP_ENV_FILE}"
echo -n "" > "${ENV_FILE}.bkp"

if [[ -z $(grep '[^[:space:]]' "${UP_ENV_FILE}") ]]; then
  echo "$(date) VPC creation started..." > "${LOG_FILE}"
  echo -n "" > "${ENV_FILE}"
fi

"${DIR}/aws-up.sh" | tee -a "${LOG_FILE}"
