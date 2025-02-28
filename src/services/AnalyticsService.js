import axios from 'axios'

const apiUrl = "http://localhost:3001/"


async function getAnalyticsCount() {
    try {
        const response = await axios.get(`${apiUrl}analytics/users/count`);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

async function getAnalyticsTredns() {
    try {
        const response = await axios.get(`${apiUrl}analytics/users/trends`);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

async function getAnalyticsActivity() {
    try {
        const response = await axios.get(`${apiUrl}analytics/users/activity`);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}


export default { getAnalyticsCount,  getAnalyticsTredns, getAnalyticsActivity}
