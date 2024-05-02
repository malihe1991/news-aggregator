# Use a specific version of Node.js as the base image
FROM node:20.12.2-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app

# Copy the entire project to the working directory
COPY . /app

# Install dependencies
RUN npm install

# Expose the port that the frontend application listens on
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
