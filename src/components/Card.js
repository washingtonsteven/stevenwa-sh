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
  box_shadow,
  transition,
  LIGHT_ACCENT,
  MAIN_COLOR,
  BORDER_GRADIENT,
  border_gradient,
  DARK_SHADE
} from "../style";

const StyledHeader = styled.h3`
  position: relative;
  z-index: 1;
  padding: ${props => (props.cardHasDate ? 0 : rhythm(1))} ${rhythm(2)}
    ${rhythm(1 / 2)};
  margin-bottom: 0;
`;

const StyledContent = styled.div`
  padding: ${rhythm(1)} ${rhythm(2)};
  color: ${props => props.color || "inherit"};
`;

const StyledBox = styled.article`
  box-shadow: ${BOX_SHADOW};
  background-color: white;
  margin-bottom: ${rhythm(2.5)};
  border-${props => props.direction || "left"}: solid 3px ${props =>
  props.color || LIGHT_ACCENT};
  ${props => (props.disableBorder ? "border:none" : "")}
  position:relative;
  transition:box-shadow 0.2s linear;
  &:before {
    content:"";
    display:block;
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:3px;
    background:${border_gradient("bottom")};
    opacity:0;
    transition:opacity 0.2s linear;
    transform:translateX(-100%);
  }
  &:hover {
    box-shadow:${box_shadow({ y: 5, c: "rgba(0,0,0,0.24)" })};
    &:before {
      opacity:1
    }
  }

  a { text-decoration:none; &:hover{ text-decoration:underline; } }
`;

const StyledDate = styled.div`
  color: #333;
  font-style: italic;
  font-size: 0.7rem;
  padding: ${rhythm(1 / 2)} ${rhythm(2)};
  a {
    color: #333;
  }
`;

const styleImage = Image => styled(Image)`
  &,
  & > a,
  & > a svg,
  & > a img {
    display: block;
    max-width: 100%;
  }
`;

export default ({
  header,
  image,
  children,
  direction,
  color = MAIN_COLOR,
  hoverColor,
  disableBorder,
  className,
  date
}) => (
  <StyledBox
    className={className}
    direction={direction}
    color={color}
    hoverColor={hoverColor}
    disableBorder={disableBorder}
  >
    {image && React.createElement(styleImage(image))}
    {date && <StyledDate>{date}</StyledDate>}
    {header && <StyledHeader cardHasDate={date}>{header}</StyledHeader>}
    <StyledContent>{children}</StyledContent>
  </StyledBox>
);
