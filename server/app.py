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
            return user_schema.dump(user), 200
        else:
            return {'message': 'Username and password do not match'}, 401
        

class Users(Resource):

    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200
    
class CoursesByInstructor(Resource):

    def get(self, user_id):
        user = User.query.filter(User.id == user_id).first()
        courses = [Course.query.filter(Course.id == course.id).first() for course in user.courses]
        courses = courses_schema.dump(courses)

        for course in courses:
            curr_instructor_report = [report for report in course['course_reports'] if report['instructor_id'] == user_id]
            course['course_reports'] = curr_instructor_report
            curr_instructor_student_reports = [report for report in course['student_reports'] if report['instructor_id'] == user_id]
            course['student_reports'] = curr_instructor_student_reports

        return courses, 200
    
class CourseReports(Resource):

    def get(self):
        reports = CourseReport.query.all()
        return course_reports_schema.dump(reports), 200
    
class CourseReportById(Resource):
    
    def patch(self, report_id):
        report = CourseReport.query.filter(CourseReport.id == report_id).first()
        json = request.get_json()
        if json.get('report_text'):
            report.report_text = json.get('report_text')
            report.date = datetime.now()
            db.session.commit()
            return course_report_schema.dump(report), 200
        else:
            return {'message': 'Course Report did not save'}, 401
        
class StudentReportById(Resource):

    def patch(self, report_id):
        report = StudentReport.query.filter(StudentReport.id == report_id).first()
        json = request.get_json()
        if json.get('report_text'):
            report.report_text = json.get('report_text')
            report.date = datetime.now()
            db.session.commit()
            return student_report_schema.dump(report), 200
        else:
            return {'message': 'Student Report did not save'}, 401
        
        
        
api.add_resource(Users, '/users')
api.add_resource(CoursesByInstructor, '/users/<int:user_id>/courses')
api.add_resource(CourseReportById, '/course-reports/<int:report_id>')
api.add_resource(StudentReportById, '/student-reports/<int:report_id>')
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

    course_reports = fields.Nested('CourseReportSchema', many=True)
    student_reports = fields.Nested('StudentReportSchema', many=True)

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

class StudentSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Student
        load_instance = True

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    birth_date = ma.auto_field()

    courses = fields.Nested('CourseSchema', only=['name', 'id'], many=True)
    student_reports = fields.Nested('StudentReportSchema', only=[
        'id',
        'student_id',
        'course_id',
        'instructor_id',
        'report_text',
        'date'
        ], many=True)
    
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class CourseReportSchema(ma.SQLAlchemySchema):

    class Meta:
        model = CourseReport
        load_instance = True
    
    id = ma.auto_field()
    course_id = ma.auto_field()
    instructor_id = ma.auto_field()
    report_text = ma.auto_field()
    date = ma.auto_field()

    course = fields.Nested('CourseSchema', only=['name'])
    instructor = fields.Nested('UserSchema', only=['first_name', 'last_name'])

course_report_schema = CourseReportSchema()
course_reports_schema = CourseReportSchema(many=True)

class StudentReportSchema(ma.SQLAlchemySchema):

    class Meta:
        model = StudentReport
        load_instance = True
    
    id = ma.auto_field()
    student_id = ma.auto_field()
    course_id = ma.auto_field()
    instructor_id = ma.auto_field()
    report_text = ma.auto_field()
    date = ma.auto_field()

    course = fields.Nested('CourseSchema', only=['name'], many=False)
    student = fields.Nested('StudentSchema', only=['first_name', 'last_name'], many=False)
    instructor = fields.Nested('UserSchema', only=['first_name', 'last_name'], many=False)

student_report_schema = StudentReportSchema()
student_reports_schema = StudentReportSchema(many=True)


if __name__ == "__main__":
    app.run(port=5555, debug=True)