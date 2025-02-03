from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from marshmallow import fields

from config import app, db, api, ma
from models import User, Course, User, Student, CourseReport, StudentReport, Department, Level

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
        

class Users(Resource):

    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200
    
class CoursesByInstructor(Resource):

    def get(self, user_id):
        user = User.query.filter(User.id == user_id).first()
        return courses_schema.dump(user.courses), 200
        
api.add_resource(Users, '/users')
api.add_resource(CoursesByInstructor, '/users/<int:user_id>')
api.add_resource(Login, '/login')

class UserSchema(ma.SQLAlchemySchema):

    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    courses = fields.Nested('CourseSchema', only=['id', 'name'], many=True)
    # student_reports = fields.Nested('StudentReportSchema', only=['id', 'student', 'course', 'report_text', 'date'], many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class CourseSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Course
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)


if __name__ == "__main__":
    app.run(port=5555, debug=True)