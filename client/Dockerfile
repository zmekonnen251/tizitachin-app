FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
ENV CHOKDIR_USERPOOLING=true
RUN npm install --legacy-peer-deps && npm cache clean --force
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
