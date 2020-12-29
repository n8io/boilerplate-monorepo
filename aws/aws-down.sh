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

TMP_DIR=${TMP_DIR:-"${DIR}/../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/.env"}
UP_ENV_FILE=${UP_ENV_FILE:-"${LOG_DIR}/.env.up"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/down.log"}

rm -f "${UP_ENV_FILE}" >/dev/null
source "${ENV_FILE}"

# ========== Development specific resources ===============================================
if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV:-""}" ]]; then
  echo -n "Deleting dev api gateway domain ${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV}..."
  ${AWS_API_GATEWAY} delete-base-path-mapping \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_DEV}" \
    --base-path "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_BASE_PATH_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_DEV:-""}" ]]; then
  echo -n "Deleting dev api gateway domain ${VPC_API_GATEWAY_DOMAIN_DEV}..."
  ${AWS_API_GATEWAY} delete-domain-name \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_DEV}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_URL_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"

  echo "  ...waiting a minute for elastic load balancers to be torn down"
  sleep 60
fi

if [[ ! -z "${WEB_CERTIFICATE_ARN_DEV:-""}" ]]; then
  echo -n "Deleting dev certificate ${VPC_API_GATEWAY_STAGE_NAME_DEV}..."
  ${AWS_ACM} delete-certificate \
    --certificate-arn "${WEB_CERTIFICATE_ARN_DEV}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^WEB_CERTIFICATE_ARN_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_DEPLOYMENT_ID_DEV:-""}" ]]; then
  VPC_API_GATEWAY_STAGE_NAME_DEV=${VPC_API_GATEWAY_STAGE_NAME_DEV:-production}

  echo -n "Deleting dev api gateway stage ${VPC_API_GATEWAY_STAGE_NAME_DEV}..."
  ${AWS_API_GATEWAY} delete-stage \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    --stage-name ${VPC_API_GATEWAY_STAGE_NAME_DEV} \
    >/dev/null
  echo "done"

  echo -n "Deleting dev api gateway deployment..."
  ${AWS_API_GATEWAY} delete-deployment \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    --deployment-id ${VPC_API_GATEWAY_DEPLOYMENT_ID_DEV} \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_STAGE_NAME_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_DEPLOYMENT_ID_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_ID_DEV:-""}" ]]; then
  echo -n "Deleting dev api gateway..."
  ${AWS_API_GATEWAY} delete-rest-api \
    --rest-api-id ${VPC_API_GATEWAY_ID_DEV} \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_API_GATEWAY_PROXY_RESOURCE_ID_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_ID_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_DEV:-""}" ]]; then
  VPC_LAMBDA_NAME_DEV=${VPC_LAMBDA_NAME_DEV:-${VPC_NAME}-graphql}

  echo -n "Deleting dev lambda function ${VPC_LAMBDA_NAME_DEV}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_DEV} \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_LAMBDA_NAME_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_LAMBDA_ARN_DEV/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi
# ========== END Development specific resources ===============================================

# ========== Production specific resources ===============================================
if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD:-""}" ]]; then
  echo -n "Deleting prd api gateway domain ${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD}..."
  ${AWS_API_GATEWAY} delete-base-path-mapping \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_PRD}" \
    --base-path "${VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_BASE_PATH_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_DOMAIN_PRD:-""}" ]]; then
  echo -n "Deleting prd api gateway domain ${VPC_API_GATEWAY_DOMAIN_PRD}..."
  ${AWS_API_GATEWAY} delete-domain-name \
    --domain-name "${VPC_API_GATEWAY_DOMAIN_PRD}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_DOMAIN_URL_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"

  echo "  ...waiting a minute for elastic load balancers to be torn down"
  sleep 60
fi

