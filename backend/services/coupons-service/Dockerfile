FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY nodemon.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 5402
RUN npm run build
CMD [ "npm", "run", "start:coupons-service:dev"]