import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import { rhythm } from "../utils/typography";
import {
  BLOG_COLOR,
  TEXT_COLOR,
  LIGHT_SHADE,
  BG_COLOR,
  DARK_ACCENT,
  BOX_SHADOW,
  transition,
  LIGHT_ACCENT
} from "../style";

const StyledHeader = styled.h3`
  position:relative;
  z-index:1;
  padding:${rhythm(1 / 2)} ${rhythm(1)}
  margin-bottom:0;
`;

const StyledContent = styled.div`
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
  color: ${props => props.color || "inherit"};
`;

const StyledBox = styled.article`
  box-shadow: ${BOX_SHADOW};
  overflow: hidden;
  margin-bottom: ${rhythm(1)};
  border-${props => props.direction || "top"}: solid 6px ${props =>
  props.color || LIGHT_ACCENT};
  transition:${transition("border-color")}
  &:hover {
    border-color: ${props => props.hoverColor || LIGHT_ACCENT}
  }
`;

const styleImage = Image => styled(Image)`
  padding: ${rhythm(1 / 2)};
  display: block;
  max-width: 100%;
`;

export default ({
  header,
  image,
  children,
  direction,
  color,
  hoverColor,
  className
}) => (
  <StyledBox
    className={className}
    direction={direction}
    color={color}
    hoverColor={hoverColor}
  >
    {image && React.createElement(styleImage(image))}
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledContent>{children}</StyledContent>
  </StyledBox>
);
