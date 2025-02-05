import React from "react";

function ReportsInstructor({ currentInstructor, instructorCourses = [] }) {
  function handleUpdateReport() {}

  function handleUpdateCourseReport() {}

  const ReportsClass = React.lazy(() => import("./ReportsClass"));

  return (
    <>
      {instructorCourses.length > 0
        ? instructorCourses.map((course) => {
            console.log(`Loading Course ${course.name}`);
            return (
              <React.Suspense fallback={<>Loading Class...</>}>
                <ReportsClass
                  key={`course${course.id}`}
                  {...{
                    currentInstructor,
                    course,
                    handleUpdateReport,
                    handleUpdateCourseReport,
                  }}
                />
              </React.Suspense>
            );
          })
        : null}
    </>
  );
}

export default ReportsInstructor;
