from config import app, db
from models import User, Course, Student, CourseReport, StudentReport, Department, Level, Users_Courses, Students_Courses
from datetime import datetime
import pandas as pd

if __name__ == "__main__":
    with app.app_context():

        def create_user(first_name, last_name, email, password="CenterStage001", is_admin=False):
            user = User(first_name=first_name, last_name=last_name, email=email, is_admin=is_admin)
            user.password_hash = password

            
            return user

        

        ############ Begin Execution ##############

        # # Create Departments
        # print("Creating Departments...")
        # departments = [
        #     "Ballet",
        #     "Clog",
        #     "Hammock",
        #     "Hip Hop",
        #     "Jazz/Lyrical",
        #     "Lyra",
        #     "Silk",
        #     "Tap",
        #     "Other"
        # ]

        # for department in departments:
        #     new_department = Department(name=department)
        #     db.session.add(new_department)
        
        # db.session.commit()
        
        # # Create Levels
        # print("Creating Levels...")
        # levels = [
        #     "1",
        #     "2",
        #     "3",
        #     "4",
        #     "5",
        #     "6",
        #     "7",
        #     "8",
        #     "9",
        #     "10",
        #     "Elementary",
        #     "Middle/High School",
        #     "Beginning Middle/High School",
        #     "Intermediate Middle/High School",
        #     "Advanced Middle/High School",
        #     "Pre School",
        #     "N/A"
        # ]

        # for level in levels:
        #     new_level = Level(name=level)
        #     db.session.add(new_level)

        # db.session.commit()


        # Create Users and Assigning to Courses
        # print("Creating Users and Assigning to Courses...")

        # users_df = pd.read_excel('enrollment_sources/ActiveStaff.xlsx')
        # [rows, columns] = users_df.shape

        # for row in range(rows):
        #     row_list = users_df.loc[row]
        #     split_name = row_list["Name"].split(" ")
        #     first_name = split_name[0]
        #     last_name = split_name[1]
        #     if len(split_name) > 2:
        #         last_name += f' {split_name[2]}'
        #     email = row_list["Email"]

        #     new_user = create_user(first_name, last_name, email)
        #     db.session.add(new_user)

        # db.session.commit()



        # Create Courses
#         print("Creating Courses...")
#         print("Parsing Spreadsheet...")

#         users = User.query.all()
#         departments = Department.query.all()
#         levels = Level.query.all()

#         courses_df = pd.read_excel('enrollment_sources/ClassesListReport.xlsx')
#         [rows, columns] = courses_df.shape
        
#         for row in range(rows):
#             row_list = courses_df.loc[row]
#             name = row_list["Class"]

#             department_name = row_list["Department"]
#             print(department_name)
#             department = [dep for dep in departments if dep.name == department_name][0]

#             level_name = str(row_list["Level"])
#             if level_name == "nan":
#                 level_name = "N/A"
#             level = [l for l in levels if l.name == level_name][0]

#             course = Course(name=name, department_id=department.id, level_id=level.id)

#             raw_instructors = row_list["Instructors"]
#             instructor_names = []
#             if ", " in raw_instructors:
#                 instructor_names = raw_instructors.split(", ")
#             else:
#                 instructor_names.append(raw_instructors)

#             for instructor in instructor_names:
#                 new_instructor = [user for user in users if user.first_name in instructor and user.last_name[0] == instructor[-2]]
#                 course.instructors.append(new_instructor[0])

#             print(f'''New Course:
# Name: {course.name}
# Department_id: {course.department_id}
# Level_id: {course.level_id}
# Instructors: {[instructor.first_name + " " + instructor.last_name for instructor in course.instructors]}
# ''')
#             db.session.add(course)

#         db.session.commit()

            


        # # Create and Enroll Students
        # print("Creating Students...")

        # enrollment_df = pd.read_excel('enrollment_sources/EnrollmentDetailRpt.xlsx')
        # [rows, columns] = enrollment_df.shape

        # students = {}

        # for row in range(rows):
        #     row_list = enrollment_df.loc[row]
        #     first_name = row_list["Student First Name"]
        #     last_name = row_list["Student\nLast Name"]
        #     name = f'{first_name} {last_name}'
        #     gender = row_list["Gender"]
        #     birthdate = row_list["Birthdate"]

        #     course_name = row_list["Class Name"]

        #     if name not in students:

        #         student = Student(
        #             first_name=first_name,
        #             last_name=last_name,
        #             email=f'{first_name}{last_name}placeholder@email.com',
        #             gender=gender,
        #             birth_date=datetime.strptime(birthdate, "%m/%d/%Y")
        #         )

        #         db.session.add(student)

        #         students[name] = student

        #         print(student.birth_date)

        # db.session.commit()
        
        # print("Completed Creating Students")
        
        # Enroll Students
        # print("Enrolling Students")

        # enrollment_df = pd.read_excel('enrollment_sources/EnrollmentDetailRpt.xlsx')
        # [rows, columns] = enrollment_df.shape

        # courses = Course.query.all()
        # students = Student.query.all()

        # for row in range(rows):
        #     row_list = enrollment_df.loc[row]
        #     curr_course = [course for course in courses if course.name == row_list["Class Name"]][0]
        #     student = [student for student in students if student.first_name == row_list["Student First Name"] and student.last_name == row_list["Student\nLast Name"]][0]

        #     student.courses.append(curr_course)

        # db.session.commit()


        
        # Create Course Reports
        # print("Creating Course Reports...")

        # courses = Course.query.all()

        # for course in courses:
        #     for instructor in course.instructors:
        #         report = CourseReport(
        #             course_id=course.id,
        #             instructor_id=instructor.id,
        #             report_text=" ",
        #             date=datetime.now()
        #         )
        #         db.session.add(report)

        # db.session.commit()


        # Create Student Reports
        print("Creating Student Reports...")

        courses = Course.query.all()

        for course in courses:
            for instructor in course.instructors:
                for student in course.students:
                    report = StudentReport(
                        student_id=student.id,
                        course_id=course.id,
                        instructor_id=instructor.id,
                        report_text=" ",
                        date=datetime.now()
                    )
                    db.session.add(report)

        db.session.commit()


        # print("Database Successfully Populated")