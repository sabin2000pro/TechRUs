FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 6000
CMD [ "npm", "run", "start:api-gateway-service:dev"]