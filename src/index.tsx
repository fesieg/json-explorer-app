import { render } from "react-dom";

import { JSONViewer } from "./JSONViewer";

const data = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
  ],
};

const rootElement = document.getElementById("root");
render(<JSONViewer data={data} />, rootElement);
