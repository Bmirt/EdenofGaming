import React from "react";
import Auth from "../components/utils/AuthMethods";
export default React.createContext({
  user: Auth.getCurrentUser(),
  updateUserState: user=>{},
  updateAdminState: adminStatus=>{},
  logout: ()=>{},
});
