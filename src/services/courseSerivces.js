import Axios from '../axios-request'

export const fetchCourses = () => {
    return Axios.get('courses')
        .then(
            (response) => {
                console.log('response before sending to app js of courses is : ', response)
                return response.data
            }
        )
}