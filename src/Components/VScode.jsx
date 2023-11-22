import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [file, setFile] = useState();
  const [language, setLanguage] = useState("");
  const [syntaxErrors, setSyntaxErrors] = useState([]);
  const [output, setOutput] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const handleRunButtonClick = async () => {
    try {
      const response = await fetch(
        "https://python-3-code-compiler.p.rapidapi.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "5b5c4d4532msh2fa7a8250484ec3p129f3djsnad7e3e22ddc8",
            "X-RapidAPI-Host": "python-3-code-compiler.p.rapidapi.com",
          },
          body: JSON.stringify({
            code,
            version: "latest",
            input: null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const handleEditorChange = (newValue, e) => {
    try {
      new Function(newValue);
      setSyntaxErrors([]);
    } catch (error) {
      setSyntaxErrors([
        { message: error.message, lineNumber: error.lineNumber },
      ]);
    }
    setCode(newValue);
  };

  useEffect(() => {
    if (file) {
      var reader = new FileReader();
      reader.onload = async (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
      let newLanguage = "javascript";
      const extension = file.name.split(".").pop();
      if (["css", "html", "python", "dart"].includes(extension)) {
        newLanguage = extension;
      }
      setLanguage(newLanguage);
    }
  }, [file]);

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 15,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "300px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center">
              +
            </div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md 
      focus:outline-none focus:ring focus:border-lightgray-300 dark:bg-gray-800 dark:text-white"
            onClick={handleRunButtonClick}
          >
            Run
          </button>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Language</option>
              <option value="python">python</option>
              <option value="javascript">Javascript</option>
              <option value="c">c</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 1.414L10 10.414l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <hr />
        <MonacoEditor
          height="800"
          width="100%"
          language={language}
          value={code}
          options={options}
          theme="vs-dark"
          onChange={handleEditorChange}
        />
      </div>
      <div style={{ flex: 1, minWidth: "300px", marginTop: "30px" }}>
        {output && (
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Output:</h4>
              <pre>{output}</pre>
            </div>
          </div>
        )}

        {syntaxErrors.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h4 style={{ fontWeight: "bold", color: "red" }}>
                Syntax Errors:
              </h4>
              <ul>
                {syntaxErrors.map((error, index) => (
                  <li key={index}>
                    Line {error.lineNumber}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function VScode() {
  return (
    <>
      <div
        style={{
          padding: "20px",
          marginRight: "25px",
          marginLeft: "25px",
          backgroundColor: "#d3d3d3",
        }}
      >
        <CodeEditor />
      </div>
    </>
  );
}

export default VScode;
