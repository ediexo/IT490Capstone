FROM node:17-alpine as builder
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /frontend/build .

#Expose port 80
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]