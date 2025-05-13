from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from marshmallow import fields

from config import app, db, api, ma
from models import User, Course, User, Student, CourseReport, StudentReport, Department, Level, Placement, Suggestion

# @app.route("/", defaults={'path': 'index.html'})
# @app.route("/<path:path>")
# def index(path):
#     return send_from_directory(app.static_folder, path)

# @app.errorhandler(404)
# def not_found(e):
#     return send_from_directory(app.static_folder, 'index.html')

# @app.route('/favicon.ico')
# def favicon():
#     return send_from_directory(app.static_folder, 'CS.svg', mimetype='image/svg+xml')

class Login(Resource):

    def head(self):
        json = request.get_json()
        return {'json': json}, 200

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
        
class Logout(Resource):

    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {'message': 'Successfully Logged Out'}, 200
        else:
            return {'message': 'You are not logged in'}, 401
        
class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user_schema.dump(user), 200
        else:
            return {'message': 'You are not logged in'}, 401

class Users(Resource):

    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200
    
class UsersStatus(Resource):

    def get(self):
        users = User.query.all()
        statuses = []

        for user in users:
            empty_student_reports = StudentReport.query.filter_by(instructor_id=user.id, report_text=" ").all()
            empty_course_reports = CourseReport.query.filter_by(instructor_id=user.id, report_text=" ").all()
            
            statuses.append({
                "name":f'{user.first_name} {user.last_name}',
                "remaining-reports":len(empty_course_reports) + len(empty_student_reports),
                "id": user.id
            })

        return statuses, 200
    
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
            if report.report_text == "":
                report.report_text == " "
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
            if report.report_text == "":
                report.report_text == " "
            report.date = datetime.now()
            db.session.commit()
            return student_report_schema.dump(report), 200
        else:
            return {'message': 'Student Report did not save'}, 401
        
class Students(Resource):

    def get(self):
        students = Student.query.all()
        return student_names_schema.dump(students), 200

class StudentById(Resource):

    def get(self, student_id):
        student = Student.query.filter(Student.id == student_id).first()
        return student_schema.dump(student), 200
    
    def patch(self, student_id):
        student = Student.query.filter(Student.id == student_id).first()
        json = request.get_json()
        if json.get('first_name'):
            student.first_name = json.get('first_name')
        if json.get('last_name'):
            student.last_name = json.get('last_name')
        if json.get('email'):
            student.email = json.get('email')
        if json.get('birth_date'):
            student.phone = json.get('birth_date')
        if json.get('gender'):
            student.gender = json.get('gender')
        if json.get('email_text'):
            student.email_text = json.get('email_text')
        if json.get('email_approved'):
            student.email_approved = json.get('email_approved')

        db.session.commit()
        return student_schema.dump(student), 200
    
class StudentEmailById(Resource):

    def get(self, student_id):
        student = Student.query.filter(Student.id == student_id).first()
        student_object = student_schema.dump(student)

        return student_schema.dump(student), 200
    
class PlacementById(Resource):

    def get(self, placement_id):
        placement = Placement.query.filter(Placement.id == placement_id).first()
        return placement_schema.dump(placement), 200
    
    def patch(self, placement_id):
        placement = Placement.query.filter(Placement.id == placement_id).first()
        json = request.get_json()
        if json.get('course_name'):
            placement.course_name = json.get('course_name')
        db.session.commit()
        return placement_schema.dump(placement), 200
    
class SuggestionById(Resource):

    def get(self, suggestion_id):
        suggestion = Suggestion.query.filter(Suggestion.id == suggestion_id).first()
        return suggestion_schema.dump(suggestion), 200
    
    def patch(self, suggestion_id):
        suggestion = Suggestion.query.filter(Suggestion.id == suggestion_id).first()
        json = request.get_json()
        if json.get('course_name'):
            suggestion.course_name = json.get('course_name')
        db.session.commit()
        return suggestion_schema.dump(suggestion), 200
        
api.add_resource(Users, '/api/users')
api.add_resource(UsersStatus, '/api/users/status')
api.add_resource(CoursesByInstructor, '/api/users/<int:user_id>/courses')
api.add_resource(CourseReportById, '/api/course-reports/<int:report_id>')
api.add_resource(StudentReportById, '/api/student-reports/<int:report_id>')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(CheckSession, '/api/check-session')
api.add_resource(Students, '/api/students')
api.add_resource(StudentById, '/api/students/<int:student_id>')
api.add_resource(StudentEmailById, '/api/students/email/<int:student_id>')
api.add_resource(PlacementById, '/api/placements/<int:placement_id>')
api.add_resource(SuggestionById, '/api/suggestions/<int:suggestion_id>')

class UserSchema(ma.SQLAlchemySchema):

    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    is_admin = ma.auto_field()
    signature = ma.auto_field()

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
    email_text = ma.auto_field()
    email_approved = ma.auto_field()

    placements = fields.Nested('PlacementSchema', many=True)
    suggestions = fields.Nested('SuggestionSchema', many=True)
    courses = fields.Nested('CourseSchema', only=['name', 'id'], many=True)
    student_reports = fields.Nested('StudentReportSchema', only=[
        'id',
        'student_id',
        'course_id',
        'course',
        'instructor_id',
        'instructor',
        'report_text',
        'date'
        ], many=True)
    
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class StudentNameSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Student
        load_instance = True

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email_approved = ma.auto_field()

student_name_schema = StudentNameSchema()
student_names_schema = StudentNameSchema(many=True)

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
    instructor = fields.Nested('UserSchema', only=['first_name', 'last_name', 'signature'])

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

    course = fields.Nested('CourseSchema', only=['name', 'course_reports'], many=False)
    student = fields.Nested('StudentSchema', only=['first_name', 'last_name'], many=False)
    instructor = fields.Nested('UserSchema', only=['first_name', 'last_name', 'signature'], many=False)

student_report_schema = StudentReportSchema()
student_reports_schema = StudentReportSchema(many=True)

class PlacementSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Placement
        load_instance = True

    id = ma.auto_field()
    student_id = ma.auto_field()
    course_name = ma.auto_field()

    student = fields.Nested('StudentSchema', only=['first_name', 'last_name'], many=False)

placement_schema = PlacementSchema()
placements_schema = PlacementSchema(many=True)

class SuggestionSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Suggestion
        load_instance = True

    id = ma.auto_field()
    student_id = ma.auto_field()
    course_name = ma.auto_field()

    student = fields.Nested('StudentSchema', only=['first_name', 'last_name'], many=False)

suggestion_schema = SuggestionSchema()
suggestions_schema = SuggestionSchema(many=True)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
    # app.run()