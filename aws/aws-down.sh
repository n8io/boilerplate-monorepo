#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

AWS_PROFILE=${AWS_PROFILE:-aws-n8io-dev}
JQ_BIN="$(which jq) -r"
AWS_BIN="$(which aws) --profile=${AWS_PROFILE}"
AWS_ACM="${AWS_BIN} acm"
AWS_API_GATEWAY="${AWS_BIN} apigateway"
AWS_CACHE="${AWS_BIN} elasticache"
AWS_EC2="${AWS_BIN} ec2"
AWS_ECR="${AWS_BIN} ecr"
AWS_IAM="${AWS_BIN} iam"
AWS_LAMBDA="${AWS_BIN} lambda"
AWS_RDS="${AWS_BIN} rds"
AWS_RDS_DATA="${AWS_BIN} rds-data"
AWS_SECRETS="${AWS_BIN} secretsmanager"

TMP_DIR=${TMP_DIR:-"${DIR}/../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/.env"}
UP_ENV_FILE=${UP_ENV_FILE:-"${LOG_DIR}/.env.up"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/down.log"}

source "${ENV_FILE}"

CF_CLI="docker run --rm -it -e CF_API_KEY=${CLOUDFLARE_TOKEN} -e CF_API_DOMAIN=${WEB_DOMAIN} dpig/cloudflare-cli"

rm_env() {
  sed -i.bak '/^'"$1"'/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
}

rm_step() {
  sed -i.bak '/^'"$1"'/d' "${UP_ENV_FILE}" && rm "${UP_ENV_FILE}.bak"
}

# ========== Development specific resources ===============================================
if [[ -n "${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_DEV:-""}" ]]; then
  if [[ -n "${CLOUDFLARE_TOKEN:-""}" ]]; then
    echo "Looking up CloudFlare DNS CNAME for ${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_DEV}..."

    EXISTING_DNS_CNAME=`${CF_CLI} ls \
      -f json \
      | ${JQ_BIN} '.[] | select(.type=="CNAME") | select(.name=="'${VPC_CLOUDFLARE_DNS_CERT_VERIFICATION_CNAME_DEV}'") | .name' \
      | sed 's/null//'
    `

    if [[ -n "${EXISTING_DNS_CNAME}" ]]; then
      echo "Deleting the existing DNS CNAME record for ${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_DEV} CNAME..."
      ${CF_CLI} rm ${EXISTING_DNS_CNAME} -q type:CNAME
      echo "done."
    fi
  fi

  rm_env "VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_DEV"
  rm_env "VPC_CLOUDFLARE_DNS_CERT_VERIFICATION_CNAME_DEV"
  rm_step "STEP_CLOUDFLARE_DNS_UPDATED_DEV"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV:-""}" ]]; then
  echo -n "Deleting api gateway domain ${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV}..."
  ${AWS_API_GATEWAY} delete-base-path-mapping \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_DEV}" \
    --base-path "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV}" \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV"
  rm_step "STEP_API_GATEWAY_DOMAIN_PATH_MAPPED_DEV"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_DEV:-""}" ]]; then
  echo -n "Deleting api gateway domain ${VPC_API_GATEWAY_DOMAIN_DEV}..."
  ${AWS_API_GATEWAY} delete-domain-name \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_DEV}" \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_DOMAIN_DEV"
  rm_env "VPC_API_GATEWAY_DOMAIN_URL_DEV"
  rm_step "STEP_API_GATEWAY_DOMAIN_CREATED_DEV"

  echo "  ...waiting a minute for elastic load balancers to be torn down"
  sleep 60
fi

if [[ ! -z "${WEB_CERTIFICATE_ARN_DEV:-""}" ]]; then
  echo -n "Deleting certificate ${VPC_API_GATEWAY_STAGE_NAME_DEV}..."
  ${AWS_ACM} delete-certificate \
    --certificate-arn "${WEB_CERTIFICATE_ARN_DEV}" \
    >/dev/null
  echo "done"

  rm_env "WEB_CERTIFICATE_ARN_DEV"
  rm_step "STEP_WEB_CERT_ISSUED_DEV"
