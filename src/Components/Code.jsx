import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import CodeDownloder from "./CodeDownloder";
const Code = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(""); // Added state to store the output
  const [language, setLanguage] = useState("python");
  const [themes, setthemes] = useState("vs-dark");
  const [input, setInput] = useState("");
  const [defaultcode, setdefaultcode] = useState("Hello World");

  const handleRunButtonClick = async () => {
    const url = "http://localhost:5000/execute"; // Replace with your actual API endpoint
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
        input,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();

      if (result && result.output) {
        setOutput(result.output);
      } else {
        setOutput("No output in the response.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };
  const handleEditorWillMount = (monaco) => {
    console.log("beforeMount: the monaco instance:", monaco);
  };

  const handleEditorValidation = (markers) => {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  };

  const handleEditorChange = (value) => {
    console.log(value);
    setCode(value);
  };

  useEffect(() => {
    const getDefaultCodeForLanguage = () => {
      switch (language) {
        case "python":
          setdefaultcode("print('Hello World')");
          break;
        case "javascript":
          setdefaultcode("// JavaScript Compiler ");
          break;
        case "java":
          setdefaultcode("// Java Compiler");
          setdefaultcode("public static void main ");
          setdefaultcode("");
          setdefaultcode("public static void main");

          break;
        case "c++":
          setdefaultcode("// C++ Compiler");
          break;
        default:
          return "";
      }
    };
    console.log(language);
    getDefaultCodeForLanguage();
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const themeHandler = (T) => {
    setthemes(T.target.value);
  };

  return (
    <>
      <div className="flex">
        <nav className="bg-white-800 p-3 flex">
          <div className="container mx-auto flex items-center">
            <select
              value={themes}
              onChange={themeHandler}
              className="border border-black text-black py-2 px-4 rounded"
              style={{
                backgroundColor: "white",
                borderWidth: "2px",
                fontWeight: "bolder",
                marginLeft: "10%",
              }}
            >
              <option value="vs-dark">vs-dark</option>
              <option value="hc-black">hc-black</option>
              <option value="hc-light">hc-light</option>
              <option value="vs">light</option>
            </select>
          </div>

          <div className="container mx-auto flex items-center">
            <select
              onChange={handleLanguageChange}
              value={language}
              className="border border-black text-black py-2 px-4 rounded"
              style={{
                backgroundColor: "white",
                borderWidth: "2px",

                fontWeight: "bolder",
                marginLeft: "20%",
              }}
            >
              <option value="python">python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">c++</option>
              <option value="c">c</option>
            </select>
          </div>
        </nav>
      </div>
      <div className="flex">
        <div
          style={{ backgroundColor: "black", marginLeft: "10px" }}
          className="w-3/4 p-4 rounded-lg"
        >
          <Editor
            height="80vh"
            theme={themes}
            value={code ? code : defaultcode}
            language={language}
            defaultValue={defaultcode}
            onChange={handleEditorChange}
            onMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
          />
        </div>
        <div className="w-1/4 p-4 bg-gray rounded-lg">
          <h1 style={{ fontFamily: "bold", fontSize: "large" }}>Output</h1>
          <div
            style={{
              backgroundColor: "#1e293b",
              height: "35vh",
              borderRadius: "5px",
            }}
            className="container bg-gray "
          >
            <div style={{ padding: "10px", color: "#00c500" }}>{output}</div>
          </div>
          <div>
            <h1 style={{ fontFamily: "bold", fontSize: "large" }}>Input</h1>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input here..."
              name=""
              id=""
              cols="50"
              rows="10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                borderRadius: "3px",
                border: "2px solid black",
                resize: "none",
              }}
            ></textarea>
          </div>
          <button
            style={{
              float: "right",
              margin: "10px",
              borderWidth: "3px",
            }}
            className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-black rounded shadow"
            onClick={handleRunButtonClick}
          >
            Compile and Execute
          </button>
          <CodeDownloder
            code={code}
            style={{
              marginTop: "10px",
            }}
          />
          ;
        </div>
      </div>
    </>
  );
};

export default Code;
