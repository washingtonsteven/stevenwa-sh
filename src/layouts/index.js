import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import {
  MAX_WIDTH,
  TEXT_COLOR,
  TEXT_FONT,
  BG_COLOR,
  DARK_SHADE,
  BOX_SHADOW,
  box_shadow,
  transition,
  LIGHT_SHADE,
  MAIN_COLOR,
  DARK_ACCENT,
  BORDER_GRADIENT,
  LIGHT_ACCENT
} from "../style";

import Logo from "./logo.svg";

const StyledTemplate = styled.div`
  width: 100%;
  font-family: ${TEXT_FONT};
  line-height: 1.4;
  color: ${TEXT_COLOR};
  background-color: ${LIGHT_SHADE};
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: skew(45deg) translateX(-100%);
    transform-origin: top left;
    background: ${props => props.color || MAIN_COLOR};
    z-index: 0;
  }

  & > * {
    z-index: 1;
    position: relative;
  }
`;

const StyledMain = styled.main`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
`;

const StyledLogo = styled(Logo)`
  max-width: 150px;
  vertical-align: top;
  & rect {
    fill: ${props => props.color || MAIN_COLOR};
    transition: ${transition("opacity")};
  }
  &:hover rect.gradient {
    opacity: 1;
  }
`;

const StyledNav = styled.nav`
  width: 100%;
  box-shadow: ${BOX_SHADOW};
  margin-bottom: ${rhythm(1)};
  background-color: white;
`;

const StyledFooter = styled.footer`
  min-height: 250px;
  background-color: white;
  box-shadow: ${box_shadow({ y: -4 })};
`;

class Template extends React.Component {
  state = { color: LIGHT_ACCENT, backgroundColor: DARK_ACCENT };
  updatePageColor = color => this.setState(state => ({ ...state, color }));
  updateBackgroundColor = backgroundColor =>
    this.setState(state => ({ ...state, backgroundColor }));
  render() {
    const { location, children } = this.props;
    return (
      <StyledTemplate color={this.state.backgroundColor || this.state.color}>
        <StyledNav>
          <Link to="/">
            <StyledLogo color={this.state.color} />
          </Link>
        </StyledNav>
        <StyledMain>
          {children({
            ...this.props,
            updatePageColor: this.updatePageColor,
            updateBackgroundColor: this.updateBackgroundColor
          })}
        </StyledMain>
        <StyledFooter>
          Copyright (c) {new Date().getFullYear()} Steven Washington
        </StyledFooter>
      </StyledTemplate>
    );
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
};

export default Template;
