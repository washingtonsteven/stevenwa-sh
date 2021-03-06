---
path: /react-context-actions/
date: 2018-03-30T00:00:00.000Z
title: React's new Context API and Actions
subtitle: A more interactive context state with passed functions!
featured_image: /assets/crayons_large.jpg
published: true
tags:
  - react
  - javascript
  - state management
---

_Photo:_ <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@danielwatsondesign?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Daniel Watson"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Daniel Watson</span></a>

_Edit: 4/2/2018 - [It was pointed out to me](dancomment) that the example in this post had a performance issue, where `render` was called on Consumers unnecessarily. I've updated the article, examples, and the CodeSandbox to rectify this._

The new React Context API (~~coming soon~~ now here! in React 16.3) is a massive update of the old concept of context in React, which allowed components to share data outside of the parent > child relationship.  There are many examples and tutorials out there that show how to read from the state provided by context, but you can also pass functions that modify that state so consumers can respond to user interactions with state updates!

## Why Context?

The context API is a solution to help with a number of problems that come with a complex state that is meant to be shared with many components in an app:

1.  It provides a single source of truth for data that can be directly accessed by components that are interested, which means:
2.  It avoids the "prop-drilling" problem, where components receive data only to pass it on to their children, making it hard to reason about where changes to state are (or aren't) happening.

### B-but Redux!

Redux is a fantastic tool that solves these problems as well. However Redux also brings a lot of other features to the table (mostly around enforcement of the purity of state and reducers) along with required boilerplate that may be cumbersome depending on what is needed. For perspective, Redux uses the (old) context API.

Check out this article by Dan the Man himself: [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

## What's Context do?

There are plenty of articles on this ([I particularly like this one](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b)), so I don't want to go into too many details about how this works. You've seen the examples so far, and they're mostly missing something: _how to update the state in the provider._ That state is sitting there, and everyone can read it, but how do we writeto it?

## Simple Context Example

In many of these examples we make a custom provider to wrap around React's, which has its own state that is passed in as the `value`. Like so:

### `context.js`

```javascript
import React from "react";

const Context = React.createContext();

export class DuckifyProvider extends React.Component {
  state = { isADuck: false };
  render() {
    const { children } = this.props;
    return ( 
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }
}

export const DuckifyConsumer = Context.Consumer;
```

Seems simple, enough. Now we can use the `DuckifyConsumer` to read that state:

### `DuckDeterminer.js`

```javascript
import React from "react";
import { DuckifyConsumer } from "./context";

class DuckDeterminer extends React.Component {
  render() {
    return (
      <DuckifyConsumer>
        {({ isADuck }) => (
          <div>
            <div>{isADuck ? "quack" : "...silence..."}</div>
          </div>
        )}
      </DuckifyConsumer>
    );
  }
}

export default DuckDeterminer;
```

## Passing Functions

Now, what if we wanted to emulate a witch turning something into a duck (stay with me here)? We need to set `isADuck` to `true`, but how?

We pass a function.

In Javascript, functions are known as "first-class", meaning we can treat them as objects, and pass them around, even in state and in the Provider's `value` prop. It wouldn't surprise me if the reason why the maintainers chose `value` and not `state` for that prop is to allow this separation of concepts. `value` can be anything, though likely based on `state`.

In this case, we can add an `dispatch` function to the `DuckifyProvider` state. `dispatch` will take in an action (defined as a simple object), and call a reducer function (see below) to update the Provider's state (_I saw this method of implementing a redux-like reducer without redux somewhere, but I'm not sure where. If you know where, let me know so I can properly credit the source!_).

We pass the `state` into the `value` for the Provider, so the consumer will have access to that `dispatch` function as well.


Here's how that can look:

### `context.js`

```javascript
import React from "react";

const Context = React.createContext();

const reducer = (state, action) => {
  if (action.type === "TOGGLE") {
    return { ...state, isADuck: !state.isADuck };
  }
};

export class DuckifyProvider extends React.Component {
  state = {
    isADuck: false,
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  render() {
    const { state, props: { children } } = this;
    return <Context.Provider value={state}>{children}</Context.Provider>;
  }
}

export const DuckifyConsumer = Context.Consumer;
```

Note that we have `dispatch` in our state, which we pass into `value`. This is due to a [caveat in how the need to re-render a consumer is determined](https://reactjs.org/docs/context.html#caveats) ([Thanks, Dan for pointing that out!](https://dev.to/dan_abramov/comment/2nga)). As long as the reference to `this.state` stays pointed to the same object, any updates the make the Provider re-render, but don't actually change the Provider's state, won't trigger re-renders in the consumers.

Now, in `DuckDeterminer`, we can create an action (`{type:"TOGGLE"}`) that is dispatched in the `button`'s `onClick`.

(We can also enforce certain action types with an enum object that we export for the `DuckifyContext` file. You'll see this when you check out the [CodeSandbox](https://codesandbox.io/s/kw25vnv25v) for this)

### `DuckDeterminer.js`

```javascript
import React from "react";
import { DuckifyConsumer } from "./DuckContext";

class DuckDeterminer extends React.Component {
  render() {
    return (
      <DuckifyConsumer>
        {({ isADuck, dispatch }) => {
          return (
            <div>
              <div>{isADuck ? "🦆 quack" : "...silence..."}</div>
              <button onClick={e => dispatch({ type: "TOGGLE" })}>
                Change!
              </button>
            </div>
          );
        }}
      </DuckifyConsumer>
    );
  }
}

export default DuckDeterminer;
```

The secret sauce here is the `dispatch` function. Since we can pass it around like any other object, we can pass it into our render prop function, and call it there! At that point the state of our Context store is updated, and the view inside the Consumer updates, toggling on and off whether the duck truly exists.

### Extra credit

You can (read: I like to) also add a `helpers` field alongside `state` and `dispatch`, as a set of functions that "help" you sift through the data. If `state` is a massive array, perhaps you can write a `getLargest` or `getSmallest` or `getById` function to help you traverse the list without having to split the implementation details of accessing various items in a list in your consumer components.


## Conclusion

Used responsibly, the new Context API can be very powerful, and will only grow as more and more awesome patterns are discovered. But every new pattern (including this one, even) should be used with care and knowledge of the tradeoffs/benefits, else you're dipping your toes in deaded _antipattern_ territory.

React's new context API, is incredibly flexible in what you can pass through it. Typically you will want to pass your state into the `value` prop to be available to consumers, but passing along functions to modify state is possible as well, and can make interacting with the new API a breeze.

### Try it out

The `DuckDeterminer` component is available to play with on [CodeSandbox, right now!](https://codesandbox.io/s/kw25vnv25v)

[dancomment]: https://dev.to/dan_abramov/comment/2nga
