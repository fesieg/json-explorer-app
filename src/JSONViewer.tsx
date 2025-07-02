import "./styles.css";
import { JSONExplorer } from "./components/JSONExplorer";
import { useEffect, useState } from "react";
import { getJSONValueByPath } from "./utils/getJSONValueByPath";
import { JSONObject } from "./types/JSONTypes";

export const JSONViewer: React.FC<{ data: JSONObject }> = ({ data }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<any>(undefined);

  const handleSelect = (path: string) => {
    setSelectedPath(path);
  };

  useEffect(() => {
    if (selectedPath) {
      const foundValue = getJSONValueByPath(selectedPath, data);
      setSelectedValue(JSON.stringify(foundValue));
    }
  }, [selectedPath]);

  return (
    <div className="app">
      <h2>Interactive JSON Viewer</h2>
      <div>
        <p>
          <strong>Path:</strong>
          <input
            type="text"
            value={selectedPath ?? ""}
            onChange={(e) => setSelectedPath(e.target.value)}
            placeholder="foo.bar"
          ></input>
        </p>
        <pre>
          <strong>Value:</strong>
          {selectedValue !== undefined ? (
            <span>{selectedValue}</span>
          ) : (
            <span>undefined</span>
          )}{" "}
        </pre>
      </div>
      <div className="json-area">
        <JSONExplorer data={data} handleSelect={handleSelect} />
      </div>
    </div>
  );
};
