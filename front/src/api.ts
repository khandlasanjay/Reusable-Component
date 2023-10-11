// api.ts

import { clear } from "console";

const API_BASE_URL = 'http://192.168.3.150:3005';

export const fetchPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/userListing`);
    console.log("response ====================== ",response)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
