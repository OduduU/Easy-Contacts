const setAuthToken = () => {

    let token;

    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
    }

    return {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };

};

export default setAuthToken;