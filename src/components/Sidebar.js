import React from "react";
import Link from "gatsby-link";
import Card from "./Card";
import {
  DARK_SHADE,
  LIGHT_ACCENT,
  LIGHT_SHADE,
  MAIN_COLOR,
  BOX_SHADOW
} from "../style";

class Sidebar extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <Card className={this.props.className} header={`stevenwa.sh`}>
          <p>Hi! I'm Steven Washington.</p>
          <p>I like making cool games and sites for the internet!</p>
        </Card>
        <div
          style={{
            margin: "25px 0",
            width: "100%",
            backgroundColor: "white",
            boxShadow: `${BOX_SHADOW}`,
            textAlign: "center",
            borderRadius: "0.3rem"
          }}
        >
          More...
        </div>
      </div>
    );
  }
}

export default Sidebar;
