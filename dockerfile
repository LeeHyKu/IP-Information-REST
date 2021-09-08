FROM node:14
WORKDIR /usr/ipinfo
COPY package*.json ./
RUN npm install && npm install typescript pm2 -g
COPY ./src ./src
COPY ./tsconfig.json ./
RUN tsc
EXPOSE 17100
CMD ["pm2-runtime", "./dist/app.js"]