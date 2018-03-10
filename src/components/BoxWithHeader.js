import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import { rhythm } from "../utils/typography";
import {
  BLOG_COLOR,
  TEXT_COLOR,
  LIGHT_SHADE,
  BG_COLOR,
  DARK_ACCENT
} from "../style";

const StyledHeader = styled.h3`
  background-color:${props => props.backgroundColor || BLOG_COLOR}
  color:${props => props.color || LIGHT_SHADE};
  box-shadow:0 1px 5px rgba(0,0,0,0.4);
  position:relative;
  z-index:1;
  padding:${rhythm(1 / 2)} ${rhythm(1)}
  margin-bottom:0;
  transition:background 0.2s linear;
`;

const StyledContent = styled.div`
  background-color: ${props => props.backgroundColor || LIGHT_SHADE};
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
  color: ${props => props.color || "inherit"};
`;

const StyledBox = styled.article`
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  margin-bottom: ${rhythm(1)};
  cursor: pointer;
  &:hover ${StyledHeader} {
    background-color: ${props =>
      get(props, "headerHoverStyle.backgroundColor") || ""};
    color: ${props => get(props, "headerHoverStyle.color") || ""};
  }
`;

export default ({ header = {}, body = {}, children, className }) => (
  <StyledBox className={className} headerHoverStyle={header.hover}>
    {header && (
      <StyledHeader
        backgroundColor={header.backgroundColor}
        color={header.color}
      >
        {header.text || header}
      </StyledHeader>
    )}
    <StyledContent color={body.color} backgroundColor={body.backgroundColor}>
      {children}
    </StyledContent>
  </StyledBox>
);
