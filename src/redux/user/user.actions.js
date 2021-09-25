export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',// use capital snake case because the type should never change
    payload: user
});