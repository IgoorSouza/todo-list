export default function filterReducer(state = false, action) {
  switch (action.type) {
    case "updateFilter":
      return action.payload;

    default:
      return state;
  }
}
