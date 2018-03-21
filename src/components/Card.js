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
  position: relative;
  z-index: 1;
  padding: ${props => (props.cardHasDate ? 0 : rhythm(1 / 2))} ${rhythm(1)}
    ${rhythm(1 / 2)};
  margin-bottom: 0;
`;

const StyledContent = styled.div`
  padding: ${rhythm(1 / 2)} ${rhythm(1)};
  color: ${props => props.color || "inherit"};
`;

const StyledBox = styled.article`
  box-shadow: ${BOX_SHADOW};
  background-color: white;
  margin-bottom: ${rhythm(1)};
  border-${props => props.direction || "top"}: solid 8px ${props =>
  props.color || LIGHT_ACCENT};
  ${props => (props.disableBorder ? "border:none" : "")}
  border-radius:0.3rem;
  position:relative;
  &:before {
    content:"";
    display:block;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:8px;
    background:${border_gradient("right")};
    opacity:0;
    transition:opacity 0.2s linear;
    transform:translateY(-100%);
    border-top-left-radius:0.3rem;
    border-top-right-radius:0.3rem;
  }
  &:hover {
    &:before {
      opacity:1
    }
  }

  a { text-decoration:none; &:hover{ text-decoration:underline; } }
`;

const StyledDate = styled.div`
  color: #aaa;
  font-style: italic;
  font-size: 0.7rem;
  padding: ${rhythm(1 / 4)} ${rhythm(1)};
  a {
    color: #aaa;
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
  color,
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
