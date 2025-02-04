import ReportsClass from "./ReportsClass";

function ReportsInstructor({ currentInstructor, instructorCourses }) {
  function handleUpdateReport() {}

  function handleUpdateCourseReport() {}

  return (
    <>
      {instructorCourses
        ? instructorCourses.map((course) => {
            return (
              <ReportsClass
                key={`course${course.id}`}
                {...{
                  course,
                  handleUpdateReport,
                  handleUpdateCourseReport,
                }}
              />
            );
          })
        : null}
    </>
  );
}

export default ReportsInstructor;
