# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy only package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy app source code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
