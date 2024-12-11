FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 80
CMD ["node", "FRONT/js/server.js"]
