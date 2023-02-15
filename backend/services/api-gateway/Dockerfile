FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 5410
RUN npm run build:api-gateway
CMD [ "npm", "run", "start:api-gateway-service:dev"]