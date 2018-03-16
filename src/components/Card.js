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
  LIGHT_ACCENT,
  BORDER_GRADIENT,
  border_gradient,
  DARK_SHADE
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
  background-color: white;
  overflow: hidden;
  margin-bottom: ${rhythm(1)};
  border-${props => props.direction || "top"}: solid 8px ${props =>
  props.color || LIGHT_ACCENT};
  transition:${transition("border")}
  ${props => (props.disableBorder ? "border:none" : "")}
  &:hover {
    border-color: ${props => props.hoverColor || DARK_SHADE};
    border-image: ${border_gradient("right")} 1;
  }
`;

const styleImage = Image => styled(Image)`
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
  disableBorder,
  className
}) => (
  <StyledBox
    className={className}
    direction={direction}
    color={color}
    hoverColor={hoverColor}
    disableBorder={disableBorder}
  >
    {image && React.createElement(styleImage(image))}
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledContent>{children}</StyledContent>
  </StyledBox>
);
