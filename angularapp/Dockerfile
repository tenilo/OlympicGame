# Stage 1
FROM node:16.15 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Stage 2
FROM nginx:alpine
COPY --from=build /app/dist/angularapp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]