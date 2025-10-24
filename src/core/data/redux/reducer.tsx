import initialState from "./initial.values";

interface Action {
  type: string;
  payload?: any;
}

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "HEADER_DATA":
      return { ...state, header_data: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
