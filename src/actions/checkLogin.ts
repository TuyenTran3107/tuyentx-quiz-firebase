import type { CheckLoginAction } from "../types"

export const checkLogin = (status: boolean): CheckLoginAction => {
  return {
    type: "CHECK_LOGIN",
    status: status
  }
}