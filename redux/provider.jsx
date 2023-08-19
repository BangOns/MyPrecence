"use client";
import { store } from "./store";
import { Provider } from "react-redux";

export const AddProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
