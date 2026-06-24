import os
import time
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from config import Config
from models import db, Note

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize db
    db.init_app(app)

    # Database automatic tables creation with retry mechanism
    with app.app_context():
        retries = 10
        db_connected = False
        while retries > 0:
            try:
                # Try to execute a simple query to verify connection
                db.session.execute(text('SELECT 1'))
                db.create_all()
                logger.info("Database tables initialized successfully.")
                db_connected = True
                break
            except OperationalError as e:
                retries -= 1
                logger.warning(f"Database connection failed. Retrying in 3 seconds... ({retries} retries left). Error: {e}")
                time.sleep(3)
        
        if not db_connected:
            logger.critical("Could not connect to database after several attempts. Exiting.")
            raise Exception("Database connection failed during startup.")

    # --- Error Handlers ---
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad Request', 'message': str(error.description)}), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not Found', 'message': str(error.description)}), 404

    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Internal Server Error: {error}")
        return jsonify({'error': 'Internal Server Error', 'message': 'An unexpected error occurred.'}), 500

    # --- API Routes ---
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint to verify app status and database connectivity."""
        try:
            db.session.execute(text('SELECT 1'))
            return jsonify({
                'status': 'healthy',
                'database': 'connected',
                'timestamp': time.time()
            }), 200
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return jsonify({
                'status': 'unhealthy',
                'database': 'disconnected',
                'error': str(e)
            }), 500

    @app.route('/api/notes', methods=['GET'])
    def get_notes():
        """Retrieve all notes, ordered by creation time (newest first)."""
        try:
            notes = Note.query.order_by(Note.created_at.desc()).all()
            return jsonify([note.to_dict() for note in notes]), 200
        except Exception as e:
            logger.error(f"Error fetching notes: {e}")
            return jsonify({'error': 'Database error', 'message': str(e)}), 500

    @app.route('/api/notes', methods=['POST'])
    def create_note():
        """Create a new note with validation."""
        data = request.get_json() or {}
        
        # Validation
        title = data.get('title', '').strip()
        description = data.get('description', '').strip()
        
        if not title:
            return jsonify({'error': 'Validation Error', 'message': 'Title is required'}), 400
        if len(title) > 255:
            return jsonify({'error': 'Validation Error', 'message': 'Title must be under 255 characters'}), 400
        if not description:
            return jsonify({'error': 'Validation Error', 'message': 'Description is required'}), 400

        try:
            new_note = Note(title=title, description=description)
            db.session.add(new_note)
            db.session.commit()
            logger.info(f"Created new note with ID {new_note.id}: {new_note.title}")
            return jsonify(new_note.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error creating note: {e}")
            return jsonify({'error': 'Database error', 'message': str(e)}), 500

    @app.route('/api/notes/<int:note_id>', methods=['DELETE'])
    def delete_note(note_id):
        """Delete a note by its ID."""
        try:
            note = Note.query.get(note_id)
            if not note:
                return jsonify({'error': 'Not Found', 'message': f'Note with ID {note_id} not found'}), 404
            
            db.session.delete(note)
            db.session.commit()
            logger.info(f"Deleted note with ID {note_id}")
            return jsonify({'message': f'Note with ID {note_id} deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error deleting note {note_id}: {e}")
            return jsonify({'error': 'Database error', 'message': str(e)}), 500

    return app

app = create_app()

if __name__ == '__main__':
    # Used when running locally without docker/gunicorn
    app.run(host='0.0.0.0', port=5000)
