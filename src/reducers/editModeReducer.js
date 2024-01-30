const initialState = {
  enabled: false,
  task: null,
  taskIndex: null,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "setEditMode":
      return action.payload;

    default:
      return state;
  }
}
