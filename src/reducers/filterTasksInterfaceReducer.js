export default function FilterTasksInterfaceReducer(state = false, action) {
  switch (action.type) {
    case "toggleFilterTasksInterface":
      return !state;

    default:
      return state;
  }
}
