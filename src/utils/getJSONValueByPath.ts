import { JSONObject, JSONValue } from "../types/JSONTypes";

export function getJSONValueByPath(path: string, data: JSONObject): JSONValue {
  if (path.length === 0) {
    return data;
  }

  // regex to handle both "." and "[n]" (llm generated)
  const parts = path.match(/[^.\[\]]+/g) || [];

  let currentValue: JSONValue | JSONObject = data;

  for (const part of parts) {
    if (currentValue === null || currentValue === undefined) {
      return undefined;
    }

    if (typeof currentValue === "object" && !Array.isArray(currentValue)) {
      currentValue = currentValue[part];
    } else {
      return undefined;
    } 
  }

  return currentValue;
}