fi

if [[ ! -z "${VPC_API_GATEWAY_DEPLOYMENT_ID_DEV:-""}" ]]; then
  VPC_API_GATEWAY_STAGE_NAME_DEV=${VPC_API_GATEWAY_STAGE_NAME_DEV:-production}

  echo -n "Deleting api gateway stage ${VPC_API_GATEWAY_STAGE_NAME_DEV}..."
  ${AWS_API_GATEWAY} delete-stage \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    --stage-name ${VPC_API_GATEWAY_STAGE_NAME_DEV} \
    >/dev/null
  echo "done"

  echo -n "Deleting api gateway deployment..."
  ${AWS_API_GATEWAY} delete-deployment \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    --deployment-id ${VPC_API_GATEWAY_DEPLOYMENT_ID_DEV} \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_STAGE_NAME_DEV"
  rm_env "VPC_API_GATEWAY_DEPLOYMENT_ID_DEV"
  rm_step "STEP_API_GATEWAY_DEPLOYED_DEV"
fi

if [[ ! -z "${VPC_API_GATEWAY_ID_DEV:-""}" ]]; then
  echo -n "Deleting api gateway..."
  ${AWS_API_GATEWAY} delete-rest-api \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    >/dev/null
  echo "done."

  rm_env "VPC_API_GATEWAY_PROXY_RESOURCE_ID_DEV"
  rm_env "VPC_API_GATEWAY_ID_DEV"
  rm_step "STEP_API_GATEWAY_LAMBDA_PERMISSION_GRANTED_DEV"
  rm_step "STEP_API_GATEWAY_ROOT_RESOURCE_ANY_METHOD_INTEGRATION_CREATED_DEV"
  rm_step "STEP_API_GATEWAY_PROXY_ANY_METHOD_CREATED_DEV"
  rm_step "STEP_API_GATEWAY_PROXY_RESOURCE_CREATED_DEV"
  rm_step "STEP_API_GATEWAY_CREATED_DEV"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_MIGRATIONS_DEV:-""}" ]]; then
  VPC_LAMBDA_NAME_MIGRATIONS_DEV=${VPC_LAMBDA_NAME_MIGRATIONS_DEV:-${VPC_NAME}-graphql}

  echo -n "Deleting lambda function ${VPC_LAMBDA_NAME_MIGRATIONS_DEV}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_MIGRATIONS_DEV} \
    >/dev/null
  echo "done."

  rm_env "VPC_LAMBDA_NAME_MIGRATIONS_DEV"
  rm_env "VPC_LAMBDA_ARN_MIGRATIONS_DEV"
  rm_step "STEP_LAMBDA_FUNCTION_CREATED_MIGRATIONS_DEV"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_DEV:-""}" ]]; then
  VPC_LAMBDA_NAME_DEV=${VPC_LAMBDA_NAME_DEV:-${VPC_NAME}-graphql}

  echo -n "Deleting lambda function ${VPC_LAMBDA_NAME_DEV}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_DEV} \
    >/dev/null
  echo "done."

  rm_env "VPC_LAMBDA_NAME_DEV"
  rm_env "VPC_LAMBDA_ARN_DEV"
  rm_step "STEP_LAMBDA_FUNCTION_CREATED_DEV"
fi

if [[ ! -z "${VPC_DB_SECRET_NAME_DEV:-""}" ]]; then
  echo -n "Deleting ${VPC_DB_SECRET_NAME_DEV} secret..."
  ${AWS_SECRETS} delete-secret \
    --secret-id "${VPC_DB_SECRET_NAME_DEV}" \
    --force-delete-without-recovery \
  >/dev/null
  echo "done."

  rm_env "VPC_DB_SECRET_ARN_DEV"
  rm_env "VPC_DB_SECRET_NAME_DEV"
  rm_step "STEP_DB_SECRET_CREATED_DEV"
fi

