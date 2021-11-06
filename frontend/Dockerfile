FROM node:15
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 4200
CMD ["npm", "run", "start"]