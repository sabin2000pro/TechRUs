FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
COPY nodemon.json .
RUN npm install 
COPY . .
EXPOSE 5407
RUN npm run build
CMD [ "npm", "run", "start:reviews-service:dev"]