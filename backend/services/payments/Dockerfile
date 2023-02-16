FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY nodemon.json .
RUN npm install 
COPY . .
EXPOSE 5406
RUN npm run build
CMD [ "npm", "run", "start:payments-service:dev"]