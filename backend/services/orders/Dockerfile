FROM node:alpine AS dev
WORKDIR '/app'
ARG DEV_MODE=development
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY nodemon.json .
RUN npm install 
COPY . .
EXPOSE 5403
RUN npm run build
CMD [ "npm", "run", "start:orders-service:dev"]