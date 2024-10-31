export const setSubjectContext = async (provider, subject, dispatch) => {
  dispatch({ type: 'SET_SUBJECT', payload: subject });
  return;
};
export const clearSubjectContext = async (provider, subject, dispatch) => {
  dispatch({ type: 'SET_SUBJECT', payload: subject });
  return;
};

export const loadUserid = async (provider, user, dispatch) => {
  dispatch({ type: 'USER_LOADED', user });
  return;
};
