import React from "react";

import Header from "./../../components/Header";
import Entry from "./../../components/Entry";
import Thanks from "./../../components/Thanks";
import "./../../assets/app.css";

const App = () => (
  <div>
    <Header title="Show your thanks!" />
    <Entry />
    <Thanks />
  </div>
);

export default App;
