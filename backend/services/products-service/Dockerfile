FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install 
COPY . .
EXPOSE 5404
RUN npm run build
CMD [ "npm", "run", "start:products-service:dev"]