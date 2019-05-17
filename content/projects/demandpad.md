---
date: 2019-05-16T22:34:00.824Z
title: DemandPad
featured_image: /assets/pad-banner.png
published: true
featured: true
tags:
  - javascript
  - react
  - utility
repo: 'https://github.com/washingtonsteven/demandpad'
screenshots:
  - /assets/pad-screenshot01.png
  - /assets/pad-screenshot02.png
---
DemandPad is a quick note-taking utility.

## Goal
This was a personal project with a personal goal: have a quick utility to open up and take notes.

In the past, I would have a bookmark to open the "url" `data:text/html,<html contenteditable style="font-family:sans-serif; padding:2%">`. Try it! It will open up a blank webpage that you can type in. This is great for jotting down quick notes (just like a post it note), with almost no system overhead, having to open a separate program, having to find a pen, etc.
However, this approach has one major shortfall, saving. Once you close the tab, the notes are gone forever, akin to tossing the post-it note. Sometimes I would leave this tab open for days, only to despair when I accidentally closed it, or an overeager update would restart my computer.
My solution is to make a webapp that is nearly as light as the dataURI, but with the ability to save and load previous notes.

## Saving/Loading mechanism

Notes are saved/loaded from the browser's `localStorage`. The mechanism saves on every keypress, serializing all the note data into a JSON string and saving it into the local store (which can only save strings).

One big limitation of this is the fact that notes don't "travel" with me, so any new device I use will have its own set of notes. This also applies to separate profiles (at least in Chrome) on the same machine. I use separate profiles for my personal (Google) and work (GApps) accounts. This means that the notes don't "cross-pollinate," for better or for worse.

## Deleting Notes

Deleting all notes is fairly easy, it is simply a matter of setting the localStorage key to an empty string. Easy.

It's a bit more complicated to delete a single note, which involves messing with an array, removing an item and ensuring the rest of the items are still ordered properly.

Another issue with deleting single notes is making sure that the user really _wants_ to delete it. This is usually handled by some sort of confirmation message. [I have a similar mechanism working on ReactVN](https://twitter.com/esaevian/status/975218196755173377)

This time, I wanted to try something a little different, inspired by a game that I was deep in at the time: _Destiny 2_. In that game, you can delete items from your inventory by holding a button. At that point a bar begins to fill up. If you release the button the bar resets, but if you hold the button until the bar fills, the item is removed. This is sort of a fun interactive way to confirm the user wants to delete the item without extra dialongs and extra mouse motion.

(They also give priority to various items by changing the color of the bar and how long it takes to delete something! I could go more into it, but maybe for another time).

Basically, I liked this interaction for confirming deletion, and reimplemented it in React, using `setTimeout` and `state` to update a value which drove the CSS property `width`. For performance reasons, it may have been better to use `transform:scale(x)` instead of `width`, since `width` causing the browser to re-layout which hurts performance and frame rate. [Got an issue for that now.](https://github.com/washingtonsteven/demandpad/issues/16)

[You can see the underlying code for the DeleteButton component here](https://github.com/washingtonsteven/demandpad/blob/master/src/NoteList.js#L11)

## Process 

This personal project I tried to implement a Git workflow of always creating feature updates on a separate branch, and making a pull request to bring the updated and tested change into `master`. This was great to get in the habit of this sort of flow. It's also cool to go through Github and see the issue/commit/pull request history and see where certain changes happened at a glance. I still like doing git actions via the command line, especially to truly understand what's happening, but using Github in this way has been a great way to explore all the integration features the service has.

In addition, Netlify will take note of pull request, automatically building them in a Deploy Preview. This made it really nice to test out changes in the live environment as the local server from `create-react-app` isn't always the same.

## Underlying Tech

DemandPad is built in React. Everything is client side, using built in browser APIs. Hopefully one day I will update this to use a 3rd party auth service (Netlify Identity, anyone?) which will also allow the notes to be saved in the cloud, to avoid the saving issue mentioned above.

Hosted with ❤ on Netlify!
