import React from "react";
import BoxWithHeader from "./BoxWithHeader";

class Sidebar extends React.Component {
  render() {
    return (
      <BoxWithHeader className={this.props.className} header="Sidebar">
        Sidebar Content
      </BoxWithHeader>
    );
  }
}

export default Sidebar;
