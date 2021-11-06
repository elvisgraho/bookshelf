FROM node:15 as node
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

#  add app
COPY ./ /usr/src/app

# start app
RUN npm run build

# Stage 1, for copying the compiled app from the previous step and making it ready for production with Nginx
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80