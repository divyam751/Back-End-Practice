import { type } from "@testing-library/user-event/dist/type";
import React, { useReducer } from "react";

const Counter = () => {
  const initialState = { count: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return state.count + 1;
      case "decrement":
        return state.count - 1;
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <div>Counter

<button onClick={()=>dispatch({type : "increment"})}>+</button>
<button onClick={()=>dispatch({type : "decrement"})}>-</button>
  </div>;
};

export default Counter;
