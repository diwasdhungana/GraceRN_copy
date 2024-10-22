export const provider = (state = { subject: null }, action) => {
  switch (action.type) {
    case 'SET_SUBJECT':
      return { ...state, subject: action.payload };
    default:
      return state;
  }
};
