import type { CheckLoginAction } from "../types";

const loginReducer = (state: boolean = false, action: CheckLoginAction) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return action.status;

    default:
      return state;
  }
}
export default loginReducer;