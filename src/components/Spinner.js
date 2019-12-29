import React from "react";
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class Spinner extends React.Component {

render() {
      return (
        <div className="DataLoadingContainer spinner">
        <h3 className="spinner-title">Wczytuję dane....</h3>
        <BeatLoader
          css={override}
          size={30}
          color={"#d87523"}
        />
      </div>
    )};

};
export default Spinner;