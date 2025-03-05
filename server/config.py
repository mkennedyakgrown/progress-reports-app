from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.pool import QueuePool
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
import os

load_dotenv()

naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=naming_convention)
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
# app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
# app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Get environment variables
TURSO_DATABASE_URL = os.environ.get("TURSO_DATABASE_URL")
TURSO_AUTH_TOKEN = os.environ.get("TURSO_AUTH_TOKEN")

# construct special SQLAlchemy URL
dbUrl = f"sqlite+{TURSO_DATABASE_URL}/?authToken={TURSO_AUTH_TOKEN}&secure=true"
app.config["SQLALCHEMY_DATABASE_URI"] = dbUrl
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    'poolclass':QueuePool,
    'pool_size':5,
    'max_overflow':10,
    'pool_timeout':30,
    'pool_recycle':1800,
    'pool_pre_ping':True,
    'connect_args':{"check_same_thread": False},
    'echo':True
}

db = SQLAlchemy(app=app, metadata=metadata)

migrate = Migrate(app=app, db=db)

bcrypt = Bcrypt(app=app)

api = Api(app=app)

CORS(app)

ma = Marshmallow(app=app)