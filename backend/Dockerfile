FROM ubuntu

RUN apt-get update


RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get upgrade -y
RUN apt install -y nodejs
# Copy package.json and package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .
# Rebuild bcrypt
# Expose port

ENTRYPOINT [ "node" ,"index.js" ]
