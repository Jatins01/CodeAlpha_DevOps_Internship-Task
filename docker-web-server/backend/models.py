from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Note(db.Model):
    """Note Database Model."""
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    def to_dict(self):
        """Serialize note object to dictionary."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%SZ') if self.created_at else None
        }
