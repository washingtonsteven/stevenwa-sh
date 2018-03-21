---
title: ReactVN
repo: https://github.com/washingtonsteven/react-vn
path: /react-vn/
featured: true
date: 2018-03-12
featured_image: ./featured.png
tags:
  - javascript
  - react
  - context
  - text adventure
---

React VN is a Visual Novel Editor and Player for playing and writing text adventures.

## Technology

React VN was written for the web with Javascript, using React as a framework for the data and managing interactions.

The React setup was scaffolded with [Create React App](https://github.com/facebook/create-react-app), and then was ejected for a few reasons:
    
    - Adding Sass compilation (using `sass-loader`)
    - Faciliating a special build that only builds the Player (default build includes the Editor)

This project also makes used of the new (and unreleased, at the time) React Context API. The Context is set up in `src/data/StoryContext.js`. In that file there is a `StoryProvider` that wraps around the default Context.Provider component that providers the story data to the consumer. However it also exposes several functions that serve as an API for the `storyData`: helper functions (for quick access for nodes) and actions (for modifying nodes).

## Screenshots

Coming soon...

## Links

Source: https://github.com/washingtonsteven/react-vn  
Editor (online): http://react-vn.netlify.com
