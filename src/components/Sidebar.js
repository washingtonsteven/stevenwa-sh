import React from "react";
import Link from "gatsby-link";
import BoxWithHeader from "./BoxWithHeader";
import { DARK_SHADE, LIGHT_ACCENT, LIGHT_SHADE, MAIN_COLOR } from "../style";

class Sidebar extends React.Component {
  render() {
    return (
      <BoxWithHeader
        className={this.props.className}
        header={<Link to="/">Home</Link>}
        hoverColor={DARK_SHADE}
      >
        Sidebar Content
      </BoxWithHeader>
    );
  }
}

export default Sidebar;
