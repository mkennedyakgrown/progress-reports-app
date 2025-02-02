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

    courses = db.relationship('Course', secondary='users_courses', back_populates='instructors')
    student_reports = db.relationship('StudentReport', back_populates='instructor')
    course_reports = db.relationship('CourseReport', back_populates='instructor')

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
    
class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    level_id = db.Column(db.Integer, db.ForeignKey('levels.id'), nullable=False)
    
    instructors = db.relationship('User', secondary='users_courses', back_populates='courses')
    students = db.relationship('Student', secondary='students_courses', back_populates='courses')
    department = db.relationship('Department', back_populates='courses')
    level = db.relationship('Level', back_populates='courses')
    course_reports = db.relationship('CourseReport', back_populates='course', cascade='all, delete-orphan')
    student_reports = db.relationship('StudentReport', back_populates='course')


class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    courses = db.relationship('Course', back_populates='department')


class Level(db.Model, SerializerMixin):
    __tablename__ = 'levels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    courses = db.relationship('Course', back_populates='level')


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    
    courses = db.relationship('Course', secondary='students_courses', back_populates='students')
    student_reports = db.relationship('StudentReport', back_populates='student', cascade='all, delete-orphan')


class CourseReport(db.Model, SerializerMixin):
    __tablename__ = 'course_reports'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    report_text = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    course = db.relationship('Course', back_populates='course_reports')
    student = db.relationship('Student', back_populates='student_reports')


class StudentReport(db.Model, SerializerMixin):
    __tablename__ = 'student_reports'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    report_text = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    course = db.relationship('Course', back_populates='student_reports')
    student = db.relationship('Student', back_populates='student_reports')

class Users_Courses(db.Model, SerializerMixin):
    __tablename__ = 'users_courses'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True, nullable=False)

    __table_args__ = (db.UniqueConstraint('user_id', 'course_id'),)

class Students_Courses(db.Model, SerializerMixin):
    __tablename__ = 'students_courses'

    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True, nullable=False)

    __table_args__ = (db.UniqueConstraint('student_id', 'course_id'),)