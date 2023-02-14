FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 5400
RUN npm run build:auth-service
CMD [ "npm", "run", "start:auth-service:dev"]