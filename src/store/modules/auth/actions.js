export function loginAction(currentUser, token) {
    return {
        type: '@auth/LOGIN',
        payload: { currentUser, token }
    }
}

export function logoutAction(currentUser, token) {
    return {
        type: '@auth/LOGOUT'
    }
}

export function updateUser(user) {
    return {
        type: '@auth/UPDATEUSER',
        payload: { user }
    }
}