import React from "react";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import {
  BLOG_COLOR,
  TEXT_COLOR,
  LIGHT_SHADES,
  BG_COLOR,
  DARK_ACCENT
} from "../style";

const StyledHeader = styled.h3`
  background-color:${BLOG_COLOR}
  color:${LIGHT_SHADES};
  box-shadow:0 1px 5px rgba(0,0,0,0.4);
  position:relative;
  z-index:1;
  padding:${rhythm(1 / 2)} ${rhythm(1)}
  margin-bottom:0;
  transition:background 0.2s linear;
`;

const StyledContent = styled.div`
  background-color: ${LIGHT_SHADES};
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
`;

const StyledBox = styled.article`
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  margin-bottom: ${rhythm(1)};
  cursor: pointer;
  &:hover ${StyledHeader} {
    background-color: ${DARK_ACCENT};
  }
`;

export default ({ header, children, className }) => (
  <StyledBox className={className}>
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledContent>{children}</StyledContent>
  </StyledBox>
);
