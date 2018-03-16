import React from "react";
import Link from "gatsby-link";
import Card from "./Card";
import { DARK_SHADE, LIGHT_ACCENT, LIGHT_SHADE, MAIN_COLOR } from "../style";

class Sidebar extends React.Component {
  render() {
    return (
      <Card className={this.props.className} header={`stevenwa.sh`}>
        <p>Hi! I'm Steven Washington.</p>
        <p>I like making cool games and sites for the internet!</p>
      </Card>
    );
  }
}

export default Sidebar;
