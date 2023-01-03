FROM node:19-alpine

WORKDIR /app

COPY package.json .

ENV NODE_ENV=production

ENV DATABASE=mongodb+srv://zmekonnen251:<PASSWORD>@cluster0.sdvwn.mongodb.net/?retryWrites=true&w=majority
ENV DATABASE_PASSWORD=zelalem251

ENV GOOGLE_CLIENT_ID=737626982500-8nnk992aku81j5vmama0aprad90ss2os.apps.googleusercontent.com

ENV ACCESS_TOKEN_SECRET=c38c91f98870c00512bae3ef14193b487852cb8e195b3b49b77c7b4cb370d92a15f7b5deba213ed7d4c6f4de6181a4e95b76e52d91c8f09dfbfda638e0cf86f2
ENV REFRESH_TOKEN_SECRET=4bf4fa177fc27bbf136b46144337d6cd2bd842a9dff1f7ec6c7ff812fc7ea5c05dc7f68d8fd85ae0470099cd1311e53f111b3a22164bec2dbda1ec24bbc767c8

# Enviroment variables for gmail smtp server
ENV EMAIL_FROM=zmekonnen59@gmail.com

ENV FRONT_END_URL=https://tizitachin.netlify.app
ENV GMAIL_USERNAME=zmekonnen59@gmail.com
ENV GMAIL_PASSWORD=eptodymxpnsmtizf


COPY . .

RUN npm install

CMD ["npm", "start"]