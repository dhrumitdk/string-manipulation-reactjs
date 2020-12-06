import React from "react";
import "./Output.css";

function Output({ finalSentence }) {
  return (
    <div className="Output">
      <b> Output:- </b>
      <p> {finalSentence} </p>
    </div>
  );
}

export default Output;
