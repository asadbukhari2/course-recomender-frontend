import { initStore } from "./store";

const configureCoursesStore = () => {
  const actions = {
    FETCH_COURSES: (currState, courses) => {
      currState.course.courses = courses;

      return currState;
    },

    TOGGLE_CAMPUS: (currState) => {
      currState.course.study_mode = 1;

      return currState;
    },

    TOGGLE_ONLINE: (currState) => {
      currState.course.study_mode = 2;

      return currState;
    },

    TOGGLE_DEGREE_SEMESTER: (currState, data) => {
      currState.course.degree = data.degree;
      currState.course.semester = data.semester;

      return currState;
    },

    FILTERED_COURSES: (currState) => {
      currState.course.filterItem = currState.course.courses.filter(
        (filterCourses) =>
          filterCourses.study_mode === currState.course.study_mode &&
          filterCourses.degree === currState.course.degree &&
          filterCourses.semester === currState.course.semester,
      );

      return currState;
    },

    TOGGLE_CATEGORY: (currState, data) => {
      currState.course.category = data.category;

      // console.log(currState.course.difficulty, currState.course);

      if (currState.course.difficulty !== null) {
        currState.course.filterCategoryOrDifficulty =
          currState.course.filterItem.filter(
            (filterCourses) =>
              filterCourses.study_mode === currState.course.study_mode &&
              filterCourses.degree === currState.course.degree &&
              filterCourses.semester === currState.course.semester &&
              filterCourses.difficulty === currState.course.difficulty &&
              filterCourses.category === currState.course.category,
          );
      } else {
        currState.course.filterCategoryOrDifficulty =
          currState.course.courses.filter(
            (filterCourses) =>
              filterCourses.study_mode === currState.course.study_mode &&
              filterCourses.degree === currState.course.degree &&
              filterCourses.semester === currState.course.semester &&
              filterCourses.category === currState.course.category,
          );
      }
      return currState;
    },

    TOGGLE_DIFFICULTY: (currState, data) => {
      currState.course.difficulty = data.difficulty;
      console.log(currState.course.category);
      if (currState.course.category !== null) {
        // console.log("if category");
        currState.course.filterCategoryOrDifficulty =
          currState.course.courses.filter(
            (filterCourses) =>
              filterCourses.study_mode === currState.course.study_mode &&
              filterCourses.degree === currState.course.degree &&
              filterCourses.semester === currState.course.semester &&
              filterCourses.category === currState.course.category &&
              filterCourses.difficulty === currState.course.difficulty,
          );
      } else {
        // console.log("if not category");
        currState.course.filterCategoryOrDifficulty =
          currState.course.courses.filter(
            (filterCourses) =>
              filterCourses.study_mode === currState.course.study_mode &&
              filterCourses.degree === currState.course.degree &&
              filterCourses.semester === currState.course.semester &&
              filterCourses.difficulty === currState.course.difficulty,
          );
      }

      return currState;
    },
  };

  initStore(actions, {
    course: {
      courses: [],
      study_mode: null,
      degree: null,
      semester: null,
      category: null,
      difficulty: null,
      filterItem: [],
      filterCategoryOrDifficulty: [],
    },
  });
};

export default configureCoursesStore;
