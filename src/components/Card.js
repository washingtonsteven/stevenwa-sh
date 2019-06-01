import React from "react";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import {
  BOX_SHADOW,
  BOX_SHADOW_HOVER,
  LIGHT_ACCENT,
  LIGHTER_ACCENT,
  MAIN_COLOR,
  border_gradient,
  animateIn
} from "../style";

const StyledHeader = styled.h3`
  position: relative;
  z-index: 1;
  padding: ${props =>
    `${props.cardHasDate ? 0 : rhythm(1)} ${rhythm(2)} ${rhythm(1 / 2)}`};
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
  ${props =>
    `border-${props.direction || "left"}: solid 3px ${props.color ||
      LIGHT_ACCENT}`};
  ${props => (props.disableBorder ? "border:none" : "")};
  position: relative;
  transition: box-shadow 0.2s linear;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background: ${border_gradient("bottom")};
    opacity: 0;
    transition: opacity 0.2s linear;
    transform: translateX(-100%);
  }
  &:hover {
    box-shadow: ${props =>
      props.disableHover ? BOX_SHADOW : BOX_SHADOW_HOVER};
    &:before {
      opacity: ${props => (props.disableBorder ? 0 : 1)};
    }
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  p {
    a {
      text-decoration: underline;

      &:hover {
        color: ${LIGHTER_ACCENT};
      }
    }
  }

  opacity: ${props => (props.disableAnimation ? 1 : 0)};

  &.on-screen {
    animation: ${animateIn} 0.3s ease-in-out forwards;
    ${props => props.disableAnimation && "animation:none;"}
  }
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
    this.state = {
      onScreen: false
    };
  }
  componentDidMount() {
    if (this.innerRef && this.innerRef.current) {
      let options = { threshold: 0.3 };
      this.observer = new IntersectionObserver(observed => {
        observed.forEach(el => {
          if (el.isIntersecting && !this.state.onScreen) {
            this.setState(state => ({ ...state, onScreen: true }));
          }
        });
      }, options);
      this.observer.observe(this.innerRef.current);
    }
  }
  componentWillUnmount() {
    if (
      this.observer &&
      typeof this.observer.unobserver === "function" &&
      this.innerRef &&
      this.innerRef.current
    ) {
      this.observer.unobserve(this.innerRef.current);
    }
  }
  render() {
    const {
      header,
      image,
      children,
      direction,
      color = MAIN_COLOR,
      hoverColor,
      disableAnimation,
      disableHover,
      className,
      date
    } = this.props;

    return (
      <StyledBox
        className={`${className || ""} ${
          this.state.onScreen ? "on-screen" : "off-screen"
        }`}
        direction={direction}
        color={color}
        hoverColor={hoverColor}
        disableBorder={true}
        disableHover={disableHover}
        disableAnimation={disableAnimation}
        ref={this.innerRef}
      >
        {image && React.createElement(styleImage(image))}
        {date && <StyledDate>{date}</StyledDate>}
        {header && <StyledHeader cardHasDate={date}>{header}</StyledHeader>}
        {children && <StyledContent>{children}</StyledContent>}
      </StyledBox>
    );
  }
}
