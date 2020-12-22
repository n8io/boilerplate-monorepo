#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

JQ_BIN="$(which jq) -r"
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
AWS_STS="${AWS_BIN} sts"

TMP_DIR=${TMP_DIR:-"${DIR}/../.tmp/aws"}
LOG_DIR=${LOG_DIR:-"${TMP_DIR}"}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/.env"}
UP_ENV_FILE=${UP_ENV_FILE:-"${LOG_DIR}/.env.up"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/up.log"}

touch "${ENV_FILE}"
touch "${UP_ENV_FILE}"

source "${ENV_FILE}"
source "${UP_ENV_FILE}"

VPC_NAME=${VPC_NAME:-$(cat "${DIR}/../package.json" | ${JQ_BIN} '.name')}
VPC_REGION=${VPC_REGION:-us-east}
WEB_DOMAIN=${WEB_DOMAIN}
WEB_APP_URL=${WEB_APP_URL:-"https://app.${WEB_DOMAIN}"}
WEB_CERTIFICATE_DOMAIN="*.${WEB_DOMAIN}"

VPC_CACHE_AZ_MODE=${VPC_CACHE_AZ_MODE:-single-az}
VPC_CACHE_INSTANCE_SIZE=${VPC_CACHE_INSTANCE_SIZE:-cache.t2.micro}
VPC_CACHE_CLUSTER_NAME=${VPC_CACHE_CLUSTER_NAME:-${VPC_NAME}}
VPC_CACHE_NODE_COUNT=${VPC_CACHE_NODE_COUNT:-1}
VPC_CACHE_PARAMETER_GROUP=${VPC_CACHE_PARAMETER_GROUP:-default.redis5.0}
VPC_CACHE_SUBNET_GROUP_NAME=${VPC_CACHE_SUBNET_GROUP_NAME:-${VPC_NAME}}
VPC_CACHE_VERSION=${VPC_CACHE_VERSION:-5.0.6}
VPC_CIDR_BLOCK=${VPC_CIDR_BLOCK:-10.0.0.0/16}
VPC_DB_CLUSTER_NAME=${VPC_DB_CLUSTER_NAME:-${VPC_NAME}}
VPC_DB_PASSWORD=${VPC_DB_PASSWORD:-postgres}
VPC_DB_HIBERNATE_IN_MINUTES=${VPC_DB_HIBERNATE_IN_MINUTES:-5}
VPC_DB_HIBERNATE_IN_SECONDS=${VPC_DB_HIBERNATE_IN_SECONDS:-$((${VPC_DB_HIBERNATE_IN_MINUTES} * 60))}
VPC_DB_NAME=${VPC_DB_NAME:-$(echo "${VPC_NAME}" | sed 's/[^a-zA-Z0-9]//g')}
VPC_DB_USERNAME=${VPC_DB_USERNAME:-postgres}
VPC_DB_VERSION=${VPC_DB_VERSION:-10.7}
VPC_DB_SUBNET_GROUP_NAME=${VPC_DB_SUBNET_GROUP_NAME:-${VPC_NAME}}
VPC_INTERNET_GATEWAY_NAME=${VPC_INTERNET_GATEWAY_NAME:-${VPC_NAME}}
VPC_ROUTE_TABLE_PRIVATE_NAME=${VPC_ROUTE_TABLE_PRIVATE_NAME:-custom-${VPC_NAME}}
VPC_ROUTE_TABLE_PUBLIC_NAME=${VPC_ROUTE_TABLE_PUBLIC_NAME:-default-${VPC_NAME}}
VPC_SECURITY_GROUP_CACHE_NAME=${VPC_SECURITY_GROUP_CACHE_NAME:-cache-${VPC_NAME}}
VPC_SECURITY_GROUP_CUSTOM_NAME=${VPC_SECURITY_GROUP_CUSTOM_NAME:-custom-${VPC_NAME}}
VPC_SECURITY_GROUP_DB_NAME=${VPC_SECURITY_GROUP_DB_NAME:-database-${VPC_NAME}}
VPC_SECURITY_GROUP_DEFAULT_NAME=${VPC_SECURITY_GROUP_DEFAULT_NAME:-default-${VPC_NAME}}
VPC_SECURITY_GROUP_LAMBDA_NAME=${VPC_SECURITY_GROUP_LAMBDA_NAME:-lambda-${VPC_NAME}}
VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE=${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE:-${VPC_REGION}-1c}
VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE_2=${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE_2:-${VPC_REGION}-1e}
VPC_SUBNET_PRIVATE_CIDR_BLOCK=${VPC_SUBNET_PRIVATE_CIDR_BLOCK:-10.0.1.0/24}
VPC_SUBNET_PRIVATE_CIDR_BLOCK_2=${VPC_SUBNET_PRIVATE_CIDR_BLOCK_2:-10.0.2.0/24}
VPC_SUBNET_PRIVATE_NAME_1=${VPC_SUBNET_PRIVATE_NAME_1:-private-1-${VPC_NAME}}
VPC_SUBNET_PRIVATE_NAME_2=${VPC_SUBNET_PRIVATE_NAME_2:-private-2-${VPC_NAME}}
VPC_SUBNET_PUBLIC_AVAILABILITY_ZONE=${VPC_SUBNET_PUBLIC_AVAILABILITY_ZONE:-${VPC_REGION}-1a}
VPC_SUBNET_PUBLIC_CIDR_BLOCK=${VPC_SUBNET_PUBLIC_CIDR_BLOCK:-10.0.0.0/24}
VPC_SUBNET_PUBLIC_NAME=${VPC_SUBNET_PUBLIC_NAME:-public-${VPC_NAME}}
VPC_API_GATEWAY_DOMAIN="graphql.${WEB_DOMAIN}"
VPC_API_GATEWAY_NAME=${VPC_API_GATEWAY_NAME:-${VPC_NAME}}
VPC_API_GATEWAY_STAGE_NAME=${VPC_API_GATEWAY_STAGE_NAME:-production}
VPC_ECR_REPO_NAME=${VPC_ECR_REPO_NAME:-${VPC_NAME}/lambda-graphql}
VPC_API_GATEWAY_NAME=${VPC_API_GATEWAY_NAME:-${VPC_NAME}}
VPC_LAMBDA_NAME=${VPC_LAMBDA_NAME:-${VPC_NAME}-graphql}
VPC_LAMBDA_ROLE_NAME=${VPC_LAMBDA_ROLE_NAME:-${VPC_NAME}-lambda}
VPC_LAMBDA_ROLE_POLICY_ARN=${VPC_LAMBDA_ROLE_POLICY_ARN:-arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole}

if [[ -z "${STEP_VPC_CREATED:-""}" ]]; then
  echo -n "Creating new VPC..."
  VPC_ID=$(\
    ${AWS_EC2} create-vpc \
      --cidr-block ${VPC_CIDR_BLOCK} \
      --output json \
      | ${JQ_BIN} '.Vpc.VpcId')
  echo "${VPC_ID}"
  (echo "VPC_ID=${VPC_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to VPC..."
  ${AWS_EC2} create-tags --resources ${VPC_ID} --tags Key=Name,Value=${VPC_NAME} | true
  echo "${VPC_NAME}"
  (echo "VPC_NAME=${VPC_NAME}" >> "${ENV_FILE}")

  echo -n "Enabling DNS hostname for VPC..."
  ${AWS_EC2} modify-vpc-attribute --vpc-id ${VPC_ID} --enable-dns-hostnames "{\"Value\":true}" | true
  echo "done."

  (echo "STEP_VPC_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_SUBNET_PRIVATE_1_CREATED:-""}" ]]; then
  echo -n "Creating first private subnet in VPC..."
  VPC_SUBNET_PRIVATE_ID_1=$(\
    ${AWS_EC2} create-subnet \
      --vpc-id ${VPC_ID} \
      --cidr-block ${VPC_SUBNET_PRIVATE_CIDR_BLOCK} \
      --availability-zone ${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE} \
      --output json \
      | ${JQ_BIN} '.Subnet.SubnetId')
  echo "${VPC_SUBNET_PRIVATE_ID_1}"
  (echo "VPC_SUBNET_PRIVATE_ID_1=${VPC_SUBNET_PRIVATE_ID_1}" >> "${ENV_FILE}")

  echo -n "Adding tags to private subnet..."
  ${AWS_EC2} create-tags --resources ${VPC_SUBNET_PRIVATE_ID_1} --tags Key=Name,Value=${VPC_SUBNET_PRIVATE_NAME_1} | true
  echo "${VPC_SUBNET_PRIVATE_NAME_1}"

  (echo "STEP_SUBNET_PRIVATE_1_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_SUBNET_PRIVATE_2_CREATED:-""}" ]]; then
  echo -n "Creating second private subnet in VPC..."
  VPC_SUBNET_PRIVATE_ID_2=$(\
    ${AWS_EC2} create-subnet \
      --vpc-id ${VPC_ID} \
      --cidr-block ${VPC_SUBNET_PRIVATE_CIDR_BLOCK_2} \
      --availability-zone ${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE_2} \
      --output json \
      | ${JQ_BIN} '.Subnet.SubnetId')
  echo "${VPC_SUBNET_PRIVATE_ID_2}"
  (echo "VPC_SUBNET_PRIVATE_ID_2=${VPC_SUBNET_PRIVATE_ID_2}" >> "${ENV_FILE}")

  echo -n "Adding tags to private subnet..."
  ${AWS_EC2} create-tags --resources ${VPC_SUBNET_PRIVATE_ID_2} --tags Key=Name,Value=${VPC_SUBNET_PRIVATE_NAME_2} | true
  echo "${VPC_SUBNET_PRIVATE_NAME_2}"

  (echo "STEP_SUBNET_PRIVATE_2_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_SUBNET_PUBLIC_CREATED:-""}" ]]; then
  echo -n "Creating public subnet in VPC..."
  VPC_SUBNET_PUBLIC_ID=$(\
    ${AWS_EC2} create-subnet \
      --vpc-id ${VPC_ID} \
      --cidr-block ${VPC_SUBNET_PUBLIC_CIDR_BLOCK} \
      --availability-zone ${VPC_SUBNET_PUBLIC_AVAILABILITY_ZONE} \
      --output json \
      | ${JQ_BIN} '.Subnet.SubnetId')
  echo "${VPC_SUBNET_PUBLIC_ID}"
  (echo "VPC_SUBNET_PUBLIC_ID=${VPC_SUBNET_PUBLIC_ID}" >> "${ENV_FILE}")

  echo -n "Adding tags to public subnet..."
  ${AWS_EC2} create-tags --resources ${VPC_SUBNET_PUBLIC_ID} --tags Key=Name,Value=${VPC_SUBNET_PUBLIC_NAME} | true
  echo "${VPC_SUBNET_PUBLIC_NAME}"

  echo -n "Enabling auto-assigning of public ip on public subnet..."
  ${AWS_EC2} modify-subnet-attribute --subnet-id ${VPC_SUBNET_PUBLIC_ID} --map-public-ip-on-launch | true
  echo "done."

  (echo "STEP_SUBNET_PUBLIC_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_INTERNET_GATEWAY_CREATED:-""}" ]]; then
  echo -n "Creating an internet gateway..."
  VPC_INTERNET_GATEWAY_ID=$(\
    ${AWS_EC2} create-internet-gateway \
      --output json \
      | ${JQ_BIN} '.InternetGateway.InternetGatewayId')
  echo "${VPC_INTERNET_GATEWAY_ID}"
  (echo "VPC_INTERNET_GATEWAY_ID=${VPC_INTERNET_GATEWAY_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to internet gateway..."
  ${AWS_EC2} create-tags --resources ${VPC_INTERNET_GATEWAY_ID} --tags Key=Name,Value=${VPC_INTERNET_GATEWAY_NAME} | true
  echo "${VPC_INTERNET_GATEWAY_NAME}"

  echo -n "Attaching internet gateway to VPC..."
  ${AWS_EC2} attach-internet-gateway --vpc-id ${VPC_ID} --internet-gateway-id ${VPC_INTERNET_GATEWAY_ID} | true
  echo "done."

  (echo "STEP_INTERNET_GATEWAY_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_ELASTIC_IP_ALLOCATED:-""}" ]]; then
  echo -n "Allocating an elastic ip for vpc..."
  VPC_ELASTIC_IP_ALLOCATION_ID=$(\
    ${AWS_EC2} allocate-address \
      --domain vpc \
      | ${JQ_BIN} '.AllocationId'
    )
  echo "${VPC_ELASTIC_IP_ALLOCATION_ID}"

  (echo "STEP_ELASTIC_IP_ALLOCATED=true" >> "${UP_ENV_FILE}")
  (echo "VPC_ELASTIC_IP_ALLOCATION_ID=${VPC_ELASTIC_IP_ALLOCATION_ID}" >> "${ENV_FILE}")
