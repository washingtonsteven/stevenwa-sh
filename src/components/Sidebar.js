import React from "react";
import BoxWithHeader from "./BoxWithHeader";
import { DARK_SHADE, LIGHT_ACCENT, LIGHT_SHADE, MAIN_COLOR } from "../style";

class Sidebar extends React.Component {
  render() {
    return (
      <BoxWithHeader
        className={this.props.className}
        header={{
          text: "Sidebar",
          backgroundColor: MAIN_COLOR,
          color: DARK_SHADE,
          hover: {
            backgroundColor: LIGHT_ACCENT,
            color: LIGHT_SHADE
          }
        }}
        body={{
          color: LIGHT_SHADE,
          backgroundColor: LIGHT_ACCENT
        }}
      >
        Sidebar Content
      </BoxWithHeader>
    );
  }
}

export default Sidebar;
