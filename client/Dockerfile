FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
ENV CHOKDIR_USERPOOLING=true
RUN npm install --legacy-peer-deps && npm cache clean --force
COPY . .
RUN npm run build

EXPOSE 3000
COPY --from=builder /app/build /usr/share/nginx/html
