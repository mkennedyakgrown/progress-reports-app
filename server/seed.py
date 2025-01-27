import json
from faker import Faker

fake = Faker()

courses = [
    {
        "id": 1,
        "department": "Ballet",
        "level": 3,
        "students": [],
        "report_text": "",
    },
    {
        "id": 2,
        "department": "Jazz",
        "level": 4,
        "students": [],
        "report_text": "",
    },
    {
        "id": 3,
        "department": "Tap",
        "level": 2,
        "students": [],
        "report_text": "",
    },
    {
        "id": 4,
        "department": "Hip Hop",
        "level": 8,
        "students": [],
        "report_text": "",
    }
]
students = []
reports = []

# Generate students
for i in range(10):
    students.append({
        "id": i + 1,
        "name": fake.name(),
        "email": fake.email()
    })

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
    "students": students,
    "reports": reports
}

with open("db.json", "w") as file:
    json.dump(json_data, file)
    print("Database seeded successfully!")
    file.close()