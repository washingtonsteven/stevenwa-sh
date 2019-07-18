import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import {
  MAX_WIDTH,
  TEXT_COLOR,
  TEXT_FONT,
  BOX_SHADOW,
  box_shadow,
  transition,
  MAIN_COLOR,
  MOBILE_WIDTH,
  DARKER_ACCENT,
  LIGHT_ACCENT,
  growWide,
  slideOff
} from "../style";

import Logo from "./logo.svg";

import "./prism.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faFish,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(faEnvelope, fab, faFish, faArrowRight);

const StyledTemplate = styled.div`
  width: 100%;
  font-family: ${TEXT_FONT};
  line-height: 1.8;
  color: ${TEXT_COLOR};
  background-color: ${DARKER_ACCENT};
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    width: 100vh;
    min-width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: skew(45deg) translate3d(-100%, 100%, 0);
    transform-origin: top left;
    background: ${props => props.color || MAIN_COLOR};
    z-index: 0;
    animation: ${growWide} 0.5s 1s ease-in-out forwards;
  }
  &:after {
    content: "";
    display: none;
    width: 200vw;
    height: 200vh;
    position: fixed;
    top: 0;
    left: left;
    background: ${props => props.color || MAIN_COLOR};
    z-index: 10;
    transform-origin: top left;
    transform: skew(45deg) translate3d(-50%, -50%, 0);
    animation: ${slideOff} 1s ease-in-out forwards;
  }

  & > * {
    z-index: 1;
    position: relative;
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
  & rect:not(#letters) {
    fill: ${props => props.color || MAIN_COLOR};
    transition: ${transition("opacity")};
  }

  & #letters {
    transition: fill 0.3s ease-in-out;
  }

  &:hover #letters {
    fill: url(#rainbow);
  }
`;

const StyledNav = styled.nav`
  width: 100%;
  box-shadow: ${BOX_SHADOW};
  background-color: ${props => props.color || MAIN_COLOR};
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
  margin: 30px auto 60px;
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 ${rhythm(1)};
  & > div {
    background-color: white;
    box-shadow: ${box_shadow()};
    display: block;
    text-align: center;
    padding: 30px 50px;
  }
`;

const CopyLine = styled.div`
  color: #333;
  font-size: 0.8rem;
`;

const LinksLine = styled.ul`
  color: #333;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;

  & li {
    display: inline-block;
    margin-right: 10px;
    a {
      color: #333;
      text-decoration: underline;
    }
  }
`;

class Template extends React.Component {
  state = { color: MAIN_COLOR, backgroundColor: LIGHT_ACCENT };
  updatePageColor = color => this.setState(state => ({ ...state, color }));
  updateBackgroundColor = backgroundColor =>
    this.setState(state => ({ ...state, backgroundColor }));
  render() {
    const { children, data } = this.props;
    const twitter = get(data, "site.siteMetadata.twitter");
    const github = get(data, "site.siteMetadata.github");
    const social = { twitter, github };
    return (
      <StyledTemplate color={this.state.backgroundColor || this.state.color}>
        <Helmet>
          <html lang="en" />
          <meta
            name="description"
            content="stevenwa.sh - Steven Washington - Full Stack Developer"
          />
          <title>stevenwa.sh - Steven Washington</title>
          <link rel="logo" href="/favicon.png" type="image/x-icon" />
          <style type="text/css">{`
            #gatsby-noscript {
              text-align: center;
              display: block;
              margin: 0;
              display: none;
            }
          `}</style>
        </Helmet>
        <StyledNav color={this.state.color}>
          <Link to="/" style={{ display: "block" }}>
            <StyledLogo color={this.state.color} />
          </Link>
        </StyledNav>
        <StyledMain>{children}</StyledMain>
        <StyledFooter>
          <div>
            <LinksLine>
              {Object.entries(social).map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name.charAt(0).toUpperCase() + name.substr(1)}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/credits">Credits</Link>
              </li>
            </LinksLine>
            <CopyLine>
              Copyright {"\u00a9"} {new Date().getFullYear()} Steven Washington
            </CopyLine>
          </div>
        </StyledFooter>
      </StyledTemplate>
    );
  }
}

Template.propTypes = {
  location: PropTypes.object,
  route: PropTypes.object
};

export default Template;

export const siteMetaFragment = graphql`
  fragment siteMeta on Query {
    site {
      siteMetadata {
        title
        author
        twitter
        github
        description
      }
    }
  }

  fragment postListData on MarkdownRemarkConnection {
    edges {
      node {
        id
        excerpt(pruneLength: 140)
        fileAbsolutePath
        fields {
          post_slug
          post_type
        }
        frontmatter {
          path
          title
          date(formatString: "MMMM DD, YYYY")
          featured_image {
            publicURL
            childImageSharp {
              fluid(maxWidth: 470, maxHeight: 313) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          featured
          published
        }
      }
    }
  }
`;