if [[ ! -z "${VPC_DB_CLUSTER_NAME_DEV:-""}" ]]; then
  echo "Deleting database cluster (${VPC_DB_CLUSTER_NAME_DEV})..."
  ${AWS_RDS} delete-db-cluster \
    --db-cluster-identifier ${VPC_DB_CLUSTER_NAME_DEV} \
    --skip-final-snapshot \
    >/dev/null

  rm_env "VPC_DB_ENDPOINT_DEV"
  rm_env "VPC_DB_NAME_DEV"
  rm_env "VPC_DB_CLUSTER_ARN_DEV"
  rm_env "VPC_DB_CLUSTER_NAME_DEV"
  rm_env "VPC_DB_PASSWORD_DEV"
  rm_step "STEP_DB_CLUSTER_CREATED_DEV"

  sleep 2
  DB_STATUS="$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME_DEV}\") | .Status")"
  until [ -z $DB_STATUS ];
  do
    echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
    sleep 15
    DB_STATUS=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME_DEV}\") | .Status")
  done
  echo "Database deleted."
fi

if [[ ! -z "${VPC_CACHE_CLUSTER_NAME_DEV:-""}" ]]; then
  echo "Deleting cache cluster (${VPC_CACHE_CLUSTER_NAME_DEV})..."
  ${AWS_CACHE} delete-cache-cluster \
    --cache-cluster-id ${VPC_CACHE_CLUSTER_NAME_DEV} \
    >/dev/null

  rm_env "VPC_CACHE_ENDPOINT_DEV"
  rm_env "VPC_CACHE_CLUSTER_NAME_DEV"
  rm_step "STEP_CACHE_CLUSTER_CREATED_DEV"

  sleep 2
  CACHE_STATUS="$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME_DEV}\") | .CacheClusterStatus")"
  until [ -z $CACHE_STATUS ];
  do
    echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
    sleep 15
    CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME_DEV}\") | .CacheClusterStatus")
  done
  echo "Cache deleted."
fi
# ========== END Development specific resources ===============================================

# ========== Production specific resources ===============================================
if [[ -n "${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_PRD:-""}" ]]; then
  if [[ -n "${CLOUDFLARE_TOKEN:-""}" ]]; then
    echo "Looking up CloudFlare DNS CNAME for ${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_PRD}..."

    EXISTING_DNS_CNAME=`${CF_CLI} ls \
      -f json \
      | ${JQ_BIN} '.[] | select(.type=="CNAME") | select(.name=="'${VPC_CLOUDFLARE_DNS_CERT_VERIFICATION_CNAME_PRD}'") | .name' \
      | sed 's/null//'
    `

    if [[ -n "${EXISTING_DNS_CNAME}" ]]; then
      echo "Deleting the existing DNS CNAME record for ${VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_PRD} CNAME..."
      ${CF_CLI} rm ${EXISTING_DNS_CNAME} -q type:CNAME
      echo "done."
    fi
  fi

  rm_env "VPC_CLOUDFLARE_DNS_GRAPHQL_CNAME_PRD"
  rm_env "VPC_CLOUDFLARE_DNS_CERT_VERIFICATION_CNAME_PRD"
  rm_step "STEP_CLOUDFLARE_DNS_UPDATED_PRD"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD:-""}" ]]; then
  echo -n "Deleting api gateway domain ${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD}..."
  ${AWS_API_GATEWAY} delete-base-path-mapping \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_PRD}" \
    --base-path "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD}" \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD"
  rm_step "STEP_API_GATEWAY_DOMAIN_PATH_MAPPED_PRD"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_PRD:-""}" ]]; then
  echo -n "Deleting api gateway domain ${VPC_API_GATEWAY_DOMAIN_PRD}..."
  ${AWS_API_GATEWAY} delete-domain-name \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_PRD}" \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_DOMAIN_PRD"
  rm_env "VPC_API_GATEWAY_DOMAIN_URL_PRD"
  rm_step "STEP_API_GATEWAY_DOMAIN_CREATED_PRD"

  echo "  ...waiting a minute for elastic load balancers to be torn down"
  sleep 60