fi

if [[ -z "${STEP_NAT_GATEWAY_CREATED:-""}" ]]; then
  echo -n "Creating an nat gateway..."
  VPC_NAT_GATEWAY_ID=$(\
    ${AWS_EC2} create-nat-gateway \
      --allocation-id "${VPC_ELASTIC_IP_ALLOCATION_ID}" \
      --subnet-id "${VPC_SUBNET_PUBLIC_ID}" \
      --output json \
      | ${JQ_BIN} '.NatGateway.NatGatewayId')
  echo "${VPC_NAT_GATEWAY_ID}"
  (echo "VPC_NAT_GATEWAY_ID=${VPC_NAT_GATEWAY_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to nat gateway..."
  ${AWS_EC2} create-tags --resources ${VPC_NAT_GATEWAY_ID} --tags Key=Name,Value=${VPC_NAME} | true
  echo "${VPC_NAME}"

  (echo "STEP_NAT_GATEWAY_CREATED=true" >> "${UP_ENV_FILE}")

  sleep 3
fi

if [[ -z "${STEP_ROUTE_TABLE_PRIVATE_CREATED:-""}" ]]; then
  echo -n "Creating private route table..."
  VPC_ROUTE_TABLE_PRIVATE_ID=$(\
    ${AWS_EC2} create-route-table \
      --vpc-id ${VPC_ID} \
      --output json \
      | ${JQ_BIN} '.RouteTable.RouteTableId')
  echo "${VPC_ROUTE_TABLE_PRIVATE_ID}"
  (echo "VPC_ROUTE_TABLE_PRIVATE_ID=${VPC_ROUTE_TABLE_PRIVATE_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to private route table..."
  ${AWS_EC2} create-tags --resources ${VPC_ROUTE_TABLE_PRIVATE_ID} --tags Key=Name,Value=${VPC_ROUTE_TABLE_PRIVATE_NAME} | true
  echo "${VPC_ROUTE_TABLE_PRIVATE_NAME}"

  (echo "STEP_ROUTE_TABLE_PRIVATE_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_ROUTE_TO_NAT_GATEWAY_CREATED:-""}" ]]; then
  echo -n "Adding private route table route to nat gateway..."
  ${AWS_EC2} create-route \
    --route-table-id ${VPC_ROUTE_TABLE_PRIVATE_ID} \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id ${VPC_NAT_GATEWAY_ID} \
    >/dev/null
  echo "done."

  (echo "STEP_ROUTE_TO_NAT_GATEWAY_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_SUBNET_PRIVATE_ASSOCIATED_TO_ROUTE_TABLE_1:-""}" ]]; then
  echo -n "Associating first private subnet with private route table..."
  VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1=$(\
    ${AWS_EC2} associate-route-table  \
      --subnet-id ${VPC_SUBNET_PRIVATE_ID_1} \
      --route-table-id ${VPC_ROUTE_TABLE_PRIVATE_ID} \
      --output json \
      | ${JQ_BIN} '.AssociationId')
  echo "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1}"
  (echo "VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1=${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_1}" >> "${ENV_FILE}")

  (echo "STEP_SUBNET_PRIVATE_ASSOCIATED_TO_ROUTE_TABLE_1=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_SUBNET_PRIVATE_ASSOCIATED_TO_ROUTE_TABLE_2:-""}" ]]; then
  echo -n "Associating second private subnet with private route table..."
  VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2=$(\
    ${AWS_EC2} associate-route-table  \
      --subnet-id ${VPC_SUBNET_PRIVATE_ID_2} \
      --route-table-id ${VPC_ROUTE_TABLE_PRIVATE_ID} \
      --output json \
      | ${JQ_BIN} '.AssociationId')
  echo "${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2}"
  (echo "VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2=${VPC_ROUTE_TABLE_PRIVATE_ASSOCIATION_ID_2}" >> "${ENV_FILE}")

  (echo "STEP_SUBNET_PRIVATE_ASSOCIATED_TO_ROUTE_TABLE_2=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_ROUTE_TABLE_PUBLIC_CREATED:-""}" ]]; then
  echo -n "Creating public route table..."
  VPC_ROUTE_TABLE_PUBLIC_ID=$(\
    ${AWS_EC2} create-route-table \
      --vpc-id ${VPC_ID} \
      --output json \
      | ${JQ_BIN} '.RouteTable.RouteTableId')
  echo "${VPC_ROUTE_TABLE_PUBLIC_ID}"
  (echo "VPC_ROUTE_TABLE_PUBLIC_ID=${VPC_ROUTE_TABLE_PUBLIC_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to public route table..."
  ${AWS_EC2} create-tags --resources ${VPC_ROUTE_TABLE_PUBLIC_ID} --tags Key=Name,Value=${VPC_ROUTE_TABLE_PRIVATE_NAME} | true
  echo "${VPC_ROUTE_TABLE_PRIVATE_NAME}"

  (echo "STEP_ROUTE_TABLE_PUBLIC_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_ROUTE_TO_INTERNET_GATEWAY_CREATED:-""}" ]]; then
  echo -n "Creating a public route table route to internet gateway..."
  ${AWS_EC2} create-route \
    --route-table-id ${VPC_ROUTE_TABLE_PUBLIC_ID} \
    --destination-cidr-block 0.0.0.0/0 \
    --gateway-id ${VPC_INTERNET_GATEWAY_ID} \
    >/dev/null
  echo "done."

  (echo "STEP_ROUTE_TO_INTERNET_GATEWAY_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_PUBLIC_SUBNET_ASSOCIATED_TO_ROUTE_TABLE:-""}" ]]; then
  echo -n "Associating public subnet with public route table..."
  VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID=$(\
    ${AWS_EC2} associate-route-table  \
      --subnet-id ${VPC_SUBNET_PUBLIC_ID} \
      --route-table-id ${VPC_ROUTE_TABLE_PUBLIC_ID} \
      --output json \
      | ${JQ_BIN} '.AssociationId')
  echo "${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID}"
  (echo "VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID=${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID}" >> "${ENV_FILE}")

  (echo "STEP_PUBLIC_SUBNET_ASSOCIATED_TO_ROUTE_TABLE=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_DEFAULT_SECURITY_GROUP_NAMED:-""}" ]]; then
  echo -n "Adding name tag to default security group..."
  VPC_SECURITY_GROUP_DEFAULT_ID=$(\
    ${AWS_EC2} describe-security-groups \
    --filters "Name=vpc-id,Values=${VPC_ID}" \
    --output json \
    | ${JQ_BIN} '.SecurityGroups[] | select(.GroupName == "default").GroupId')
  ${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_DEFAULT_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_DEFAULT_NAME} | true
  echo "${VPC_SECURITY_GROUP_DEFAULT_NAME}"

  (echo "STEP_DEFAULT_SECURITY_GROUP_NAMED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_CUSTOM_SECURITY_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating custom security group..."
  VPC_SECURITY_GROUP_CUSTOM_ID=$(\
    ${AWS_EC2} create-security-group \
      --vpc-id ${VPC_ID} \
      --group-name ${VPC_SECURITY_GROUP_CUSTOM_NAME} \
      --description "${VPC_NAME} custom security group" \
      --output=json \
      | ${JQ_BIN} '.GroupId')
  echo "${VPC_SECURITY_GROUP_CUSTOM_ID}"
  (echo "VPC_SECURITY_GROUP_CUSTOM_ID=${VPC_SECURITY_GROUP_CUSTOM_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to custom security group..."
  ${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_CUSTOM_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_CUSTOM_NAME} | true
  echo "${VPC_SECURITY_GROUP_CUSTOM_NAME}"

  (echo "STEP_CUSTOM_SECURITY_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_INGRESS_RULES_CREATED:-""}" ]]; then
  echo -n "Adding custom security group ingress SSH rule..."
  ${AWS_EC2} authorize-security-group-ingress \
    --group-id ${VPC_SECURITY_GROUP_CUSTOM_ID} \
    --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "Allow SSH"}]}]' \
    >/dev/null
  echo "done."

  echo -n "Adding custom security group ingress HTTP rule..."
  ${AWS_EC2} authorize-security-group-ingress \
    --group-id ${VPC_SECURITY_GROUP_CUSTOM_ID} \
    --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 80, "ToPort": 80, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "Allow HTTP"}]}]' \
    >/dev/null
  echo "done."

  (echo "STEP_INGRESS_RULES_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_SECURITY_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating lambda security group..."
  VPC_SECURITY_GROUP_LAMBDA_ID=$(\
    ${AWS_EC2} create-security-group \
      --vpc-id ${VPC_ID} \
      --group-name ${VPC_SECURITY_GROUP_LAMBDA_NAME} \
      --description "${VPC_NAME} lambda security group" \
      --output=json \
      | ${JQ_BIN} '.GroupId')
  echo "${VPC_SECURITY_GROUP_LAMBDA_ID}"
  (echo "VPC_SECURITY_GROUP_LAMBDA_ID=${VPC_SECURITY_GROUP_LAMBDA_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to lambda security group..."
  ${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_LAMBDA_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_LAMBDA_NAME} | true
  echo "${VPC_SECURITY_GROUP_LAMBDA_NAME}"

  (echo "STEP_LAMBDA_SECURITY_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_CACHE_SECURITY_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating cache security group..."
  VPC_SECURITY_GROUP_CACHE_ID=$(\
    ${AWS_EC2} create-security-group \
      --vpc-id ${VPC_ID} \
      --group-name ${VPC_SECURITY_GROUP_CACHE_NAME} \
      --description "${VPC_NAME} cache security group" \
      --output=json \
      | ${JQ_BIN} '.GroupId')
  echo "${VPC_SECURITY_GROUP_CACHE_ID}"
  (echo "VPC_SECURITY_GROUP_CACHE_ID=${VPC_SECURITY_GROUP_CACHE_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to cache security group..."
  ${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_CACHE_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_CACHE_NAME} | true
  echo "${VPC_SECURITY_GROUP_CACHE_NAME}"

  (echo "STEP_CACHE_SECURITY_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_CACHE_SECURITY_GROUP_LAMBDA_INGRESS_RULES_CREATED:-""}" ]]; then
  echo -n "Adding cache security group ingress lambdas rule..."
  ${AWS_EC2} authorize-security-group-ingress \
    --group-id ${VPC_SECURITY_GROUP_CACHE_ID} \
    --port 6379 \
    --protocol tcp \
    --source-group ${VPC_SECURITY_GROUP_LAMBDA_ID} \
    >/dev/null
  echo "done."

  (echo "STEP_CACHE_SECURITY_GROUP_LAMBDA_INGRESS_RULES_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_CACHE_SUBNET_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating a cache subnet group..."
  ${AWS_CACHE} create-cache-subnet-group \
    --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} \
    --cache-subnet-group-description "${VPC_NAME} cache subnet group" \
    --subnet-ids "${VPC_SUBNET_PRIVATE_ID_1}" "${VPC_SUBNET_PRIVATE_ID_2}" \
    >/dev/null
  echo "done."
  (echo "VPC_CACHE_SUBNET_GROUP_NAME=${VPC_CACHE_SUBNET_GROUP_NAME}" >> "${ENV_FILE}")

  (echo "STEP_CACHE_SUBNET_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_CACHE_CLUSTER_CREATED:-""}" ]]; then
  echo "Creating redis cache cluster..."
  ${AWS_CACHE} create-cache-cluster \
    --cache-cluster-id ${VPC_CACHE_CLUSTER_NAME} \
    --cache-node-type ${VPC_CACHE_INSTANCE_SIZE} \
    --cache-parameter-group-name ${VPC_CACHE_PARAMETER_GROUP} \
    --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} \
    --engine redis \
    --engine-version ${VPC_CACHE_VERSION} \
    --num-cache-nodes ${VPC_CACHE_NODE_COUNT} \
    --security-group-ids ${VPC_SECURITY_GROUP_CACHE_ID} \
    --tags Key=Name,Value=${VPC_NAME} \
    >/dev/null
  (echo "VPC_CACHE_CLUSTER_NAME=${VPC_CACHE_CLUSTER_NAME}" >> "${ENV_FILE}")

  (echo "STEP_CACHE_CLUSTER_CREATED=true" >> "${UP_ENV_FILE}")

  CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
  until [ $CACHE_STATUS == 'available' ];
  do
    echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
    sleep 15
    CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
  done
  VPC_CACHE_ENDPOINT=$(${AWS_CACHE} describe-cache-clusters --show-cache-node-info | ${JQ_BIN} ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheNodes[] | select(.CacheNodeId == \"0001\") | .Endpoint.Address")
  echo "Cache ready at ${VPC_CACHE_ENDPOINT}"
  (echo "VPC_CACHE_ENDPOINT=${VPC_CACHE_ENDPOINT}" >> "${ENV_FILE}")
fi

if [[ -z "${STEP_DB_SECURITY_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating database security group..."
  VPC_SECURITY_GROUP_DB_ID=$(\
    ${AWS_EC2} create-security-group \
      --vpc-id ${VPC_ID} \
      --group-name ${VPC_SECURITY_GROUP_DB_NAME} \
      --description "${VPC_NAME} database security group" \
      --output=json \
      | ${JQ_BIN} '.GroupId')
  echo "${VPC_SECURITY_GROUP_DB_ID}"
  (echo "VPC_SECURITY_GROUP_DB_ID=${VPC_SECURITY_GROUP_DB_ID}" >> "${ENV_FILE}")

  echo -n "Adding name tag to database security group..."
  ${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_DB_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_DB_NAME} | true
  echo "${VPC_SECURITY_GROUP_DB_NAME}"

  (echo "STEP_DB_SECURITY_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_DB_SECURITY_GROUP_LAMBDA_INGRESS_CREATED:-""}" ]]; then
  echo -n "Adding database security group ingress lambdas rule..."
  ${AWS_EC2} authorize-security-group-ingress \
    --group-id ${VPC_SECURITY_GROUP_DB_ID} \
    --port 5432 \
    --protocol tcp \
    --source-group ${VPC_SECURITY_GROUP_LAMBDA_ID} \
    >/dev/null
  echo "done."

  (echo "STEP_DB_SECURITY_GROUP_LAMBDA_INGRESS_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_DB_SUBNET_GROUP_CREATED:-""}" ]]; then
  echo -n "Creating a database subnet group..."
  ${AWS_RDS} create-db-subnet-group \
    --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} \
    --db-subnet-group-description "${VPC_NAME} database subnet group" \
    --subnet-ids "${VPC_SUBNET_PRIVATE_ID_1}" "${VPC_SUBNET_PRIVATE_ID_2}" \
    >/dev/null
  echo "done."
  (echo "VPC_DB_SUBNET_GROUP_NAME=${VPC_DB_SUBNET_GROUP_NAME}" >> "${ENV_FILE}")

  (echo "STEP_DB_SUBNET_GROUP_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_DB_CLUSTER_CREATED:-""}" ]]; then
  echo "Creating a serverless postgres instance (${VPC_DB_NAME})..."
  ${AWS_RDS} create-db-cluster \
    --database-name ${VPC_DB_NAME} \
    --db-cluster-identifier "${VPC_DB_CLUSTER_NAME}" \
    --db-subnet-group-name "${VPC_DB_SUBNET_GROUP_NAME}" \
    --enable-http-endpoint \
    --engine aurora-postgresql \
    --engine-version "${VPC_DB_VERSION}" \
    --engine-mode serverless \
    --scaling-configuration MinCapacity=2,MaxCapacity=8,SecondsUntilAutoPause=${VPC_DB_HIBERNATE_IN_SECONDS},AutoPause=true \
    --storage-encrypted \
    --master-username "${VPC_DB_USERNAME}" \
    --master-user-password "${VPC_DB_PASSWORD}" \
    --vpc-security-group-ids "${VPC_SECURITY_GROUP_DB_ID}" \
    >/dev/null
  (echo "VPC_DB_CLUSTER_NAME=${VPC_DB_CLUSTER_NAME}" >> "${ENV_FILE}")

  (echo "STEP_DB_CLUSTER_CREATED=true" >> "${UP_ENV_FILE}")

  DB_STATUS=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
  until [ $DB_STATUS == 'available' ];
  do
    echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
    sleep 15
    DB_STATUS=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
  done

  VPC_DB_ENDPOINT=$(${AWS_RDS} describe-db-clusters | ${JQ_BIN} ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Endpoint")
  echo "Database ready at ${VPC_DB_ENDPOINT}"
  (echo "VPC_DB_ENDPOINT=${VPC_DB_ENDPOINT}" >> "${ENV_FILE}")
fi

if [[ -z "${STEP_ECR_REPOSITORY_CREATED:-""}" ]]; then
  echo -n "Creating ecr repository ${VPC_ECR_REPO_NAME}..."
  ${AWS_ECR} create-repository \
    --repository-name ${VPC_ECR_REPO_NAME} \
    >/dev/null
  echo "done."
  (echo "VPC_ECR_REPO_NAME=${VPC_ECR_REPO_NAME}" >> "${ENV_FILE}")

  (echo "STEP_ECR_REPOSITORY_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_ROLE_CREATED:-""}" ]]; then
  echo -n "Creating lambda iam role ${VPC_LAMBDA_ROLE_NAME}..."
  VPC_LAMBDA_ROLE_ARN=$(\
    ${AWS_IAM} create-role \
      --role-name ${VPC_LAMBDA_ROLE_NAME} \
      --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Action":"sts:AssumeRole","Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"}}]}' \
      | ${JQ_BIN} '.Role.Arn'
    )
  echo "${VPC_LAMBDA_ROLE_ARN}"
  (echo "VPC_LAMBDA_ROLE_NAME=${VPC_LAMBDA_ROLE_NAME}" >> "${ENV_FILE}")
  (echo "VPC_LAMBDA_ROLE_ARN=${VPC_LAMBDA_ROLE_ARN}" >> "${ENV_FILE}")

  (echo "STEP_LAMBDA_ROLE_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_ROLE_POLICY_ATTACHED:-""}" ]]; then
  echo -n "Attaching lambda role policy to ${VPC_LAMBDA_ROLE_NAME} role..."
  ${AWS_IAM} attach-role-policy \
    --role-name ${VPC_LAMBDA_ROLE_NAME} \
    --policy-arn ${VPC_LAMBDA_ROLE_POLICY_ARN} \
    >/dev/null
  echo "done"
  (echo "VPC_LAMBDA_ROLE_POLICY_ARN=${VPC_LAMBDA_ROLE_POLICY_ARN}" >> "${ENV_FILE}")

  (echo "STEP_LAMBDA_ROLE_POLICY_ATTACHED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_DOCKER_IMAGE_PUSHED:-""}" ]]; then
  echo -n "Fetching aws account id..."
  VPC_ACCOUNT_ID=$(\
    ${AWS_STS} get-caller-identity \
      | ${JQ_BIN} '.Account'
    )
  echo "${VPC_ACCOUNT_ID}"

  VPC_ECR_LAMBDA_IMAGE_ARN=${VPC_ECR_LAMBDA_ARN:-${VPC_ACCOUNT_ID}.dkr.ecr.${VPC_REGION}-1.amazonaws.com/${VPC_ECR_REPO_NAME}}

  echo "Logging docker into ECR ${VPC_ECR_REPO_NAME}..."
  ${AWS_ECR} get-login-password --region ${VPC_REGION}-1 | docker login --username AWS --password-stdin ${VPC_ACCOUNT_ID}.dkr.ecr.${VPC_REGION}-1.amazonaws.com

  echo "Pushing docker ${VPC_ECR_REPO_NAME} image to ECR..."
  docker push --quiet ${VPC_ECR_LAMBDA_IMAGE_ARN}:latest

  (echo "STEP_LAMBDA_DOCKER_IMAGE_PUSHED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_FUNCTION_CREATED:-""}" ]]; then
  if [[ -z "${VPC_ACCOUNT_ID:-""}" ]]; then
    echo -n "Fetching aws account id..."
    VPC_ACCOUNT_ID=$(\
      ${AWS_STS} get-caller-identity \
        | ${JQ_BIN} '.Account'
      )
    echo "${VPC_ACCOUNT_ID}"
  fi

  VPC_ECR_LAMBDA_IMAGE_ARN=${VPC_ECR_LAMBDA_ARN:-${VPC_ACCOUNT_ID}.dkr.ecr.${VPC_REGION}-1.amazonaws.com/${VPC_ECR_REPO_NAME}}

  echo -n "Creating lambda function ${VPC_LAMBDA_NAME}..."
  VPC_LAMBDA_ARN=$(\
    ${AWS_LAMBDA} create-function \
      --function-name ${VPC_LAMBDA_NAME} \
      --code "ImageUri=${VPC_ECR_LAMBDA_IMAGE_ARN}:latest" \
      --environment "Variables={DATABASE_URL=postgres://${VPC_DB_USERNAME}:${VPC_DB_PASSWORD}@${VPC_DB_ENDPOINT}:5432/${VPC_DB_NAME},REDIS_URL=redis://${VPC_CACHE_ENDPOINT}:6379,HTTPS=false,DEBUG=*${VPC_NAME}*,SHOW_CONFIG=false,EMAIL_FROM_ADDRESS=\"noreply@${WEB_DOMAIN}\",EMAIL_SMTP_URL=\"${EMAIL_SMTP_URL:-""}\",npm_package_name=${VPC_NAME},UI_HOST_URI=\"${WEB_APP_URL}\"}" \
      --memory-size 256 \
      --package-type Image \
      --role ${VPC_LAMBDA_ROLE_ARN} \
      --timeout 5 \
      --vpc-config "SubnetIds=${VPC_SUBNET_PRIVATE_ID_1},${VPC_SUBNET_PRIVATE_ID_2},SecurityGroupIds=${VPC_SECURITY_GROUP_LAMBDA_ID}" \
      | ${JQ_BIN} '.FunctionArn'
    )
  echo "${VPC_LAMBDA_ARN}"
  (echo "VPC_LAMBDA_NAME=${VPC_LAMBDA_NAME}" >> "${ENV_FILE}")
  (echo "VPC_LAMBDA_ARN=${VPC_LAMBDA_ARN}" >> "${ENV_FILE}")

  (echo "STEP_LAMBDA_FUNCTION_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_CREATED:-""}" ]]; then
  echo -n "Creating api gateway ${VPC_API_GATEWAY_NAME}..."
  VPC_API_GATEWAY_ID=$(\
    ${AWS_API_GATEWAY} create-rest-api \
      --name ${VPC_API_GATEWAY_NAME} \
      --description "Rest api gateway for ${VPC_NAME}" \
      | ${JQ_BIN} '.id'
    )
  echo "${VPC_API_GATEWAY_ID}"
  (echo "VPC_API_GATEWAY_ID=${VPC_API_GATEWAY_ID}" >> "${ENV_FILE}")

  (echo "STEP_API_GATEWAY_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_PROXY_RESOURCE_CREATED:-""}" ]]; then
  echo -n "Fetching api gateway root resource id..."
  VPC_API_GATEWAY_ROOT_RESOURCE_ID=$(\
    ${AWS_API_GATEWAY} get-resources \
      --rest-api-id ${VPC_API_GATEWAY_ID} \
      | ${JQ_BIN} '.items[] | select(.path == "/") | .id'
  )
  echo "done."

  echo -n "Creating api gateway proxy resource..."
  VPC_API_GATEWAY_PROXY_RESOURCE_ID=$(\
    ${AWS_API_GATEWAY} create-resource \
      --rest-api-id ${VPC_API_GATEWAY_ID} \
      --parent-id ${VPC_API_GATEWAY_ROOT_RESOURCE_ID} \
      --path-part "{proxy+}" \
      | ${JQ_BIN} '.id'
    )
  echo "${VPC_API_GATEWAY_PROXY_RESOURCE_ID}"
  (echo "VPC_API_GATEWAY_PROXY_RESOURCE_ID=${VPC_API_GATEWAY_PROXY_RESOURCE_ID}" >> "${ENV_FILE}")

  (echo "STEP_API_GATEWAY_PROXY_RESOURCE_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_PROXY_ANY_METHOD_CREATED:-""}" ]]; then
  echo -n "Attaching api gateway ANY method to proxy resource..."
  ${AWS_API_GATEWAY} put-method \
    --rest-api-id "${VPC_API_GATEWAY_ID}" \
    --request-parameters "method.request.path.proxy=true" \
    --resource-id "${VPC_API_GATEWAY_PROXY_RESOURCE_ID}" \
    --http-method "ANY" \
    --authorization-type "NONE" \
    >/dev/null
  echo "done."

  (echo "STEP_API_GATEWAY_PROXY_ANY_METHOD_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_ROOT_RESOURCE_ANY_METHOD_INTEGRATION_CREATED:-""}" ]]; then
  echo -n "Creating api gateway proxy resource ANY method integration..."
  ${AWS_API_GATEWAY} put-integration \
    --cache-key-parameters "method.request.path.proxy" \
    --content-handling "CONVERT_TO_TEXT" \
    --rest-api-id "${VPC_API_GATEWAY_ID}" \
    --resource-id "${VPC_API_GATEWAY_PROXY_RESOURCE_ID}" \
    --http-method "ANY" \
    --integration-http-method "POST" \
    --passthrough-behavior "WHEN_NO_MATCH" \
    --type "AWS_PROXY" \
    --uri "arn:aws:apigateway:${VPC_REGION}-1:lambda:path/2015-03-31/functions/${VPC_LAMBDA_ARN}/invocations" \
    >/dev/null
  echo "done."

  echo -n "Attaching api gateway root resource ANY method integration response..."
  ${AWS_API_GATEWAY} put-integration-response \
    --rest-api-id "${VPC_API_GATEWAY_ID}" \
    --resource-id "${VPC_API_GATEWAY_PROXY_RESOURCE_ID}" \
    --http-method "ANY" \
    --response-templates "application/json=" \
    --status-code "200" \
    >/dev/null
  echo "done."

  (echo "STEP_API_GATEWAY_ROOT_RESOURCE_ANY_METHOD_INTEGRATION_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_LAMBDA_PERMISSION_GRANTED:-""}" ]]; then
  echo -n "Granting api gateway execution permission to lambda function..."
  RANDOM_STATEMENT_ID=$(date +%s | sha256sum | base64 | head -c 32 ; echo)
  ${AWS_LAMBDA} add-permission \
    --function-name "${VPC_LAMBDA_NAME}" \
    --statement-id "${RANDOM_STATEMENT_ID}" \
    --action "lambda:InvokeFunction" \
    --principal apigateway.amazonaws.com \
    --source-arn arn:aws:execute-api:us-east-1:073153661971:${VPC_API_GATEWAY_ID}/*/*/* \
    >/dev/null
  echo "done."

  (echo "STEP_API_GATEWAY_LAMBDA_PERMISSION_GRANTED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_DEPLOYED:-""}" ]]; then
  echo -n "Deploying api gateway..."
  VPC_API_GATEWAY_DEPLOYMENT_ID=$(\
    ${AWS_API_GATEWAY} create-deployment \
      --rest-api-id ${VPC_API_GATEWAY_ID} \
      --stage-name ${VPC_API_GATEWAY_STAGE_NAME} \
      | ${JQ_BIN} '.id'
    )
  echo "${VPC_API_GATEWAY_DEPLOYMENT_ID}"
  (echo "VPC_API_GATEWAY_STAGE_NAME=${VPC_API_GATEWAY_STAGE_NAME}" >> "${ENV_FILE}")
  (echo "VPC_API_GATEWAY_DEPLOYMENT_ID=${VPC_API_GATEWAY_DEPLOYMENT_ID}" >> "${ENV_FILE}")

  (echo "STEP_API_GATEWAY_DEPLOYED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_LAMBDA_READY:-""}" ]]; then
  echo "Checking lambda function availability..."

  LAMBDA_STATUS=$(${AWS_LAMBDA} get-function --function-name "${VPC_LAMBDA_NAME}" | ${JQ_BIN} ".Configuration.State")
  until [ $LAMBDA_STATUS == 'Active' ];
  do
    echo "  $(date +"%r") Waiting for lambda function to be available (currently ${LAMBDA_STATUS})..."
    sleep 15
    LAMBDA_STATUS=$(${AWS_LAMBDA} get-function --function-name "${VPC_LAMBDA_NAME}" | ${JQ_BIN} ".Configuration.State")
  done

  echo "Lambda available at https://${VPC_API_GATEWAY_ID}.execute-api.us-east-1.amazonaws.com/production/heartbeat"

  (echo "STEP_LAMBDA_READY=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_WEB_CERT_ISSUED:-""}" ]]; then
  echo -n "Issuing wildcard cert for ${WEB_CERTIFICATE_DOMAIN}..."
  WEB_CERTIFICATE_ARN=$(\
    ${AWS_ACM} request-certificate \
      --domain-name ${WEB_CERTIFICATE_DOMAIN} \
      --validation-method "DNS" \
      | ${JQ_BIN} '.CertificateArn'
    )
  echo "${WEB_CERTIFICATE_ARN}"
  (echo "WEB_CERTIFICATE_ARN=${WEB_CERTIFICATE_ARN}" >> "${ENV_FILE}")

  (echo "STEP_WEB_CERT_ISSUED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_DOMAIN_CREATED:-""}" ]]; then
  echo -n "Creating api gateway custom domain ${VPC_API_GATEWAY_DOMAIN}..."
  VPC_API_GATEWAY_DOMAIN_URL=$(\
    ${AWS_API_GATEWAY} create-domain-name \
      --domain-name ${VPC_API_GATEWAY_DOMAIN} \
      --regional-certificate-arn ${WEB_CERTIFICATE_ARN} \
      --endpoint-configuration "types=REGIONAL" \
      --security-policy "TLS_1_2" \
      | ${JQ_BIN} '.regionalDomainName'
    )
  echo "${VPC_API_GATEWAY_DEPLOYMENT_ID}"
  (echo "VPC_API_GATEWAY_DOMAIN=${VPC_API_GATEWAY_DOMAIN}" >> "${ENV_FILE}")
  (echo "VPC_API_GATEWAY_DOMAIN_URL=${VPC_API_GATEWAY_DOMAIN_URL}" >> "${ENV_FILE}")

  (echo "STEP_API_GATEWAY_DOMAIN_CREATED=true" >> "${UP_ENV_FILE}")
fi

if [[ -z "${STEP_API_GATEWAY_DOMAIN_PATH_MAPPED:-""}" ]]; then
  echo -n "Creating api gateway custom domain path mapping..."
  VPC_API_GATEWAY_DOMAIN_BASE_PATH=$(\
    ${AWS_API_GATEWAY} create-base-path-mapping \
      --domain-name ${VPC_API_GATEWAY_DOMAIN} \
      --rest-api-id ${VPC_API_GATEWAY_ID} \
      --stage "${VPC_API_GATEWAY_STAGE_NAME}" \
      | ${JQ_BIN} '.basePath'
    )
  echo "done."
  (echo "VPC_API_GATEWAY_DOMAIN_BASE_PATH=\"${VPC_API_GATEWAY_DOMAIN_BASE_PATH}\"" >> "${ENV_FILE}")

  (echo "STEP_API_GATEWAY_DOMAIN_PATH_MAPPED=true" >> "${UP_ENV_FILE}")
fi

cp -R "${ENV_FILE}" "${ENV_FILE}.bkp"

echo "VPC ready"
