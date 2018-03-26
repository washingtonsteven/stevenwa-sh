---
title: ReactVN
repo: https://github.com/washingtonsteven/react-vn
path: /react-vn/
featured: true
date: 2018-03-12
featured_image: ./featured_alpha_20180325.gif
tags:
  - javascript
  - react
  - context
  - text adventure
---

React VN is a Visual Novel Editor and Player for playing and writing text adventures.

## Technology

### React

React VN was written for the web with Javascript, using React as a framework for the data and managing interactions.

### create-react-app

The React setup was scaffolded with [Create React App](https://github.com/facebook/create-react-app), and then was ejected for a few reasons:
    
    - Adding Sass compilation (using `sass-loader`)
    - Faciliating a special build that only builds the Player (default build includes the Editor)

### React 16.3 Context API
This project also makes used of the new (and unreleased, at the time) React Context API. The Context is set up in `src/data/StoryContext.js`. In that file there is a `StoryProvider` that wraps around the default Context.Provider component that providers the story data to the consumer. However it also exposes several functions that serve as an API for the `storyData`: helper functions (for quick access for nodes) and actions (for modifying nodes).

## Deployment

### Concept

The application is split up into two separate deployments, an "editor" build and a "player" build. The Editor includes tools to create a new story, edit an existing one, and export a story to a .json file. The Editor also automatically turns on "debug mode" where you can see a bit of what's happening under the hood as the story is being processed. The Player can only load and play .json stories.

### Processes

The initial deployment plan is to host both web apps, and allow people to share .json files as they wished (created in the editor webapp). A person would receive someone else's .json and upload it to the Player webapp to play the story.

Soon, an officially supported deployment will be to allow editors to download the source for the app, and run their own editor apps on their local machines or even self-host, and do the same for their player apps. In this case the Player can be set to load a specific .json file instead of asking for a specific screen to load.

### Current State

Currently, both apps are deployed via Github to Netlify ([Editor](http://react-vn.netlify.com) and [Player](http://react-vn-player.netlify.com)). Each build is also run through TravisCI to run tests, and on tagged releases, will generate a `player.zip` that contains all the files needed to host a Player app which will be attached to the Github release.


## Links

Source: https://github.com/washingtonsteven/react-vn  
Editor: http://react-vn.netlify.com  
Player: http://react-vn-player.netlify.com

## Screenshots

![screenshot01](screenshots/20180325/screenshot01.png)
![screenshot02](screenshots/20180325/screenshot02.png)
![screenshot03](screenshots/20180325/screenshot03.png)
![screenshot04](screenshots/20180325/screenshot04.png)
