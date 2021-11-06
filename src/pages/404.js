import React, { Component } from "react";
import { Link } from "gatsby";
import { StyledBackLink, StyledPage } from "./credits";
import { Helmet } from "react-helmet";

class NotFound extends Component {
    render() {
        return (
            <div>
                <StyledBackLink to="/">{`\u2190`} Back</StyledBackLink>
                <StyledPage>
                    <Helmet title="Page Not Found | stevenwa.sh" />
                    <h1>404: There is nothing here</h1>
                    <p>
                        <em>(TODO: Make a cute/silly 404 page)</em>
                    </p>
                    <p>
                        <Link to="/">Head back home</Link>
                    </p>
                </StyledPage>
            </div>
        )
    }
}

export default NotFound;