# build environment
FROM node:slim
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Build args
ARG BACKEND_HOST
ARG BACKEND_PORT
# Environment variables
ENV REACT_APP_BACKEND_HOST $BACKEND_HOST
ENV REACT_APP_BACKEND_PORT $BACKEND_PORT

COPY package*.json ./
COPY . ./
RUN npm i
CMD ["npm", "run", "start"]
