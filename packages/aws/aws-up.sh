#!/bin/bash
set -euf -o pipefail

AWS_PROFILE=${AWS_PROFILE:-aws-n8io-dev}
AWS_BIN="$(which aws) --profile=${AWS_PROFILE}"
AWS_CACHE="${AWS_BIN} elasticache"
AWS_EC2="${AWS_BIN} ec2"
AWS_RDS="${AWS_BIN} rds"

JQ_BIN="$(which jq) -r"
LOG_DIR=${LOG_DIR:-./.tmp/}
ENV_FILE=${ENV_FILE:-"${LOG_DIR}/aws.env"}
LOG_FILE=${LOG_FILE:-"${LOG_DIR}/aws.log"}

VPC_NAME=${VPC_NAME:-boilerplate-monorepo}

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
VPC_DB_USERNAME=${VPC_DB_USERNAME:-postgres}
VPC_DB_VERSION=${VPC_DB_VERSION:-10.7}
VPC_DB_SUBNET_GROUP_NAME=${VPC_DB_SUBNET_GROUP_NAME:-${VPC_NAME}}
VPC_INTERNET_GATEWAY_NAME=${VPC_INTERNET_GATEWAY_NAME:-${VPC_NAME}}
VPC_ROUTE_TABLE_CUSTOM_NAME=${VPC_ROUTE_TABLE_CUSTOM_NAME:-custom-${VPC_NAME}}
VPC_ROUTE_TABLE_DEFAULT_NAME=${VPC_ROUTE_TABLE_DEFAULT_NAME:-default-${VPC_NAME}}
VPC_SECURITY_GROUP_CACHE_NAME=${VPC_SECURITY_GROUP_CACHE_NAME:-cache-${VPC_NAME}}
VPC_SECURITY_GROUP_CUSTOM_NAME=${VPC_SECURITY_GROUP_CUSTOM_NAME:-custom-${VPC_NAME}}
VPC_SECURITY_GROUP_DB_NAME=${VPC_SECURITY_GROUP_DB_NAME:-database-${VPC_NAME}}
VPC_SECURITY_GROUP_DEFAULT_NAME=${VPC_SECURITY_GROUP_DEFAULT_NAME:-default-${VPC_NAME}}
VPC_SECURITY_GROUP_LAMBDA_NAME=${VPC_SECURITY_GROUP_LAMBDA_NAME:-lambda-${VPC_NAME}}
VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE=${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE:-us-east-1c}
VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE_2=${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE_2:-us-east-1e}
VPC_SUBNET_PRIVATE_CIDR_BLOCK=${VPC_SUBNET_PRIVATE_CIDR_BLOCK:-10.0.1.0/24}
VPC_SUBNET_PRIVATE_CIDR_BLOCK_2=${VPC_SUBNET_PRIVATE_CIDR_BLOCK_2:-10.0.2.0/24}
VPC_SUBNET_PRIVATE_NAME=${VPC_SUBNET_PRIVATE_NAME:-private-1-${VPC_NAME}}
VPC_SUBNET_PRIVATE_NAME_2=${VPC_SUBNET_PRIVATE_NAME_2:-private-2-${VPC_NAME}}
VPC_SUBNET_PUBLIC_AVAILABILITY_ZONE=${VPC_SUBNET_PUBLIC_AVAILABILITY_ZONE:-us-east-1a}
VPC_SUBNET_PUBLIC_CIDR_BLOCK=${VPC_SUBNET_PUBLIC_CIDR_BLOCK:-10.0.0.0/24}
VPC_SUBNET_PUBLIC_NAME=${VPC_SUBNET_PUBLIC_NAME:-public-${VPC_NAME}}

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

echo -n "Creating first private subnet in VPC..."
VPC_SUBNET_PRIVATE_ID=$(\
  ${AWS_EC2} create-subnet \
    --vpc-id ${VPC_ID} \
    --cidr-block ${VPC_SUBNET_PRIVATE_CIDR_BLOCK} \
    --availability-zone ${VPC_SUBNET_PRIVATE_AVAILABILITY_ZONE} \
    --output json \
    | ${JQ_BIN} '.Subnet.SubnetId')
echo "${VPC_SUBNET_PRIVATE_ID}"
(echo "VPC_SUBNET_PRIVATE_ID=${VPC_SUBNET_PRIVATE_ID}" >> "${ENV_FILE}")

echo -n "Adding tags to private subnet..."
${AWS_EC2} create-tags --resources ${VPC_SUBNET_PRIVATE_ID} --tags Key=Name,Value=${VPC_SUBNET_PRIVATE_NAME} | true
echo "${VPC_SUBNET_PRIVATE_NAME}"

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

echo -n "Creating private subnet in VPC..."
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

echo -n "Adding name tag to default route table..."
VPC_DEFAULT_ROUTE_TABLE_ID=$(\
  ${AWS_EC2} describe-route-tables \
  --filters "Name=vpc-id,Values=${VPC_ID}" \
  --output json \
  | ${JQ_BIN} '.RouteTables[].Associations[] | select(.Main == true).RouteTableId')
