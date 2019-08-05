FROM node:10.16.0

RUN mkdir -p /root/src/front-end
WORKDIR /root/src/front-end

COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]