fi

if [[ ! -z "${WEB_CERTIFICATE_ARN_PRD:-""}" ]]; then
  echo -n "Deleting certificate ${VPC_API_GATEWAY_STAGE_NAME_PRD}..."
  ${AWS_ACM} delete-certificate \
    --certificate-arn "${WEB_CERTIFICATE_ARN_PRD}" \
    >/dev/null
  echo "done"

  rm_env "WEB_CERTIFICATE_ARN_PRD"
  rm_step "STEP_WEB_CERT_ISSUED_PRD"
fi

if [[ ! -z "${VPC_API_GATEWAY_DEPLOYMENT_ID_PRD:-""}" ]]; then
  VPC_API_GATEWAY_STAGE_NAME_PRD=${VPC_API_GATEWAY_STAGE_NAME_PRD:-production}

  echo -n "Deleting api gateway stage ${VPC_API_GATEWAY_STAGE_NAME_PRD}..."
  ${AWS_API_GATEWAY} delete-stage \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    --stage-name ${VPC_API_GATEWAY_STAGE_NAME_PRD} \
    >/dev/null
  echo "done"

  echo -n "Deleting api gateway deployment..."
  ${AWS_API_GATEWAY} delete-deployment \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    --deployment-id ${VPC_API_GATEWAY_DEPLOYMENT_ID_PRD} \
    >/dev/null
  echo "done"

  rm_env "VPC_API_GATEWAY_STAGE_NAME_PRD"
  rm_env "VPC_API_GATEWAY_DEPLOYMENT_ID_PRD"
  rm_step "STEP_API_GATEWAY_DEPLOYED_PRD"
fi

if [[ ! -z "${VPC_API_GATEWAY_ID_PRD:-""}" ]]; then
  echo -n "Deleting api gateway..."
  ${AWS_API_GATEWAY} delete-rest-api \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    >/dev/null
  echo "done."

  rm_env "VPC_API_GATEWAY_PROXY_RESOURCE_ID_PRD"
  rm_env "VPC_API_GATEWAY_ID_PRD"
  rm_step "STEP_API_GATEWAY_LAMBDA_PERMISSION_GRANTED_PRD"
  rm_step "STEP_API_GATEWAY_ROOT_RESOURCE_ANY_METHOD_INTEGRATION_CREATED_PRD"
  rm_step "STEP_API_GATEWAY_PROXY_ANY_METHOD_CREATED_PRD"
  rm_step "STEP_API_GATEWAY_PROXY_RESOURCE_CREATED_PRD"
  rm_step "STEP_API_GATEWAY_CREATED_PRD"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_MIGRATIONS_PRD:-""}" ]]; then
  VPC_LAMBDA_NAME_MIGRATIONS_PRD=${VPC_LAMBDA_NAME_MIGRATIONS_PRD:-${VPC_NAME}-graphql}

  echo -n "Deleting lambda function ${VPC_LAMBDA_NAME_MIGRATIONS_PRD}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_MIGRATIONS_PRD} \
    >/dev/null
  echo "done."

  rm_env "VPC_LAMBDA_NAME_MIGRATIONS_PRD"
  rm_env "VPC_LAMBDA_ARN_MIGRATIONS_PRD"
  rm_step "STEP_LAMBDA_FUNCTION_CREATED_MIGRATIONS_PRD"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_PRD:-""}" ]]; then
  VPC_LAMBDA_NAME_PRD=${VPC_LAMBDA_NAME_PRD:-${VPC_NAME}-graphql}

  echo -n "Deleting lambda function ${VPC_LAMBDA_NAME_PRD}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_PRD} \
    >/dev/null
  echo "done."

  rm_env "VPC_LAMBDA_NAME_PRD"
  rm_env "VPC_LAMBDA_ARN_PRD"
  rm_step "STEP_LAMBDA_FUNCTION_CREATED_PRD"
fi

