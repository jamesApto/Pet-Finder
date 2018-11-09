export default function locationReducer(state = "Denver, CO", action) {
  if (action.type === 'SET_LOCATION') {
    return action.payload;
  } else {
    return state;
  }
};