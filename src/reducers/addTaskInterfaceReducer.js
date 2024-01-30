export default function addTaskInterfaceReducer(state = false, action) {
  switch (action.type) {
    case "toggleAddTaskInterface":
      return !state;

    default:
      return state;
  }
}
