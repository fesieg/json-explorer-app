export type JSONValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | Array<JSONValue>
  | JSONObject;

export type JSONObject = { [key: string]: JSONValue };