${AWS_EC2} create-tags --resources ${VPC_DEFAULT_ROUTE_TABLE_ID} --tags Key=Name,Value=${VPC_ROUTE_TABLE_DEFAULT_NAME} | true
echo "${VPC_ROUTE_TABLE_DEFAULT_NAME}"
(echo "VPC_DEFAULT_ROUTE_TABLE_ID=${VPC_DEFAULT_ROUTE_TABLE_ID}" >> "${ENV_FILE}")

echo -n "Creating a route table..."
VPC_ROUTE_TABLE_ID=$(\
  ${AWS_EC2} create-route-table \
    --vpc-id ${VPC_ID} \
    --output json \
    | ${JQ_BIN} '.RouteTable.RouteTableId')
echo "${VPC_ROUTE_TABLE_ID}"
(echo "VPC_ROUTE_TABLE_ID=${VPC_ROUTE_TABLE_ID}" >> "${ENV_FILE}")

echo -n "Adding name tag to custom route table..."
${AWS_EC2} create-tags --resources ${VPC_ROUTE_TABLE_ID} --tags Key=Name,Value=${VPC_ROUTE_TABLE_CUSTOM_NAME} | true
echo "${VPC_ROUTE_TABLE_CUSTOM_NAME}"

echo -n "Creating a route to internet gateway..."
${AWS_EC2} create-route \
  --route-table-id ${VPC_ROUTE_TABLE_ID} \
  --destination-cidr-block 0.0.0.0/0 \
  --gateway-id ${VPC_INTERNET_GATEWAY_ID} \
  >/dev/null
echo "done."

echo -n "Associating public subnet with route table..."
VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID=$(\
  ${AWS_EC2} associate-route-table  \
    --subnet-id ${VPC_SUBNET_PUBLIC_ID} \
    --route-table-id ${VPC_ROUTE_TABLE_ID} \
    --output json \
    | ${JQ_BIN} '.AssociationId')
echo "${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID}"
(echo "VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID=${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID}" >> "${ENV_FILE}")

echo -n "Adding name tag to default security group..."
VPC_SECURITY_GROUP_DEFAULT_ID=$(\
  ${AWS_EC2} describe-security-groups \
  --filters "Name=vpc-id,Values=${VPC_ID}" \
  --output json \
  | ${JQ_BIN} '.SecurityGroups[] | select(.GroupName == "default").GroupId')
${AWS_EC2} create-tags --resources ${VPC_SECURITY_GROUP_DEFAULT_ID} --tags Key=Name,Value=${VPC_SECURITY_GROUP_DEFAULT_NAME} | true
echo "${VPC_SECURITY_GROUP_DEFAULT_NAME}"
(echo "VPC_SECURITY_GROUP_DEFAULT_ID=${VPC_SECURITY_GROUP_DEFAULT_ID}" >> "${ENV_FILE}")

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

echo -n "Adding cache security group ingress lambdas rule..."
${AWS_EC2} authorize-security-group-ingress \
  --group-id ${VPC_SECURITY_GROUP_CACHE_ID} \
  --port 6379 \
  --protocol tcp \
  --source-group ${VPC_SECURITY_GROUP_LAMBDA_ID} \
  >/dev/null
echo "done."

echo -n "Creating a cache subnet group..."
${AWS_CACHE} create-cache-subnet-group \
  --cache-subnet-group-name ${VPC_CACHE_SUBNET_GROUP_NAME} \
  --cache-subnet-group-description "${VPC_NAME} cache subnet group" \
  --subnet-ids "${VPC_SUBNET_PRIVATE_ID}" "${VPC_SUBNET_PRIVATE_ID_2}" \
  >/dev/null
echo "done."
(echo "VPC_CACHE_SUBNET_GROUP_NAME=${VPC_CACHE_SUBNET_GROUP_NAME}" >> "${ENV_FILE}")

echo -n "Creating redis cache cluster..."
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
echo "done."
(echo "VPC_CACHE_CLUSTER_NAME=${VPC_CACHE_CLUSTER_NAME}" >> "${ENV_FILE}")

CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | jq -r ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
until [ $CACHE_STATUS == 'available' ];
do
  echo "  $(date +"%r") Waiting for cache to finish ${CACHE_STATUS}..."
  sleep 15
  CACHE_STATUS=$(${AWS_CACHE} describe-cache-clusters | jq -r ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheClusterStatus")
done
VPC_CACHE_ENDPOINT=$(${AWS_CACHE} describe-cache-clusters --show-cache-node-info | jq -r ".CacheClusters[] | select(.CacheClusterId == \"${VPC_CACHE_CLUSTER_NAME}\") | .CacheNodes[] | select(.CacheNodeId == \"0001\") | .Endpoint.Address")
echo "Cache ready at ${VPC_CACHE_ENDPOINT}"
(echo "VPC_CACHE_ENDPOINT=${VPC_CACHE_ENDPOINT}" >> "${ENV_FILE}")

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

echo -n "Adding database security group ingress lambdas rule..."
${AWS_EC2} authorize-security-group-ingress \
  --group-id ${VPC_SECURITY_GROUP_DB_ID} \
  --port 5432 \
  --protocol tcp \
  --source-group ${VPC_SECURITY_GROUP_LAMBDA_ID} \
  >/dev/null
echo "done."

echo -n "Creating a database subnet group..."
${AWS_RDS} create-db-subnet-group \
  --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} \
  --db-subnet-group-description "${VPC_NAME} database subnet group" \
  --subnet-ids "${VPC_SUBNET_PRIVATE_ID}" "${VPC_SUBNET_PRIVATE_ID_2}" \
  >/dev/null
echo "done."
(echo "VPC_DB_SUBNET_GROUP_NAME=${VPC_DB_SUBNET_GROUP_NAME}" >> "${ENV_FILE}")

echo "Creating a serverless postgres instance..."
${AWS_RDS} create-db-cluster \
  --db-cluster-identifier ${VPC_DB_CLUSTER_NAME} \
  --db-subnet-group-name ${VPC_DB_SUBNET_GROUP_NAME} \
  --enable-http-endpoint \
  --engine aurora-postgresql \
  --engine-version ${VPC_DB_VERSION} \
  --engine-mode serverless \
  --scaling-configuration MinCapacity=2,MaxCapacity=8,SecondsUntilAutoPause=${VPC_DB_HIBERNATE_IN_SECONDS},AutoPause=true \
  --master-username ${VPC_DB_USERNAME} \
  --master-user-password ${VPC_DB_PASSWORD} \
  --vpc-security-group-ids ${VPC_SECURITY_GROUP_DB_ID} \
  >/dev/null
(echo "VPC_DB_CLUSTER_NAME=${VPC_DB_CLUSTER_NAME}" >> "${ENV_FILE}")

DB_STATUS=$(${AWS_RDS} describe-db-clusters | jq -r ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
until [ $DB_STATUS == 'available' ];
do
  echo "  $(date +"%r") Waiting for database to finish ${DB_STATUS}..."
  sleep 15
  DB_STATUS=$(${AWS_RDS} describe-db-clusters | jq -r ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Status")
done

VPC_DB_ENDPOINT=$(${AWS_RDS} describe-db-clusters | jq -r ".DBClusters[] | select(.DBClusterIdentifier == \"${VPC_DB_CLUSTER_NAME}\") | .Endpoint")
echo "Database ready at ${VPC_DB_ENDPOINT}"
(echo "VPC_DB_ENDPOINT=${VPC_DB_ENDPOINT}" >> "${ENV_FILE}")

cat >"${ENV_FILE}.bkp" <<EOL
VPC_CACHE_CLUSTER_NAME=${VPC_CACHE_CLUSTER_NAME}
VPC_CACHE_ENDPOINT=${VPC_CACHE_ENDPOINT}
VPC_CACHE_SUBNET_GROUP_NAME=${VPC_CACHE_SUBNET_GROUP_NAME}
VPC_DB_CLUSTER_NAME=${VPC_DB_CLUSTER_NAME}
VPC_DB_ENDPOINT=${VPC_DB_ENDPOINT}
VPC_DB_SUBNET_GROUP_NAME=${VPC_DB_SUBNET_GROUP_NAME}
VPC_DEFAULT_ROUTE_TABLE_ID=${VPC_DEFAULT_ROUTE_TABLE_ID}
VPC_ID=${VPC_ID}
VPC_INTERNET_GATEWAY_ID=${VPC_INTERNET_GATEWAY_ID}
VPC_ROUTE_TABLE_ID=${VPC_ROUTE_TABLE_ID}
VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID=${VPC_ROUTE_TABLE_PUBLIC_ASSOCIATION_ID}
VPC_SECURITY_GROUP_CACHE_ID=${VPC_SECURITY_GROUP_CACHE_ID}
VPC_SECURITY_GROUP_CUSTOM_ID=${VPC_SECURITY_GROUP_CUSTOM_ID}
VPC_SECURITY_GROUP_DB_ID=${VPC_SECURITY_GROUP_DB_ID}
VPC_SECURITY_GROUP_DEFAULT_ID=${VPC_SECURITY_GROUP_DEFAULT_ID}
VPC_SECURITY_GROUP_LAMBDA_ID=${VPC_SECURITY_GROUP_LAMBDA_ID}
VPC_SUBNET_PRIVATE_ID=${VPC_SUBNET_PRIVATE_ID}
VPC_SUBNET_PRIVATE_ID_2=${VPC_SUBNET_PRIVATE_ID_2}
VPC_SUBNET_PUBLIC_ID=${VPC_SUBNET_PUBLIC_ID}
EOL

echo "VPC ready"
