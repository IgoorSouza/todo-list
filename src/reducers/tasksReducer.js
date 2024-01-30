export default function tasksReducer(state = [], action) {
  switch (action.type) {
    case "updateTasks":
      return action.payload;

    default:
      return state;
  }
}
