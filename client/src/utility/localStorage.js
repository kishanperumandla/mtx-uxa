
// SET Access Toekn
export function setAccessTokenInLocalStorage(accessToken){
    localStorage.setItem('accessToken', accessToken)
}

//GET Access Toekn
export function getAccessTokenFromLocalStorage(){
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
}

//----------------------//




// SET Refresh Token
export function setRefreshTokenInLocalStorage(refreshToken){
    localStorage.setItem('refreshToken', refreshToken)
}

// GET Refresh Token
export function getRefreshTokenFromLocalStorage(){
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
}

//----------------------//






// SET Authorised User
export function setAuthUserInLocalStorage(authUser){
    localStorage.setItem('authUser', authUser)
}


// GET Authorised User
export function getAuthUserFromLocalStorage(){
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    return authUser;
}

//----------------------//






// CLEAR Local Storage
export function clearLocalStorage(){
    const accessToken = localStorage.delete('accessToken');    
}



