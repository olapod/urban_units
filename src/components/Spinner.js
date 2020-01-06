import React from "react";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class Spinner extends React.Component {

render() {
      return (
        <div className="DataLoadingContainer spinner">
        <SyncLoader
          css={override}
          size={50}
          color={"#3f51b5"}
        />
        <h3 className="spinner-title">Porównuję bazy danych....</h3>
      </div>
    )};

};
export default Spinner;