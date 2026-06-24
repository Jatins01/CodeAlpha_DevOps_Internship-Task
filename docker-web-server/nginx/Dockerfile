FROM nginx:alpine

# Remove default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom reverse proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
