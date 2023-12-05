import { isEmpty } from "../../components/validation/is-empty";
import { SET_USER } from "../action/types";
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return{
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user:action.payload
      }
    default:
      return state;
  }
}
