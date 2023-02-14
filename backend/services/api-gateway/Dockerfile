FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 5500
CMD [ "npm", "run", "start:api-gateway-service:dev"]