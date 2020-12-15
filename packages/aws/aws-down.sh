#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

AWS_PROFILE=${AWS_PROFILE:-aws-n8io-dev}
AWS_BIN="$(which aws) --profile=${AWS_PROFILE}"
AWS_CACHE="${AWS_BIN} elasticache"
AWS_EC2="${AWS_BIN} ec2"
AWS_RDS="${AWS_BIN} rds"

TMP_DIR=${TMP_DIR:-"${DIR}/../../.tmp"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}/.tmp"}
ENV_FILE=${ENV_FILE:-"${TMP_DIR}/aws.env"}
LOG_FILE=${LOG_FILE:-"${TMP_DIR}/aws.log"}

source "${ENV_FILE}"

if [[ ! -z "${VPC_CACHE_CLUSTER_NAME:-""}" ]]; then
  echo "Deleting cache cluster..."
  ${AWS_CACHE} delete-cache-cluster \
    --cache-cluster-id ${VPC_CACHE_CLUSTER_NAME} \
    >/dev/null

  sleep 2
  CACHE_STATUS="$(${AWS_CACHE} describe-cache-clusters | jq -r ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")"
  until [ -z $CACHE_STATUS ];
  do
    echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
    sleep 15
    CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | jq -r ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
  done
  echo "Cache deleted."
  sed -i.bak '/^VPC_CACHE_CLUSTER_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_CACHE_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting cache subnet group..."
  ${AWS_CACHE} delete-cache-subnet-group --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} | true
  echo "done."
  sed -i.bak '/^VPC_CACHE_SUBNET_GROUP_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_DB_CLUSTER_NAME:-""}" ]]; then
  echo "Deleting database cluster..."
  ${AWS_RDS} delete-db-cluster \
    --db-cluster-identifier ${VPC_DB_CLUSTER_NAME} \
    --skip-final-snapshot \
    >/dev/null

  sleep 2
  DB_STATUS="$(${AWS_RDS} describe-db-clusters | jq -r ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")"
  until [ -z $DB_STATUS ];
  do
    echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
    sleep 15
    DB_STATUS=$(${AWS_RDS} describe-db-clusters | jq -r ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
  done
  echo "Database deleted."
  sed -i.bak '/^VPC_DB_CLUSTER_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_DB_SUBNET_GROUP_NAME:-""}" ]]; then
  echo -n "Deleting database subnet group..."
  ${AWS_RDS} delete-db-subnet-group --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} | true
  echo "done."
  sed -i.bak '/^VPC_DB_SUBNET_GROUP_NAME/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sleep 10
fi

if [[ ! -z "${VPC_SECURITY_GROUP_CACHE_ID:-""}" ]]; then
  echo -n "Deleting cache security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_CACHE_ID} | true
  echo "done."
  sed -i.bak '/^VPC_SECURITY_GROUP_CACHE_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_SECURITY_GROUP_DB_ID:-""}" ]]; then
  echo -n "Deleting database security group..."
  ${AWS_EC2} delete-security-group --group-id ${VPC_SECURITY_GROUP_DB_ID} | true
  echo "done."
  sed -i.bak '/^VPC_SECURITY_GROUP_DB_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
  sleep 10
fi

if [[ ! -z "${VPC_SECURITY_GROUP_LAMBDA_ID:-""}" ]]; then
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

if [[ ! -z "${VPC_ROUTE_TABLE_ID:-""}" ]]; then
  echo -n "Deleting route table..."
  ${AWS_EC2} delete-route-table --route-table-id ${VPC_ROUTE_TABLE_ID} | true
  echo "done."
  sed -i.bak '/^VPC_ROUTE_TABLE_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_INTERNET_GATEWAY_ID:-""}" && ! -z "${VPC_ID:-""}" ]]; then
  echo -n "Detaching internet gateway from VPC..."
  ${AWS_EC2} detach-internet-gateway --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} --vpc-id ${VPC_ID} | true
  echo "done."
fi

if [[ ! -z "${VPC_INTERNET_GATEWAY_ID:-""}" ]]; then
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

if [[ ! -z "${VPC_SUBNET_PRIVATE_ID:-""}" ]]; then
  echo -n "Deleting first private subnet..."
  ${AWS_EC2} delete-subnet --subnet-id ${VPC_SUBNET_PRIVATE_ID} | true
  echo "done"
  sed -i.bak '/^VPC_SUBNET_PRIVATE_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

if [[ ! -z "${VPC_ID:-""}" ]]; then
  echo -n "Deleting VPC..."
  sleep 5
  ${AWS_EC2} delete-vpc --vpc-id ${VPC_ID} | true
  echo "done"
  sed -i.bak '/^VPC_ID/d' "${ENV_FILE}" && rm "${ENV_FILE}.bak"
fi

echo "Teardown complete"
