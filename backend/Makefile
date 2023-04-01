clean:
	- docker volume rm
	- docker stop
	- docker system prune
	- docker image prune -a

process-data-script:
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

build-services:
	- cd services/authentication* && docker build -t sabin2000/techrus-authentication-service . && npm run build
	- cd services/products* && docker build -t sabin2000/techrus-products-service . && npm run build
	- cd services/reviews* && docker build -t sabin2000/techrus-reviews-service . && npm run build
	- cd services/shipping-service* && docker build -t sabin2000/techrus-shipping-service . && npm run build
	- cd services/api-gateway* && docker build -t sabin2000/techrus-api-gateway-service . && npm run build:api-gateway
	- cd services/orders* && docker build -t sabin2000/techrus-orders-service . && npm run build:orders-service
	- cd services/payments* && docker build -t sabin2000/techrus-payments-service . && npm run build
	- cd services/coupons* && docker build -t sabin2000/techrus-coupons-service . && npm run build

run-app:
	- docker-compose up --build

create-networks:
	- docker network create products-service
	- docker network create my-service-network
	- docker network create auth-service
	- docker network create orders-service
	- docker network create shipping-service
	- docker network create payments-service
	- docker network create coupons-service
	- docker network create reviews-service

run-tests:
	- cd services/authentication-service && npm run auth:test
	- cd services/shipping-service && npm run shipping:test
	
stop-services:
	- docker-compose -f docker-compose.yaml -f docker-compose.yaml down --remove-orphans

build-frontend:
	- cd ../frontend && npm run build && docker build -t sabin2000/techrus-frontend-service . && docker push sabin2000/techrus-frontend-service