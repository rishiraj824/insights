import React from "react";
import "./style.css";

export default ({ match }) => <h1>{match.params.id}</h1>;
