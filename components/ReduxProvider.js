"use client";

import { Provider } from "react-redux";
import { ReduxStore } from "../store/ReduxStore";

export default function ReduxProvider({ children }) {
  return <Provider store={ReduxStore}>{children}</Provider>;
}