if [[ ! -z "${VPC_DB_SECRET_NAME_PRD:-""}" ]]; then
  echo -n "Deleting ${VPC_DB_SECRET_NAME_PRD} secret..."
  ${AWS_SECRETS} delete-secret \
    --secret-id "${VPC_DB_SECRET_NAME_PRD}" \
    --force-delete-without-recovery \
  >/dev/null
  echo "done."

  rm_env "VPC_DB_SECRET_ARN_PRD"
  rm_env "VPC_DB_SECRET_NAME_PRD"
  rm_step "STEP_DB_SECRET_CREATED_PRD"
fi

if [[ ! -z "${VPC_DB_CLUSTER_NAME_PRD:-""}" ]]; then
  echo "Deleting database cluster (${VPC_DB_CLUSTER_NAME_PRD})..."
  ${AWS_RDS} delete-db-cluster \
    --db-cluster-identifier ${VPC_DB_CLUSTER_NAME_PRD} \
    --skip-final-snapshot \
    >/dev/null

  rm_env "VPC_DB_ENDPOINT_PRD"
  rm_env "VPC_DB_NAME_PRD"
  rm_env "VPC_DB_CLUSTER_ARN_PRD"
  rm_env "VPC_DB_CLUSTER_NAME_PRD"
  rm_env "VPC_DB_PASSWORD_PRD"
  rm_step "STEP_DB_CLUSTER_CREATED_PRD"

  sleep 2
  DB_STATUS="$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME_PRD}\") | .Status")"
  until [ -z $DB_STATUS ];
  do
    echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
    sleep 15
    DB_STATUS=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME_PRD}\") | .Status")
  done
  echo "Database deleted."
fi

if [[ ! -z "${VPC_CACHE_CLUSTER_NAME_PRD:-""}" ]]; then
  echo "Deleting cache cluster (${VPC_CACHE_CLUSTER_NAME_PRD})..."
  ${AWS_CACHE} delete-cache-cluster \
    --cache-cluster-id ${VPC_CACHE_CLUSTER_NAME_PRD} \
    >/dev/null

  rm_env "VPC_CACHE_ENDPOINT_PRD"
  rm_env "VPC_CACHE_CLUSTER_NAME_PRD"
  rm_step "STEP_CACHE_CLUSTER_CREATED_PRD"

  sleep 2
  CACHE_STATUS="$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME_PRD}\") | .CacheClusterStatus")"
  until [ -z $CACHE_STATUS ];
  do
    echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
    sleep 15
    CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME_PRD}\") | .CacheClusterStatus")
  done
  echo "Cache deleted."
fi
# ========== END Production specific resources ===============================================

if [[ ! -z "${VPC_LAMBDA_ROLE_ARN:-""}" ]]; then
  echo -n "Detaching lambda role policy from ${VPC_LAMBDA_ROLE_NAME} role..."
  ${AWS_IAM} detach-role-policy \
    --role-name ${VPC_LAMBDA_ROLE_NAME} \
    --policy-arn ${VPC_LAMBDA_ROLE_POLICY_ARN} \
    >/dev/null
  echo "done"

  echo -n "Deleting lambda iam role ${VPC_LAMBDA_ROLE_NAME}..."
  ${AWS_IAM} delete-role \
    --role-name ${VPC_LAMBDA_ROLE_NAME} \
    >/dev/null
  echo "done."

  rm_env "VPC_LAMBDA_ROLE_POLICY_ARN"
  rm_env "VPC_LAMBDA_ROLE_ARN"
  rm_env "VPC_LAMBDA_ROLE_NAME"
fi

if [[ ! -z "${VPC_ECR_REPO_NAME_MIGRATIONS:-""}" ]]; then
  echo -n "Deleting ecr repository ${VPC_ECR_REPO_NAME_MIGRATIONS}..."
  ${AWS_ECR} delete-repository \
    --repository-name ${VPC_ECR_REPO_NAME_MIGRATIONS} \
    --force \
    >/dev/null
  echo "done."

  rm_env "VPC_ECR_REPO_NAME_MIGRATIONS"
  rm_env "VPC_ECR_LAMBDA_IMAGE_ARN_MIGRATIONS"
