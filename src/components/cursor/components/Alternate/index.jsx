import React, { createElement, useContext } from "react";
import AlternateContext from "../../utils/alternateContext";

export default function Alternate(props) {
  const { children } = props;
  const Alternates = useContext(AlternateContext);
  console.log(children);

  return children;
}
