#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

AWS_PROFILE=${AWS_PROFILE:-aws-n8io-dev}
AWS_BIN="$(which aws) --profile=${AWS_PROFILE}"
AWS_ACM="${AWS_BIN} acm"
AWS_API_GATEWAY="${AWS_BIN} apigateway"
AWS_CACHE="${AWS_BIN} elasticache"
AWS_EC2="${AWS_BIN} ec2"
AWS_ECR="${AWS_BIN} ecr"
AWS_IAM="${AWS_BIN} iam"
AWS_LAMBDA="${AWS_BIN} lambda"
AWS_RDS="${AWS_BIN} rds"

JQ_BIN="$(which jq) -r"
TMP_DIR=${TMP_DIR:-"${DIR}/../../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/.env"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/up.log"}

source "${ENV_FILE}"

VPC_REGION=${VPC_REGION:-us-east}
VPC_API_GATEWAY_NAME=${VPC_API_GATEWAY_NAME:-${VPC_NAME}}
