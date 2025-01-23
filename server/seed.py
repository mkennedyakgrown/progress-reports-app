import json
from faker import Faker

fake = Faker()

courses = [
    {
        "id": 1,
        "department": "Ballet",
        "level": "3",
        "students": []
    },
    {
        "id": 2,
        "department": "Jazz",
        "level": "4",
        "students": []
    },
    {
        "id": 3,
        "department": "Tap",
        "level": "2",
        "students": []
    },
    {
        "id": 4,
        "department": "Hip Hop",
        "level": "8",
        "students": []
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
            "course_id": course["id"],
            "student_id": student["id"],
            "report": fake.paragraph()
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