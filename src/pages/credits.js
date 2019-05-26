import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { BOX_SHADOW, MAX_WIDTH } from "../style";
import { Link } from "gatsby";

const StyledPage = styled.div`
  background-color: white;
  margin: 35px 20px;
  box-shadow: ${BOX_SHADOW};
  padding: 20px;
  max-width: ${MAX_WIDTH};
`;

const CreditLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})``;

const StyledBackLink = styled(Link)`
  padding: 5px 15px;
  background-color: white;
  box-shadow: ${BOX_SHADOW};
  margin-left: 20px;
`;

class Credits extends Component {
  render() {
    return (
      <div>
        <StyledBackLink to="/">{`\u2190`} Back</StyledBackLink>
        <StyledPage>
          <Helmet title="credits | stevenwa.sh" />
          <h1>Credits</h1>
          <p>
            These are some of the technologies and people that have helped to
            build this site:
          </p>
          <section>
            <h2>People</h2>
            <ul>
              <li>
                Illustration of my face commissioned from DaisyEin:{" "}
                <CreditLink href="https://twitter.com/daisyein">
                  Twitter
                </CreditLink>{" "}
                <CreditLink href="https://patreon.com/daisyein">
                  Patreon
                </CreditLink>
              </li>
              <li>
                All photos used in posts are credited within the post itself
                <br />
                If a photo doesn't have a credit, it was taken/screenshotted by
                me.
              </li>
            </ul>
          </section>
          <section>
            <h2>Technology</h2>
            <ul>
              <li>
                Built with{" "}
                <CreditLink href="https://gatsbyjs.org">GatsbyJS</CreditLink>
                <ul>
                  <li>
                    You can view the source for this site on{" "}
                    <CreditLink href="https://github.com/washingtonsteven/joyous-jackal">
                      Github.
                    </CreditLink>
                  </li>
                </ul>
              </li>
              <li>
                Hosted on{" "}
                <CreditLink href="https://netlify.com">Netlify</CreditLink>
              </li>
            </ul>
          </section>
        </StyledPage>
      </div>
    );
  }
}

export default Credits;