fi

if [[ ! -z "${VPC_ECR_REPO_NAME:-""}" ]]; then
  echo -n "Deleting ecr repository ${VPC_ECR_REPO_NAME}..."
  ${AWS_ECR} delete-repository \
    --repository-name ${VPC_ECR_REPO_NAME} \
    --force \
    >/dev/null
  echo "done."

  rm_env "VPC_ECR_REPO_NAME"
  rm_env "VPC_ECR_LAMBDA_IMAGE_ARN"
fi

if [[ ! -z "${VPC_DB_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting database subnet group..."
  ${AWS_RDS} delete-db-subnet-group --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} | true
  echo "done."
  rm_env "VPC_DB_SUBNET_GROUP_NAME"
  sleep 10
fi

if [[ ! -z "${VPC_SECURITY_GROUP_DB_ID:-""}" ]]; then
  echo -n "Deleting database security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_DB_ID} | true
  echo "done."
  rm_env "VPC_SECURITY_GROUP_DB_ID"
  sleep 10
fi

if [[ ! -z "${VPC_SECURITY_GROUP_CACHE_ID:-""}" ]]; then
  echo -n "Deleting cache security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_CACHE_ID} | true
  echo "done."
  rm_env "VPC_SECURITY_GROUP_CACHE_ID"
fi

if [[ ! -z "${VPC_CACHE_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting cache subnet group..."
  ${AWS_CACHE} delete-cache-subnet-group --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} | true
  echo "done."
  rm_env "VPC_CACHE_SUBNET_GROUP_NAME"
fi

if [[ ! -z "${VPC_SECURITY_GROUP_LAMBDA_ID:-""}" ]]; then
  VPC_LAMBDA_NETWORK_INTERFACE=$(\
    ${AWS_EC2} describe-network-interfaces \
      --filter Name=group-id,Values=${VPC_SECURITY_GROUP_LAMBDA_ID} \
      | ${JQ_BIN} '.NetworkInterfaces[0].NetworkInterfaceId' | sed 's/null//'
  )

  if [[ ! -z "${VPC_LAMBDA_NETWORK_INTERFACE:-""}" ]]; then
    echo -n "Deleting lambda network interface..."
    ${AWS_EC2} delete-network-interface \
      --network-interface-id ${VPC_LAMBDA_NETWORK_INTERFACE} \
      >/dev/null
    echo "done."
  fi

  VPC_LAMBDA_NETWORK_INTERFACE=$(\
    ${AWS_EC2} describe-network-interfaces \
      --filter Name=group-id,Values=${VPC_SECURITY_GROUP_LAMBDA_ID} \
      | ${JQ_BIN} '.NetworkInterfaces[0].NetworkInterfaceId' | sed 's/null//'
  )

  if [[ ! -z "${VPC_LAMBDA_NETWORK_INTERFACE:-""}" ]]; then
    echo -n "Deleting second lambda network interface..."
    ${AWS_EC2} delete-network-interface \
      --network-interface-id ${VPC_LAMBDA_NETWORK_INTERFACE} \
      >/dev/null
    echo "done."
  fi

  echo -n "Deleting lambda security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_LAMBDA_ID} | true
  echo "done."

  rm_env "VPC_SECURITY_GROUP_LAMBDA_ID"
fi

if [[ ! -z "${VPC_SECURITY_GROUP_CUSTOM_ID:-""}" ]]; then
  echo -n "Deleting custom security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_CUSTOM_ID} | true
  echo "done."

  rm_env "VPC_SECURITY_GROUP_CUSTOM_ID"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID:-""}" ]]; then
  echo -n "Disassociating route table with public subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID} | true
  echo "done."

  rm_env "VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PUBLIC_ID:-""}" ]]; then
  echo -n "Deleting public route table..."
  ${AWS_EC2} delete-route-table --route-table-id ${VPC_ROUTE_TABLE_PUBLIC_ID} | true
  echo "done."

  rm_env "VPC_ROUTE_TABLE_PUBLIC_ID"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2:-""}" ]]; then
  echo -n "Disassociating route table with second private subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2} | true
  echo "done."

  rm_env "VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1:-""}" ]]; then
  echo -n "Disassociating route table with first private subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1} | true
  echo "done."

  rm_env "VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ID:-""}" ]]; then
  echo -n "Deleting private route table..."
  ${AWS_EC2} delete-route-table --route-table-id ${VPC_ROUTE_TABLE_PRIVATE_ID} | true
  echo "done."

  rm_env "VPC_ROUTE_TABLE_PRIVATE_ID"
