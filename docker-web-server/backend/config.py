import os

class Config:
    """Base configuration settings for the Flask application."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-12345')
    
    # Database configuration
    DB_USER = os.environ.get('MYSQL_USER', 'notes_user')
    DB_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'notes_password')
    DB_HOST = os.environ.get('MYSQL_HOST', 'mysql')
    DB_PORT = os.environ.get('MYSQL_PORT', '3306')
    DB_NAME = os.environ.get('MYSQL_DATABASE', 'notes_db')
    
    # SQLAlchemy URI
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
