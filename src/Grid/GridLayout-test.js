import React from "react";
import ReactDOM from "react-dom";
import GridLayout from "../Grid/GridLayout";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GridLayout></GridLayout>, div);
});
