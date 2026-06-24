# Stage 1: Build dependencies
FROM python:3.10-slim AS builder

WORKDIR /build

# Install compilation dependencies (useful for building C extensions if packages require it)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set up virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production runtime image
FROM python:3.10-slim AS runner

WORKDIR /app

# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv

# Copy application source code
COPY . /app

# Set environment paths and python configurations
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Expose Flask application port
EXPOSE 5000

# Run application as non-root user for security compliance
RUN groupadd -r notesgroup && useradd -r -g notesgroup -u 1001 notesuser && \
    chown -R notesuser:notesgroup /app /opt/venv

USER notesuser

# Container healthcheck: verify connection is alive
HEALTHCHECK --interval=15s --timeout=5s --start-period=15s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1

# Launch Gunicorn with 2 workers and 4 threads for production concurrency
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "4", "--access-logfile", "-", "app:app"]
