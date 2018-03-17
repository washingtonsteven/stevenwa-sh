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
  GITHUB_BLACK
} from "../style";

import TwitterIcon from "./twitter.svg";
import GithubIcon from "./github.svg";

const StyledMoreLinks = styled.div`
  background-color: white;
  box-shadow: ${BOX_SHADOW};
  text-align: center;
  border-radius: 0.3rem;
  padding: 5px 20px;
  display: inline;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

class Sidebar extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className={this.props.className}>
        <Card header={<Link to="/">stevenwa.sh</Link>}>
          <p>Hi! I'm Steven Washington.</p>
          <p>I like making cool games and sites for the internet!</p>
        </Card>
        <StyledMoreLinks>
          {this.props.social &&
            this.props.social.twitter && (
              <StyledSocialLink href={this.props.social.twitter}>
                <StyledTwitterIcon />
              </StyledSocialLink>
            )}
          {this.props.social &&
            this.props.social.github && (
              <StyledSocialLink href={this.props.social.github}>
                <StyledGithubIcon />
              </StyledSocialLink>
            )}
        </StyledMoreLinks>
      </div>
    );
  }
}

export default Sidebar;
