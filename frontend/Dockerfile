FROM node:17-alpine as builder
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /frontend/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]