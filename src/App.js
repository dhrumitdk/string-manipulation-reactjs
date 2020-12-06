import React, { useState } from "react";
import "./App.css";
import { useFormik } from "formik";
import Output from "./components/Output";

// validate function for validating formik fields
const validate = (values) => {
  let errors = {};
  if (!values.inputString) {
    errors.inputString = "This field can't be empty.";
  }

  if (!values.skipVariableValue) {
    errors.skipVariableValue = "This field can't be empty.";
  }
  return errors;
};

function App() {
  // declaring state variables
  const [inputStringState, setInputStringState] = useState([]);
  const [skipVariableState, setSkipVariableState] = useState([]);
  const [finalSentenceState, setFinalSentenceState] = useState([]);

  // core logic goes here
  const coreLogic = () => {
    // assigning state variable values to local variables
    let string = inputStringState;
    let skipValue = skipVariableState;

    // splitting sentence from given regex
    let sentence = string.split(/(?=[$-/:-?{-~!"^_`\[\]])/);
    let finalSentence = "";
    let sentenceLength = sentence.length;

    // looping into the sentence
    for (let i = 0; i < sentenceLength - 1; i++) {
      let splittedSentence = "";

      // if index of i is not 0
      if (i !== 0) {
        splittedSentence = sentence[i].substring(1);
      } else splittedSentence = sentence[0];

      // splitting splittedSentence by space
      let arr = splittedSentence.split(" ");
      let tempArray = [];

      // looping on skip variable value
      for (let skip = 0; skip < skipValue && skip < arr.length; skip++) {
        // pushing elements of a to tempArray that gets popped
        tempArray.push(arr.pop());
      }
      arr.reverse();
      let arr1 = "";
      for (let j = 0; j < arr.length; j++) {
        arr1 = " " + arr1 + arr[j] + " ";
      }
      tempArray.reverse();

      for (let z = 0; z < tempArray.length; z++) {
        arr1 = arr1 + tempArray[z] + " ";
      }
      finalSentence = finalSentence + arr1.toString() + "|";
      console.log(finalSentence);
      setFinalSentenceState(finalSentence);
      // emptying variables again
      arr = [];
      arr1 = "";
      tempArray = [];
    }
  };

  // formik form
  const formik = useFormik({
    initialValues: {
      inputString: "",
      skipVariableValue: "",
    },

    // calls validate function
    validate,

    // onSubmit function
    onSubmit: (values) => {
      coreLogic();
    },
  });

  return (
    <div className="App">
      <header className="Header">
        <p> String Manipulation in React </p>
      </header>

      <main className="Main">
        <form onSubmit={formik.handleSubmit}>
          <label> Input String* </label> <br />
          <textarea
            type="text"
            name="inputString"
            onChange={formik.handleChange}
            value={formik.values.inputString}
          />
          {formik.errors.inputString ? (
            <div className="Error">{formik.errors.inputString}</div>
          ) : null}
          <br /> <br />
          <label> Skip Variable* </label>
          <input
            type="number"
            name="skipVariableValue"
            onChange={formik.handleChange}
            value={formik.values.skipVariableValue}
          />
          {formik.errors.skipVariableValue ? (
            <div className="Error">{formik.errors.skipVariableValue}</div>
          ) : null}
          <br />
          <button
            type="submit"
            onClick={() => {
              setInputStringState(formik.values.inputString);
              setSkipVariableState(formik.values.skipVariableValue);
            }}
          >
            Generate Output
          </button>
        </form>

        <Output finalSentence={finalSentenceState} />
      </main>
    </div>
  );
}

export default App;
