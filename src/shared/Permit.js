import React from "react";
import { apiKey } from "./firebase";
import { useSelector } from "react-redux";

function Permit({ children }) {
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return <>{children}</>;
  }
  return null;
}

export default Permit;