if [[ ! -z "${WEB_CERTIFICATE_ARN_PRD:-""}" ]]; then
  echo -n "Deleting prd certificate ${VPC_API_GATEWAY_STAGE_NAME_PRD}..."
  ${AWS_ACM} delete-certificate \
    --certificate-arn "${WEB_CERTIFICATE_ARN_PRD}" \
    >/dev/null
  echo "done"

  sed -i.bak '/^WEB_CERTIFICATE_ARN_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_DEPLOYMENT_ID_PRD:-""}" ]]; then
  VPC_API_GATEWAY_STAGE_NAME_PRD=${VPC_API_GATEWAY_STAGE_NAME_PRD:-production}

  echo -n "Deleting prd api gateway stage ${VPC_API_GATEWAY_STAGE_NAME_PRD}..."
  ${AWS_API_GATEWAY} delete-stage \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    --stage-name ${VPC_API_GATEWAY_STAGE_NAME_PRD} \
    >/dev/null
  echo "done"

  echo -n "Deleting prd api gateway deployment..."
  ${AWS_API_GATEWAY} delete-deployment \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    --deployment-id ${VPC_API_GATEWAY_DEPLOYMENT_ID_PRD} \
    >/dev/null
  echo "done"

  sed -i.bak '/^VPC_API_GATEWAY_STAGE_NAME_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_DEPLOYMENT_ID_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_API_GATEWAY_ID_PRD:-""}" ]]; then
  echo -n "Deleting prd api gateway..."
  ${AWS_API_GATEWAY} delete-rest-api \
    --rest-api-id ${VPC_API_GATEWAY_ID_PRD} \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_API_GATEWAY_PROXY_RESOURCE_ID_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_API_GATEWAY_ID_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_MIGRATIONS_PRD:-""}" ]]; then
  VPC_LAMBDA_NAME_MIGRATIONS_PRD=${VPC_LAMBDA_NAME_MIGRATIONS_PRD:-${VPC_NAME}-graphql}

  echo -n "Deleting prod lambda function ${VPC_LAMBDA_NAME_MIGRATIONS_PRD}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_MIGRATIONS_PRD} \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_LAMBDA_NAME_MIGRATIONS_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_LAMBDA_ARN_MIGRATIONS_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_LAMBDA_ARN_PRD:-""}" ]]; then
  VPC_LAMBDA_NAME_PRD=${VPC_LAMBDA_NAME_PRD:-${VPC_NAME}-graphql}

  echo -n "Deleting lambda function ${VPC_LAMBDA_NAME_PRD}..."
  ${AWS_LAMBDA} delete-function \
    --function-name ${VPC_LAMBDA_NAME_PRD} \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_LAMBDA_NAME_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_LAMBDA_ARN_PRD/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
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

  sed -i.bak '/^VPC_LAMBDA_ROLE_POLICY_ARN/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_LAMBDA_ROLE_ARN/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_LAMBDA_ROLE_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ECR_REPO_NAME_MIGRATIONS:-""}" ]]; then
  echo -n "Deleting ecr repository ${VPC_ECR_REPO_NAME_MIGRATIONS}..."
  ${AWS_ECR} delete-repository \
    --repository-name ${VPC_ECR_REPO_NAME_MIGRATIONS} \
    --force \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_ECR_REPO_NAME_MIGRATIONS/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_ECR_LAMBDA_IMAGE_ARN_MIGRATIONS/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ECR_REPO_NAME:-""}" ]]; then
  echo -n "Deleting ecr repository ${VPC_ECR_REPO_NAME}..."
  ${AWS_ECR} delete-repository \
    --repository-name ${VPC_ECR_REPO_NAME} \
    --force \
    >/dev/null
  echo "done."

  sed -i.bak '/^VPC_ECR_REPO_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_ECR_LAMBDA_IMAGE_ARN/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_DB_CLUSTER_NAME:-""}" ]]; then
  echo "Deleting database cluster..."
  ${AWS_RDS} delete-db-cluster \
    --db-cluster-identifier ${VPC_DB_CLUSTER_NAME} \
    --skip-final-snapshot \
    >/dev/null

  sed -i.bak '/^VPC_DB_ENDPOINT/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_DB_CLUSTER_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"

  sleep 2
  DB_STATUS="$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")"
  until [ -z $DB_STATUS ];
  do
    echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
    sleep 15
    DB_STATUS=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
  done
  echo "Database deleted."
fi

if [[ ! -z "${VPC_DB_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting database subnet group..."
  ${AWS_RDS} delete-db-subnet-group --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} | true
  echo "done."
  sed -i.bak '/^VPC_DB_SUBNET_GROUP_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sleep 10
fi

if [[ ! -z "${VPC_SECURITY_GROUP_DB_ID:-""}" ]]; then
  echo -n "Deleting database security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_DB_ID} | true
  echo "done."
  sed -i.bak '/^VPC_SECURITY_GROUP_DB_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sleep 10
fi

if [[ ! -z "${VPC_CACHE_CLUSTER_NAME:-""}" ]]; then
  echo "Deleting cache cluster..."
  ${AWS_CACHE} delete-cache-cluster \
    --cache-cluster-id ${VPC_CACHE_CLUSTER_NAME} \
    >/dev/null

  sed -i.bak '/^VPC_CACHE_ENDPOINT/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_CACHE_CLUSTER_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"

  sleep 2
  CACHE_STATUS="$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")"
  until [ -z $CACHE_STATUS ];
  do
    echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
    sleep 15
    CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
  done
  echo "Cache deleted."
