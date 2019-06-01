import React, { Component } from "react";
import Card from "./Card";
import styled from "styled-components";
import {
  LIGHTER_ACCENT,
  DARKER_ACCENT,
  LIGHT_SHADE,
  BOX_SHADOW,
  BOX_SHADOW_HOVER
} from "../style";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";

const HeaderCard = styled(Card)`
  background-color: ${LIGHTER_ACCENT};
  color: ${LIGHT_SHADE};
  text-align: center;
  margin-bottom: 0;
  position: relative;
  z-index: 2;

  h1 {
    margin: 0;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: ${rhythm(2.5)};
`;

const SubLinkContainer = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.disableEverything ? "1fr" : "1fr 1fr"};
  align-items: center;
  justify-items: center;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: -5px;
  z-index: 1;

  a {
    display: block;
    background-color: ${LIGHT_SHADE};
    color: ${DARKER_ACCENT};
    font-weight: normal;
    padding: 5px 25px;
    box-shadow: ${BOX_SHADOW};
    transition: box-shadow 0.3s linear;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      box-shadow: ${BOX_SHADOW_HOVER};
    }
  }
`;

class BlogListHeader extends Component {
  render() {
    if (!this.props.title) return null;

    return (
      <StyledHeader>
        <HeaderCard disableAnimation disableHover>
          <h1>{this.props.title}</h1>
        </HeaderCard>
        <SubLinkContainer disableEverything={this.props.disableEverything}>
          <Link to="/">Home</Link>
          {!this.props.disableEverything && (
            <Link to="/everything">All Posts</Link>
          )}
        </SubLinkContainer>
      </StyledHeader>
    );
  }
}

export default BlogListHeader;
