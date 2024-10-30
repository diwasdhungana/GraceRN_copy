export const provider = (state = { subject: null, user: {} }, action) => {
  switch (action.type) {
    case 'SET_SUBJECT':
      return { ...state, subject: action.payload };
    case 'USER_LOADED':
      return { ...state, user: action.user };
    default:
      return state;
  }
};
