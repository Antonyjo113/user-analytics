import axios from 'axios'

const apiUrl = "http://localhost:3001/"


async function userLogin(data) {
    try {
        console.log(apiUrl, data);
        const response = await axios.post(`${apiUrl}users/login`, data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error; 
    }
}




export default { userLogin}