fi

if [[ ! -z "${VPC_NAT_GATEWAY_ID:-""}" ]]; then
  echo "Deleting nat gateway..."
  ${AWS_EC2} delete-nat-gateway --nat-gateway-id ${VPC_NAT_GATEWAY_ID} >/dev/null

  rm_env "VPC_NAT_GATEWAY_ID"

  sleep 1
  NAT_GATEWAY_STATUS=$(${AWS_EC2} describe-nat-gateways --nat-gateway-ids "${VPC_NAT_GATEWAY_ID}" | ${JQ_BIN} ".NatGateways[] | select(.NatGatewayId == \"${VPC_NAT_GATEWAY_ID}\") | .State")
  until [ $NAT_GATEWAY_STATUS == 'deleted' ];
  do
    echo "  $(date +"%r") Waiting for nat to finish ${NAT_GATEWAY_STATUS}..."
    sleep 15
    NAT_GATEWAY_STATUS=$(${AWS_EC2} describe-nat-gateways --nat-gateway-ids "${VPC_NAT_GATEWAY_ID}" | ${JQ_BIN} ".NatGateways[] | select(.NatGatewayId == \"${VPC_NAT_GATEWAY_ID}\") | .State")
  done
  echo "done."
fi

if [[ ! -z "${VPC_ELASTIC_IP_ALLOCATION_ID:-""}" ]]; then
  echo -n "Releasing elastic ip..."
  ${AWS_EC2} release-address --allocation-id ${VPC_ELASTIC_IP_ALLOCATION_ID} | true
  echo "done."

  rm_env "VPC_ELASTIC_IP_ALLOCATION_ID"
fi

if [[ ! -z "${VPC_INTERNET_GATEWAY_ID:-""}" ]]; then
  echo -n "Detaching internet gateway from VPC..."
  ${AWS_EC2} detach-internet-gateway --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} --vpc-id ${VPC_ID} | true
  echo "done."

  echo -n "Deleting internet gateway..."
  ${AWS_EC2} delete-internet-gateway --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} | true
  echo "done."
  rm_env "VPC_INTERNET_GATEWAY_ID"
fi

if [[ ! -z "${VPC_SUBNET_PUBLIC_ID:-""}" ]]; then
  echo -n "Deleting public subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PUBLIC_ID} | true
  echo "done"
  rm_env "VPC_SUBNET_PUBLIC_ID"
fi

if [[ ! -z "${VPC_SUBNET_PRIVATE_ID_2:-""}" ]]; then
  echo -n "Deleting second private subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PRIVATE_ID_2} | true
  echo "done"
  rm_env "VPC_SUBNET_PRIVATE_ID_2"
fi

if [[ ! -z "${VPC_SUBNET_PRIVATE_ID_1:-""}" ]]; then
  echo -n "Deleting first private subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PRIVATE_ID_1} | true
  echo "done"
  rm_env "VPC_SUBNET_PRIVATE_ID_1"
fi

if [[ ! -z "${VPC_ID:-""}" ]]; then
  echo -n "Deleting VPC..."
  sleep 5
  ${AWS_EC2} delete-vpc --vpc-id ${VPC_ID} | true
  echo "done"

  rm_env "VPC_ACCOUNT_ID"
  rm_env "VPC_NAME"
  rm_env "VPC_ID"
  rm_env "WEB_DOMAIN"
  echo > "${UP_ENV_FILE}"
fi

echo "Teardown complete"
