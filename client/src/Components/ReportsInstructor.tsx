import ReportsClass from "./ReportsClass";

function ReportsInstructor({ currentInstructor, instructorCourses = [] }) {
  function handleUpdateReport() {}

  function handleUpdateCourseReport() {}

  return (
    <>
      {instructorCourses.length > 0
        ? instructorCourses.map((course) => {
            return (
              <ReportsClass
                key={`course${course.id}`}
                {...{
                  currentInstructor,
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
