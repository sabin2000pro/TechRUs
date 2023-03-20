clean:
	- docker volume rm
	- docker stop
	- docker system prune
	- docker image prune -a

process-data-script:
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

build-services:
	- cd services/authentication* && npm run build
	- cd services/products* && npm run build
	- cd services/reviews* && npm run build
	- cd services/shipping-service* && npm run build
	- cd services/api-gateway* && npm run build:api-gateway
	- cd services/orders* && npm run build:orders-service
	- cd services/payments* && npm run build

	- docker login
	- docker-compose up --build

stop-services:
	- docker-compose -f docker-compose.yaml -f docker-compose.yaml down --remove-orphans

run-backend-prod:
	- pm2 start server

build-frontend:
	- cd ../frontend && npm run build && docker build -t sabin2000/techrus-frontend-service . && docker push sabin2000/techrus-frontend-service