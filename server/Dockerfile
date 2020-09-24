# /*                                            *\
# ** ------------------------------------------ **
# **           Sample - Weather SPA    	      **
# ** ------------------------------------------ **
# **  Copyright (c) 2020 - Kyle Derby MacInnis  **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

FROM node
LABEL Author "Kyle Derby MacInnis"
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Edmonton
# App Env Variables
ENV API_HOST=${API_HOST}
ENV API_VERSION=${API_VERSION}
ENV API_ROUTE_PATH=${API_ROUTE_PATH}
ENV APP_PORT=${PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_TYPE=${DB_TYPE}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV ENABLE_AUTH=${ENABLE_AUTH}
ENV WEATHER_API_KEY=${WEATHER_API_KEY}
# Copy Content
WORKDIR /opt
RUN mkdir weather
WORKDIR /opt/weather
COPY . .
# Build Source
RUN yarn
RUN yarn build
# Expose Ports
EXPOSE 8081
# Start when Container Opens
CMD [ "yarn", "start" ]

