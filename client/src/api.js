const URL = "http://localhost:3001/api/v1";

export async function userLogin(credentials) {
    try {
        const response = await fetch(URL + "/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message, response.status);
        }
        const data = await response.json();
        return data.body;
    } catch (error) {
        throw new Error(error.message, error.status);
    }
}

export async function getUserProfile(token) {
    try {
        const response = await fetch(URL + "/user/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText, response.status);
        }
        const data = await response.json();
        return data.body;
    } catch (error) {
        throw new Error(error.message, error.status);
    }
}

export async function updateUserProfile(token, user) {
    try {
        const response = await fetch(URL + "/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(response.statusText, response.status);
        }
        const data = await response.json();
        return data.body;
    } catch (error) {
        throw new Error(error.message, error.status);
    }
}