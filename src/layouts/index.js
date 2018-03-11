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
  LIGHT_SHADE
} from "../style";

import Logo from "./logo.svg";

const StyledTemplate = styled.div`
  width: 100%;
  font-family: ${TEXT_FONT};
  line-height: 1.4;
  color: ${TEXT_COLOR};
  background-color: ${LIGHT_SHADE};
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
    fill: ${props => props.color || DARK_SHADE};
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
  state = { color: DARK_SHADE };
  updateLogoColor = color => this.setState({ ...this.state, color });
  render() {
    const { location, children } = this.props;
    return (
      <StyledTemplate>
        <StyledNav>
          <Link to="/">
            <StyledLogo color={this.state.color} />
          </Link>
        </StyledNav>
        <StyledMain>
          {children({ ...this.props, updateLogoColor: this.updateLogoColor })}
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
