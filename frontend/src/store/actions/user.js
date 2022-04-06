export const loginUser = user => {
    return dispatch => dispatch({ type: 'SET_USER', user })
}

export const logoutUser = () => {
    return dispatch => dispatch({ type: 'SET_USER', user: {} })
}