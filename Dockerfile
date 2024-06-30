# Dockerfile for sekai-api (Express.js)

# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 4000

# Declare build arguments
ARG PORT
ARG DB_HOST
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG JWT_SECRET

# Set environment variables
ENV PORT=$PORT
ENV DB_HOST=$DB_HOST
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV JWT_SECRET=$JWT_SECRET

# Expose the port the app runs on
EXPOSE $PORT

# Define the command to run the app
CMD ["node", "index.js"]
