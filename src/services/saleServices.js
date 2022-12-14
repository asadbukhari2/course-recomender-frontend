import Axios from '../axios-request'

export const FetchSale = () => {
    return Axios.get('sale')
        .then((response) => {
            console.log('response in fetchSale is : ', response)
            return response.data
        })
}