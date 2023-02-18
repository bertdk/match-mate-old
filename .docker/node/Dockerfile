FROM node:16

# Install dependencies
RUN apt-get update && apt-get install -y postgresql-9.6

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app
RUN yarn

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 4000
ENTRYPOINT [ "yarn", "start" ]