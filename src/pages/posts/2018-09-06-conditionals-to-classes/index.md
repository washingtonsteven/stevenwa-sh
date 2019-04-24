---
title: "Quickie: From conditionals to classes"
date: 2018-09-06
path: /conditionals-to-classes
published: false
tags:
  - javascript
  - css
  - functional programming
  - arrays
---

When building apps, occasionally you want to take bits of your state and apply classes based on that. This lets you apply various css styles and animations as your state changes.

## Starting state

So let's say we have a state (`this.state`) that looks like this:

```js
const state = {
  isError: true,
  isLargeFormat: false,
  isOnRight: true
}
```

And we want to turn each property into a class based on whether it is truthy or not.

## First Approach

Since a "class" is really just a string, a quick approach might be a sort of string builder approach:

```js
function getClassList(state) {
  const classes = "component-class";
  if (state.isError) classes += " error";
  if (state.isLargeFormat) classes += " large";
  if (state.isOnRight) classes += " on-right";

  return classes;
}

getClassList(this.state) // => "component-class red on-right"
// apply `classes` to your element using classList, $.addClass, setAttribute, your `render` method, etc.
```

This is rather verbose, and hard to update as we move forward. A more flexible (but still imperative) approach would be:

```js
function getClassList(state) {
  const classes = "component-class";
  Object.keys(state).forEach(key => {
    if (state[key]) classes += " " + key;
  });

  return classes;
}

getClassList(this.state) // => "component-class isError isOnRight"

this.state.isRotated = true;
this.state.isOnRight = false;

getClassList(this.state) // => "component-class isRed isRotated"
```

Here we're looping over the keys in `this.state`, and still building out our string. This is more flexible in that we can add new properties to our state and `classes` will take them into account. It's a bit less flexible in that now our `state` has to have properties matching the classes we want to apply. 

## Functional Approach

The second example above is a little closer to what we want, but we can't forget that with ES6, we have functions like `filter` to help us get exactly the values we want, and then `join` to build our string for us:

```js
function getClassList(state) {
  return Object.keys(state).concat("component-class").filter(key => state[key]).join(" ");
}

getClassList(this.state) // => "component-class isError isOnRight"

getClassList({ isWarning: true, isLargeFormat: true }) // => "component-class isWarning isLargeFormat"
```

This looks even sleeker when we use implicit returns for arrow functions, but that isn't necessary if that sacrifices readability for you or your team. Another important note is that we are using that as a boolean for our filter functions, so any truthy value will pass the test, and any falsy value (including `0`!) will get filtered away.

We can also get crazy and `map` the keys in our state to different class names:

```js
const classNames = {
  isError: 'error',
  isLargeFormat: 'large',
  isOnRight: 'right-aligned',
  isRotated: 'rotated',
  isWarning: 'warning'
}

function getClassList(state) {
  return Object.keys(state).concat("component-class")
               .filter(key => state[key])
               .map(key => classNames[key])
               .join(' ');
}

getClassList({isError: true, isOnRight: true, isWarning: false}); // => "component-class error right-aligned"
```

We can also modify the `filter` conditional to filter out any properties in `state` that aren't in `classNames`, so we aren't adding classes for bits of states that don't affect presentation.

## ???

This is really nice in react
Vue already has something like this, using objects!
Presentational classes?


======================

Verbose mode below:
Codesandbox: https://codesandbox.io/s/8zjykrwpw0

# CSS

Here's some CSS that I want to apply to my component

```css
.component {
  transform-origin: center;
  transform: translate3d(0, 0, 0);
  transition: transform 0.4s ease-in-out;
  width: 250px;
  height: 250px;
  background-color: #fff;
  color: #4a4a4a;
  border: solid 1px #000;
  font-family: sans-serif;
}

.component.left {
  transform: translate3d(-250px, 0, 0);
}

.component.right {
  transform: translate3d(250px, 0, 0);
}

.component.large {
  width: 500px;
  height: 500px;
}

.component.large.left {
  transform: translate3d(-500px, 0, 0);
}

.component.large.right {
  transform: translate3d(500px, 0, 0)
}
```

So if the component needs to be on the left, I just apply the class `left` and it moved over there. Same for the class `right`
I can also use classes to toggle the color of the item, and the size.
Note that if the classes `large` and `left` or `right` are applied, the position changes to accomodate the new size!

# JS


## MoveableComponent.js
```js
import React, { Component } from 'react';

export const MoveableComponentPositions = {
  LEFT: 'left',
  RIGHT: 'right'
}

class MoveableComponent extends Component {
  render() {
    const classes = [
      this.props.left && 'left',
      this.props.right && 'right',
      this.props.large && 'large'
    ].filter(c => c).join(' ');
    return (
      <div className={classes}>
        I'm a movable component!
      </div>
    )
  }
}

export default MoveableComponent
```

## App.js

```js
import React, { Component } from 'react'
import MoveableComponent, { MoveableComponentPositions } from './MoveableComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      left: false,
      right: false,
      large: false
    }
  }
  
  toggleClass(e) {
    const targetClass = e.currentTarget.dataset.targetClass;
    this.setState(state => ({
      ...state,
      [targetClass]:!state[targetClass]
    }))
  }

  render() {
    return (
      <div className='app'>
        {
          Object.keys(this.state).map(className => (
            <button data-target-class={className} onClick={this.toggleClass}>
              {this.state[className] ? 'remove' : 'add'} {className}
            </button>
          ))
        }
        <MoveableComponent {...this.state} />
      </div>
    )
  }
}
```

# Caveats

Impossible state = left + right
(right will override, ideally we wouldn't do that.)