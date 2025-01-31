import json
from faker import Faker

fake = Faker()

courses = []
instructors = []
students = []
reports = []
departments = ["Ballet", "Jazz", "Tap", "Hip Hop", "Silks", "Hammock", "Lyra"]
levels = [1, 2, 3, 4, 5, 6, 7, 8, "Elementary", "Beginner Middle/High School", "Intermediate Middle/High School"]

# Generate courses
id_counter = 1
for i in departments:
    for j in levels:
        courses.append({
            "id": id_counter,
            "department": i,
            "level": j,
            "instructors": [],
            "students": [],
            "report_text": ""
        })
        id_counter += 1

# Generate instructors
for i in range(20):
    instructors.append({
        "id": i + 1,
        "name": fake.name(),
        "email": fake.email(),
        "courses": []
    })

# Generate students
for i in range(10):
    students.append({
        "id": i + 1,
        "name": fake.name(),
        "email": fake.email()
    })

#Assign instructors to courses
for course in courses:
    instructor = instructors[fake.random_int(min=0, max=len(instructors) - 1)]
    course["instructors"].append(instructor["id"])
    instructor["courses"].append(course["id"])

# Assign students to courses
for course in courses:
    for student in students:
        if fake.boolean():
            course["students"].append(student)

# Generate reports
for course in courses:
    for student in course["students"]:
        reports.append({
            "id": len(reports) + 1,
            "course_id": course["id"],
            "student_id": student["id"],
            "course_name": f'{course["department"]} {course["level"]}',
            "student_name": student["name"],
            "report_text": fake.paragraph()
            })
        
# Collect all data into a single JSON object
json_data = {
    "courses": courses,
    "instructors": instructors,
    "students": students,
    "reports": reports
}

with open("db.json", "w") as file:
    json.dump(json_data, file)
    print("Database seeded successfully!")
    file.close()