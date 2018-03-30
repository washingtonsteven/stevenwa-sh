import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
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
  LIGHT_SHADE,
  MAIN_COLOR,
  DARK_ACCENT,
  BORDER_GRADIENT,
  LIGHT_ACCENT,
  MOBILE_WIDTH
} from "../style";

import Logo from "./logo.svg";

import prism from "./prism.css";

const StyledTemplate = styled.div`
  width: 100%;
  font-family: ${TEXT_FONT};
  line-height: 1.4;
  color: ${TEXT_COLOR};
  background-color: ${LIGHT_SHADE};
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100vh;
    min-width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: skew(45deg) translateX(-100%);
    transform-origin: top left;
    background: ${props => props.color || MAIN_COLOR};
    z-index: 0;
  }

  & > * {
    z-index: 1;
    position: relative;
  }

  *:not(pre) > code[class*="language-"] {
    padding: 0.1em 0.5em;
  }
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
    fill: ${props => props.color || MAIN_COLOR};
    transition: ${transition("opacity")};
  }
`;

const StyledNav = styled.nav`
  width: 100%;
  box-shadow: ${BOX_SHADOW};
  background-color: ${props => props.color || MAIN_COLOR}
  margin-bottom: ${rhythm(1)};
  position: sticky;
  top: 0;
  z-index: 10;


  &:hover svg rect.gradient {
    opacity: 1;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    position: relative;
  }
`;

const StyledFooter = styled.footer`
  background-color: white;
  box-shadow: ${box_shadow()};
  display: inline-block;
  text-align: center;
  margin: 0 auto 60px;
  padding: 30px 50px;
  position: absolute;
  left: 50%;
  top: auto;
  transform: translateX(-50%);
  width: calc(100% - ${rhythm(2)});
  max-width: calc(${MAX_WIDTH} - ${rhythm(2)});
`;

const CopyLine = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`;

const LinksLine = styled.ul`
  color: #aaa;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;

  & li {
    display: inline-block;
    margin-right: 10px;
    a {
      color: #aaa;
      text-decoration: underline;
    }
  }
`;

class Template extends React.Component {
  state = { color: LIGHT_ACCENT, backgroundColor: DARK_SHADE };
  updatePageColor = color => this.setState(state => ({ ...state, color }));
  updateBackgroundColor = backgroundColor =>
    this.setState(state => ({ ...state, backgroundColor }));
  render() {
    const { location, children, data } = this.props;
    const twitter = get(data, "site.siteMetadata.twitter");
    const github = get(data, "site.siteMetadata.github");
    const social = { twitter, github };

    return (
      <StyledTemplate color={this.state.backgroundColor || this.state.color}>
        <Helmet>
          <link rel="logo" href="/favicon.png" type="image/x-icon" />
        </Helmet>
        <StyledNav color={this.state.color}>
          <Link to="/">
            <StyledLogo color={this.state.color} />
          </Link>
        </StyledNav>
        <StyledMain>
          {children({
            ...this.props,
            updatePageColor: this.updatePageColor,
            updateBackgroundColor: this.updateBackgroundColor
          })}
        </StyledMain>
        <StyledFooter>
          <LinksLine>
            {Object.entries(social).map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {name.charAt(0).toUpperCase() + name.substr(1)}
                </a>
              </li>
            ))}
          </LinksLine>
          <CopyLine>
            Copyright {"\u00a9"} {new Date().getFullYear()} Steven Washington
          </CopyLine>
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

export const siteMetaFragment = graphql`
  fragment siteMeta on RootQueryType {
    site {
      siteMetadata {
        title
        author
        twitter
        github
      }
    }
  }

  fragment postListData on MarkdownRemarkConnection {
    edges {
      node {
        id
        excerpt
        fileAbsolutePath
        frontmatter {
          path
          title
          date(formatString: "MMMM DD, YYYY")
          featured_image {
            publicURL
          }
          featured
        }
      }
    }
  }

  query SiteInfo {
    site {
      siteMetadata {
        twitter
        github
        title
        author
      }
    }
  }
`;