fi

if [[ ! -z "${VPC_SECURITY_GROUP_CACHE_ID:-""}" ]]; then
  echo -n "Deleting cache security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_CACHE_ID} | true
  echo "done."
  sed -i.bak '/^VPC_SECURITY_GROUP_CACHE_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_CACHE_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting cache subnet group..."
  ${AWS_CACHE} delete-cache-subnet-group --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} | true
  echo "done."
  sed -i.bak '/^VPC_CACHE_SUBNET_GROUP_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
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

  sed -i.bak '/^VPC_SECURITY_GROUP_LAMBDA_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_SECURITY_GROUP_CUSTOM_ID:-""}" ]]; then
  echo -n "Deleting custom security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_CUSTOM_ID} | true
  echo "done."

  sed -i.bak '/^VPC_SECURITY_GROUP_CUSTOM_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID:-""}" ]]; then
  echo -n "Disassociating route table with public subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID} | true
  echo "done."

  sed -i.bak '/^VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PUBLIC_ID:-""}" ]]; then
  echo -n "Deleting public route table..."
  ${AWS_EC2} delete-route-table --route-table-id ${VPC_ROUTE_TABLE_PUBLIC_ID} | true
  echo "done."

  sed -i.bak '/^VPC_ROUTE_TABLE_PUBLIC_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2:-""}" ]]; then
  echo -n "Disassociating route table with second private subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2} | true
  echo "done."

  sed -i.bak '/^VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1:-""}" ]]; then
  echo -n "Disassociating route table with first private subnet..."
  ${AWS_EC2} disassociate-route-table --association-id ${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1} | true
  echo "done."

  sed -i.bak '/^VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ROUTE_TABLE_PRIVATE_ID:-""}" ]]; then
  echo -n "Deleting private route table..."
  ${AWS_EC2} delete-route-table --route-table-id ${VPC_ROUTE_TABLE_PRIVATE_ID} | true
  echo "done."

  sed -i.bak '/^VPC_ROUTE_TABLE_PRIVATE_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_NAT_GATEWAY_ID:-""}" ]]; then
  echo "Deleting nat gateway..."
  ${AWS_EC2} delete-nat-gateway --nat-gateway-id ${VPC_NAT_GATEWAY_ID} >/dev/null

  sed -i.bak '/^VPC_NAT_GATEWAY_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"

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

  sed -i.bak '/^VPC_ELASTIC_IP_ALLOCATION_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_INTERNET_GATEWAY_ID:-""}" ]]; then
  echo -n "Detaching internet gateway from VPC..."
  ${AWS_EC2} detach-internet-gateway --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} --vpc-id ${VPC_ID} | true
  echo "done."

  echo -n "Deleting internet gateway..."
  ${AWS_EC2} delete-internet-gateway --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} | true
  echo "done."
  sed -i.bak '/^VPC_INTERNET_GATEWAY_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_SUBNET_PUBLIC_ID:-""}" ]]; then
  echo -n "Deleting public subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PUBLIC_ID} | true
  echo "done"
  sed -i.bak '/^VPC_SUBNET_PUBLIC_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_SUBNET_PRIVATE_ID_2:-""}" ]]; then
  echo -n "Deleting second private subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PRIVATE_ID_2} | true
  echo "done"
  sed -i.bak '/^VPC_SUBNET_PRIVATE_ID_2/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_SUBNET_PRIVATE_ID_1:-""}" ]]; then
  echo -n "Deleting first private subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PRIVATE_ID_1} | true
  echo "done"
  sed -i.bak '/^VPC_SUBNET_PRIVATE_ID_1/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ID:-""}" ]]; then
  echo -n "Deleting VPC..."
  sleep 5
  ${AWS_EC2} delete-vpc --vpc-id ${VPC_ID} | true
  echo "done"

  sed -i.bak '/^VPC_ACCOUNT_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sed -i.bak '/^VPC_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

echo "Teardown complete"
