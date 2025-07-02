import React from "react";
import "./JSONExplorer.css";
import { JSONObject, JSONValue } from "../types/JSONTypes";

type JSONExplorerProps = {
  data: JSONObject | JSONValue[];
  handleSelect: (path: string) => void;
  path?: string;
  depth?: number;
};

export const JSONExplorer: React.FC<JSONExplorerProps> = ({
  data,
  handleSelect,
  path = "", // path for root object as default
  depth = 0,
}) => {
  if (Array.isArray(data)) {
    return (
      <>
        <span>[</span>
        {data.map((value, index) => {
          const itemPath = `${path}[${index}]`;
          const isObject = typeof value === "object" && value !== null;

          return (
            <div
              className="json-item"
              key={index}
              style={{ marginLeft: `${(depth + 1) * 20}px` }}
            >
              <strong
                className="json-item-key"
                onClick={() => handleSelect(itemPath)}
              >
                {index}
              </strong>
              :{" "}
              {isObject ? (
                <JSONExplorer
                  data={value}
                  depth={depth + 1}
                  handleSelect={handleSelect}
                  path={itemPath}
                />
              ) : (
                <span className="json-item-value">{JSON.stringify(value)}</span>
              )}
              {index < data.length - 1 && ","}
            </div>
          );
        })}
        <span style={{ marginLeft: `${depth * 20}px` }}>]</span>
      </>
    );
  }

  const keys = Object.keys(data);
  return (
    <>
      <span>{"{"}</span>
      {keys.map((key, index) => {
        const value = data[key];
        const propPath = path ? `${path}.${key}` : key;
        const isObject = typeof value === "object" && value !== null;

        return (
          <div
            className="json-item"
            key={key}
            style={{ marginLeft: `${(depth + 1) * 15}px` }}
          >
            <strong
              className="json-item-key"
              onClick={() => handleSelect(propPath)}
            >
              "{key}"
            </strong>
            :{" "}
            {isObject ? (
              <JSONExplorer
                data={value}
                depth={depth + 1}
                handleSelect={handleSelect}
                path={propPath}
              />
            ) : (
              <span className="json-item-value">{JSON.stringify(value)}</span>
            )}
            {index < keys.length - 1 && ","}
          </div>
        );
      })}
      <span style={{ marginLeft: `${(depth + 1) * 15}px` }}>{"}"}</span>
    </>
  );
};
