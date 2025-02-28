import axios from 'axios'

const apiUrl = "http://localhost:3001/"


async function getallUsers() {
    try {
        const response = await axios.get(`${apiUrl}users`);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

async function createUser(data) {
    try {
        const response = await axios.post(`${apiUrl}users`, data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

async function updateUser(id, updatedData) {
    try {
        const response = await axios.put(`${apiUrl}users/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; 
    }
}

async function deleteUser(id) {
    try {
        const response = await axios.delete(`${apiUrl}users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export default { createUser,  getallUsers, updateUser, deleteUser}
