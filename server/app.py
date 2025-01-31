from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from config import app, db, api

class Login(Resource):

    def post(self):
        json = request.get_json()
        email = json.get('email')
        user = User.query.filter(User.email == email).first()
        password = json.get('password')
        if user and user.authenticate(password) == True:
            session['user_id'] = user.id
            return user.to_json(), 200
        else:
            return {'message': 'Username and password do not match'}, 401
        
api.add_resource(Login, '/login')



if __name__ == "__main__":
    app.run(port=5555, debug=True)