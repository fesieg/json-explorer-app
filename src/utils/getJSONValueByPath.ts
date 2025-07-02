import { JSONObject, JSONValue } from "../types/JSONTypes";

export function getJSONValueByPath(path: string, data: JSONObject): JSONValue {
  if (path.length === 0) {
    return data;
  }

  // regex to handle both "." and "[n]" (llm generated)
  const parts = path.match(/[^.\[\]]+/g) || [];

  // TODO: fix typing here
  let currentValue: any = data;

  for (const part of parts) {
    if (currentValue === null || currentValue === undefined) {
      return undefined;
    }

    currentValue = currentValue[part];
  }

  if (typeof currentValue === "boolean") {
    return JSON.stringify(currentValue);
  }

  return currentValue;
}
