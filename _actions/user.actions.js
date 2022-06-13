import userActionTypes from './user.actions.types';

const changeloggedIn = (isLoggedIn, user) => (dispatch) => {
  dispatch({
    type: userActionTypes.LOGIN_SUCCESS,
    payload: { isLoggedIn, userData: user },
  });
};
export default changeloggedIn;
