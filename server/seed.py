from config import app, db
from models import User, Course, Student, CourseReport, StudentReport, Department, Level, Users_Courses, Students_Courses
from random import choice
from faker import Faker
from datetime import datetime

fake = Faker()

if __name__ == "__main__":
    with app.app_context():
        
        def create_user(first_name, last_name, email, password, is_admin=False):
            user = User(first_name=first_name, last_name=last_name, email=email, is_admin=is_admin)
            user.password_hash = password
            return user

        def create_course(name, department, level):
            course = Course(name=name, department=department, level=level)
            return course
        
        def create_department(name):
            department = Department(name=name)
            return department
        
        def create_level(name):
            level = Level(name=name)
            return level
        
        def create_student(first_name, last_name, email, birth_date):
            student = Student(first_name=first_name, last_name=last_name, email=email, birth_date=birth_date)
            return student
        
        def assign_user_courses():
            users = User.query.all()
            courses = Course.query.all()

            for course in courses:
                if fake.boolean == True:
                    instructor_1 = choice(users)
                    instructor_2 = choice(users)
                    while instructor_1 == instructor_2:
                        instructor_2 = choice(users)
                    course.instructors.extend([instructor_1, instructor_2])
                else:
                    course.instructors.append(choice(users))

            return courses
        
        def assign_student_courses():
            students = Student.query.all()
            courses = Course.query.all()

            for student in students:
                courses_range = choice(range(5, 9))
                enrolled_courses = []
                for i in courses_range:
                    course = choice(courses)
                    while course in enrolled_courses:
                        course = choice(courses)
                    enrolled_courses.append(course)
                student.courses.extend(enrolled_courses)

            return students
        
        def create_course_reports():
            courses = Course.query.all()
            course_reports = []

            for course in courses:
                for instructor in course.instructors:
                    report = CourseReport(
                        course_id=course.id,
                        instructor_id=instructor.id,
                        report_text=fake.paragraph(),
                        date=datetime.now()
                    )
                    course_reports.append(report)

            return course_reports
        
        def create_student_reports():
            courses = Course.query.all()
            student_reports = []

            for course in courses:
                for instructor in course.instructors:
                    for student in course.students:
                        report = StudentReport(
                            student_id=student.id,
                            course_id=course.id,
                            instructor_id=instructor.id,
                            report_text=fake.paragraph(),
                            date=datetime.now()
                        )
                        student_reports.append(report)

            return student_reports
        
        print("Clearing database...")
        db.session.query(User).delete()
        db.session.query(Course).delete()
        db.session.query(Department).delete()
        db.session.query(Level).delete()
        db.session.query(Student).delete()
        db.session.query(CourseReport).delete()
        db.session.query(StudentReport).delete()
        db.session.query(Users_Courses).delete()
        db.session.query(Students_Courses).delete()
        db.session.commit()

        print("Creating users...")
        counter = 0
        for i in range(20):
            new_user = create_user(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password="password",
                is_admin=False
            )
            db.session.add(new_user)
            counter += 1

        # Create one consistent test admin user
        test_admin = create_user(
            first_name="Matthew",
            last_name="Kennedy",
            email="matt@matt.matt",
            password="password",
            is_admin=True
        )
        db.session.add(test_admin)
        counter += 1
        print("Committing Session")
        db.session.commit()
        print(f"Successfully created {counter} new users")

        # print("Creating Departments...")
        # new_departments = []