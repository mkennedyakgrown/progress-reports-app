from config import app, db
from models import User, Course, Student, CourseReport, StudentReport, Department, Level, Users_Courses, Students_Courses

if __name__ == '__main__':
    with app.app_context():

        print("Creating Tables")
        db.create_all()
        db.session.commit()
        print("Tables Created")