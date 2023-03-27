import axios from 'axios';
const URL_API = 'http://localhost/api/prompt'

export const makeRequest = async (message) => {
    console.log(message)
    const {data} = await axios.post(URL_API,message)
    return data;
}