# Use an official Caddy image as the base image
FROM caddy:2.8.4

# Copy the built Vite app to the Caddy root directory
COPY ./dist /srv

# Copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile
