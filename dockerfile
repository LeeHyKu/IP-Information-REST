FROM node:14
WORKDIR /usr/ipinfo
COPY package*.json ./
RUN npm install && npm install typescript pm2 -g
COPY ./src ./src
COPY ./tsconfig.json ./
COPY ecosystem.config.js ./
RUN tsc
EXPOSE 4577
CMD ["pm2-runtime", "process.yml"]