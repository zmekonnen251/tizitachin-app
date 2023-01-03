FROM debian:bullseye as builder

ARG NODE_VERSION=16.17.0

RUN apt-get update; apt install -y curl python-is-python3 pkg-config build-essential
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}

#######################################################################

RUN mkdir /app
WORKDIR /app

# NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# to install all modules: "npm install --production=false".
# Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

ENV NODE_ENV production

COPY . .

RUN npm install
FROM debian:bullseye

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production
ENV PATH /root/.volta/bin:$PATH

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

CMD [ "npm", "run", "start" ]
