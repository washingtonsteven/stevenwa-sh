---
title: "Not ready yet! - Geting Drafts functionality in Gatsby"
subtitle: "With some fanciness, you can work on and save drafts of posts in Gatsby"
date: 2018-03-31
path: /gatsby-drafts/
published: false
tags:
  - react
  - javascript
  - gatsbyjs
  - static sites
---

Nearly every CMS has a "drafts" functionality: you can work on and edit a post, even save it to work on later, but it doesn't show up on your site until you are ready. Even running headlessly, systems hooked up to [GatsbyJS][gatsby] should be able to have this functionality. 

However, if you are working off of Markdown files, and not an actual, managed content management system (like I am), this functionality is a bit tricky, and doesn't come standard with Gatsby's starter blogs.

So, heres how I went about adding this:

## Environment Variables

[According to the GatsbyJS docs][docs], you can set up a `.env` file (and `.env.production` and `.env.development` and really whatever else you want) with whatever variables you need, and they will be available to you in your site components (as long as they start with `GATSBY_`)! So we can set up a file that has a variable telling us whether to list drafts in the main post list or not:

### `.env`
```
GATSBY_SHOW_DRAFTS=true
```
Simple!

However, we will want to use this variable while we are setting up pages, so we won't be reading this environment file in 

However, we will want to use the [`dotenv`][dotenv] package from npm to load out variables

## Editing Page Context

## Updating GraphQL queries

(var is false or null, so the "ne" comparison can return what we want)

## Gotchas

(The fact that env variables are strings)

[gatsby]: https://gatsbyjs.org
[docs]: https://www.gatsbyjs.org/docs/environment-variables/
[dotenv]: https://www.npmjs.com/package/dotenv