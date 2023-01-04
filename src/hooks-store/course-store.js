import { initStore } from "./store";

const configureCoursesStore = () => {
	const actions = {
		/*-----Search-----*/
		// FETCH_SEARCHED_PRODUCTS: (currState, products) => {
		//     console.log('FETCH_SEARCHED_PRODUCTS', products)
		//
		//     currState.product.searchedProducts = products
		//
		//     return currState
		// },

		/*-----Courses-----*/
		FETCH_COURSES: (currState, courses) => {
			console.log("FETCH_COURSES");

			currState.course.courses = courses;

			return currState;
		},

		/*------Category Actions------*/

		TOGGLE_CAMPUS: currState => {
			console.log("TOGGLE_CAMPUS");

			currState.course.study_mode = 1;

			return currState;
		},

		TOGGLE_ONLINE: currState => {
			console.log("TOGGLE_ONLINE");

			currState.course.study_mode = 2;

			return currState;
		},

		/*------Degree & Semester Actions------*/

		TOGGLE_DEGREE_SEMESTER: (currState, data) => {
			console.log("TOGGLE_DEGREE_SEMESTER");

			currState.course.degree = data.degree;
			currState.course.semester = data.semester;

			return currState;
		},

		FILTERED_COURSES: currState => {
			console.log("FILTERED_COURSES");

			currState.course.filterItem = currState.course.courses.filter(
				filterCourses =>
					filterCourses.study_mode === currState.course.study_mode &&
					filterCourses.degree === currState.course.degree &&
					filterCourses.semester === currState.course.semester
			);

			// if (currState.course.filterItem.length > 0) {
			//     if (currState.course.category !== null && currState.course.difficulty !== null) {
			//         currState.course.filterItem = currState.course.courses.filter(
			//             filterCourses =>
			//                 filterCourses.study_mode === currState.course.study_mode &&
			//                 filterCourses.degree === currState.course.degree &&
			//                 filterCourses.semester === currState.course.semester &&
			//                 filterCourses.category === currState.course.category &&
			//                 filterCourses.difficulty === currState.course.difficulty
			//         )
			//     } else if (currState.course.category !== null) {
			//         currState.course.filterItem = currState.course.courses.filter(
			//             filterCourses =>
			//                 filterCourses.study_mode === currState.course.study_mode &&
			//                 filterCourses.degree === currState.course.degree &&
			//                 filterCourses.semester === currState.course.semester &&
			//                 filterCourses.category === currState.course.category
			//         )
			//     } else if (currState.course.difficulty !== null) {
			//         currState.course.filterItem = currState.course.courses.filter(
			//             filterCourses =>
			//                 filterCourses.study_mode === currState.course.study_mode &&
			//                 filterCourses.degree === currState.course.degree &&
			//                 filterCourses.semester === currState.course.semester &&
			//                 filterCourses.difficulty === currState.course.difficulty
			//         )
			//     }
			// }

			console.log("after filtered courses is : ", currState);

			return currState;
		},

		/*------Degree & Semester Actions------*/

		TOGGLE_CATEGORY: (currState, data) => {
			console.log("TOGGLE_CATEGORY", data);

			currState.course.category = data.category;

			console.log(currState.course.difficulty, currState.course);

			if (currState.course.difficulty !== null) {
				console.log("if difficulty");
				// currState.course.filterCategoryOrDifficulty = ["l", "w"];
				currState.course.filterCategoryOrDifficulty =
					currState.course.filterItem.filter(
						filterCourses =>
							filterCourses.study_mode === currState.course.study_mode &&
							filterCourses.degree === currState.course.degree &&
							filterCourses.semester === currState.course.semester &&
							filterCourses.difficulty === currState.course.difficulty &&
							filterCourses.category === currState.course.category
					);
			} else {
				console.log("else difficulty");
				// currState.course.filterCategoryOrDifficulty = ["l", "u"];
				// const d = currState.course.courses.filter(filterCourses => {
				// 	console.log(
				// 		filterCourses.study_mode === currState.course.study_mode &&
				// 			filterCourses.degree === currState.course.degree &&
				// 			filterCourses.semester === currState.course.semester &&
				// 			filterCourses.category === currState.course.category,
				// 		filterCourses.category,
				// 		currState.course.category
				// 	);
				// 	return (
				// 		filterCourses.study_mode === currState.course.study_mode &&
				// 		filterCourses.degree === currState.course.degree &&
				// 		filterCourses.semester === currState.course.semester &&
				// 		filterCourses.category === currState.course.category
				// 	);
				// });
				// console.log(d);
				currState.course.filterCategoryOrDifficulty =
					currState.course.courses.filter(
						filterCourses =>
							filterCourses.study_mode === currState.course.study_mode &&
							filterCourses.degree === currState.course.degree &&
							filterCourses.semester === currState.course.semester &&
							filterCourses.category === currState.course.category
					);
			}
			return currState;
		},

		TOGGLE_DIFFICULTY: (currState, data) => {
			console.log("TOGGLE_DIFFICULTY");

			currState.course.difficulty = data.difficulty;
			console.log(currState.course.category);
			if (currState.course.category !== null) {
				console.log("if category");
				// currState.course.filterCategoryOrDifficulty = ["l", "p"];
				currState.course.filterCategoryOrDifficulty =
					currState.course.courses.filter(
						filterCourses =>
							filterCourses.study_mode === currState.course.study_mode &&
							filterCourses.degree === currState.course.degree &&
							filterCourses.semester === currState.course.semester &&
							filterCourses.category === currState.course.category &&
							filterCourses.difficulty === currState.course.difficulty
					);
			} else {
				console.log("if not category");
				// currState.course.filterCategoryOrDifficulty = ["l", "f"];
				currState.course.filterCategoryOrDifficulty =
					currState.course.courses.filter(
						filterCourses =>
							filterCourses.study_mode === currState.course.study_mode &&
							filterCourses.degree === currState.course.degree &&
							filterCourses.semester === currState.course.semester &&
							filterCourses.difficulty === currState.course.difficulty
					);
			}

			return currState;
		},

		// FILTERED_CATEGORY_DIFFICULTY_COURSES: (currState) => {
		//     console.log('FILTERED_CATEGORY_DIFFICULTY_COURSES', currState)
		//
		//      if (currState.course.category !== null) {
		//             currState.course.filterCategoryOrDifficulty = currState.course.courses.filter(
		//                 filterCourses =>
		//                     filterCourses.study_mode === currState.course.study_mode &&
		//                     filterCourses.degree === currState.course.degree &&
		//                     filterCourses.semester === currState.course.semester &&
		//                     filterCourses.category === currState.course.category
		//             )
		//      } else if (currState.course.difficulty !== null) {
		//          currState.course.filterCategoryOrDifficulty = currState.course.courses.filter(
		//              filterCourses =>
		//                  filterCourses.study_mode === currState.course.study_mode &&
		//                  filterCourses.degree === currState.course.degree &&
		//                  filterCourses.semester === currState.course.semester &&
		//                  filterCourses.difficulty === currState.course.difficulty
		//          )
		//      }
		//
		//     return currState
		// }
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
