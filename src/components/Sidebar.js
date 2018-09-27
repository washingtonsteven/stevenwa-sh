import React from "react";
import Link from "gatsby-link";
import Card from "./Card";
import styled from "styled-components";
import {
  DARK_SHADE,
  LIGHT_ACCENT,
  LIGHT_SHADE,
  MAIN_COLOR,
  BOX_SHADOW,
  SOCIAL_ICON_GRAY,
  TWITTER_BLUE,
  GITHUB_BLACK,
  MOBILE_WIDTH
} from "../style";

import TwitterIcon from "./twitter.svg";
import GithubIcon from "./github.svg";
import Face from "./face.jpg";

const StyledCard = styled(Card)`
  margin-bottom: 0.7rem;
  display: grid;
  grid-template-areas: "image, content";
  grid-column-gap: 20px;
  padding: 0 20px;

  & > * {
    padding-left: 0;
    padding-right: 0;

    img {
      margin: 0 auto;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-areas: "image" "content";
    grid-column-cap: 0;

    img {
      width: 100px;
      margin: 0 auto;
    }
  }
`;

const StyledMoreLinks = styled.div`
  background-color: white;
  box-shadow: ${BOX_SHADOW};
  text-align: center;
  padding: 5px 20px;
  display: inline;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 150px;

  @media (max-width: ${MOBILE_WIDTH}) {
    position: static;
    transform: none;
    display: block;
    margin-bottom: 1.4rem;
  }
`;

const StyledSocialLink = styled.a.attrs({
  target: "_blank",
  rel: "noreferrer noopenter"
})`
  width: 25px;
  display: inline-block;
  margin: 0 15px;

  svg {
    max-width: 100%;
  }
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  rect {
    opacity: 0;
  }
  path {
    fill: ${SOCIAL_ICON_GRAY};
  }

  &:hover {
    path {
      fill: ${TWITTER_BLUE};
    }
  }
`;

const StyledGithubIcon = styled(GithubIcon)`
  path {
    fill: ${SOCIAL_ICON_GRAY};
  }

  &:hover {
    path {
      fill: ${GITHUB_BLACK};
    }
  }
`;

const StyledImage = styled.img`
  width: 100px;
  border-radius: 50%;
  border: solid 3px ${MAIN_COLOR};
  display: block;
  margin-bottom: 0;
`;

class Sidebar extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <StyledCard
          header={
            <Link to="/">
              <StyledImage src={Face} alt="stevenwas.sh - Steven Washington" />
            </Link>
          }
        >
          <p>Hi! I'm Steven Washington.</p>
          <p>I like making cool games and sites for the internet!</p>
        </StyledCard>
        <StyledMoreLinks>
          {this.props.social &&
            this.props.social.twitter && (
              <StyledSocialLink href={this.props.social.twitter} name="@esaevian on Twitter">
                <StyledTwitterIcon />
              </StyledSocialLink>
            )}
          {this.props.social &&
            this.props.social.github && (
              <StyledSocialLink href={this.props.social.github} name="washingtonsteven on Github">
                <StyledGithubIcon />
              </StyledSocialLink>
            )}
        </StyledMoreLinks>
      </div>
    );
  }
}

export default Sidebar;
