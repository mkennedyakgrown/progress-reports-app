from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import ForeignKey
from re import search

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ =  'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Column(db.String(30), nullable=False))
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    _password_hash = db.Column(db.String(60), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    @hybrid_property
    def name(self):
        return f'{self.first_name} {self.last_name}'
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'
    
