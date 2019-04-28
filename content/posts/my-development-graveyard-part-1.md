---
path: /my-development-graveyard-part-1/
date: 2018-08-14T20:16:55.152Z
title: 'My Development Graveyard, Part 1'
subtitle: The projects that just didn't quite make it!
featured_image: /assets/rip.jpg
published: true
tags:
  - graveyard
---
\_(Image from \[Max Pixel](https://www.maxpixel.net/Tombstone-Cemetery-Rip-Grave-Death-D-2036220))\_



The concept of a Github Graveyard was started by Isaac Lyman in \[this dev.to post](https://dev.to/isaacandsuch/github-graveyards-ill-show-you-mine-49lh). The idea is to go through all your old projects that you never touch anymore and remember where you've come from to help you get to where you're going. I loved the idea immediately, and decided to start my own!



\## \[aterriblefate]\[aterriblefate]



\*\*Background:\*\* This is a simple, single page site, mostly to test out how Github Pages worked. I got the idea on New Year's 2018, to create a countdown to the next year that looks like the "x days remain" cards from the Legend of Zelda: Majora's Mask.



<img src="/zelda.jpg" alt="The Legend of Zelda: Majora's Mask - Dawn of the First Day" />



\*\*What I Learned\*\*

\- Working with Javascript dates

\- Additional Practice matching styles



\*\*Why it died:\*\* This is actually alive at http://aterriblefate.net. There are bugs that have popped up (mostly due to spacing and text sizing) since testing with the date Jan 1 2018 yielded limited results. This was never a serious project, so my attention was grabbed away from this pretty quickly.



\## \[washingtonsteven.github.io]\[irateIguana]



\*\*Background:\*\* An older version of my personal site, built with Jekyll for hosting on Github Pages (now I'm using Gatsby and hosting on Netlify).



\*\*What I Learned\*\*

\- First step into static site generators, using Jekyll

\- Github Pages / Domain management



\*\*Why it died:\*\* I didn't like the design I came up with, mainly. This was also just after I dove headfirst into react, and was itching to try more react-based projects (such at Gatsby!).



\## \[react-json-component]\[rjc]



\*\*Background:\*\* As I was learning more about React, I came across some situations where JSX just wouldn't cut it. In this case I dug into \`React.createElement\` directly to create my components. I eventually wrote some login to take some specially formatted JSON, and spit out actual React Components.



The next step was to create a library that cleanly does this for you, rather than the logic I wrote that was wrapped up in other, application specfici logic



\*\*What I Learned\*\*

\- Deeper dive into React component creation

\- Incidentally, I also dove into what is necessary to create and publish a React Component on npm (even though this one was never published). In addition, taking considerations to keep the component generic enough to fit a wide array of situations that people will throw at it.



\*\*Why it died:\*\* It had mostly run its course, really. This was more of an exercise in React rather than a final living, breathing project. Rest in Peace.



\## \[genmo]\[genmo]



\*\*Background:\*\* Before \[ReactVN was a thing](http://stevenwa.sh/project/react-vn), my first foray into text adventures was a little command line tool. My eventual plan was to have this become a simulation which can generate a series of actions in a fictional world and generate a short story for submission to \[NaNoGenMo, National Novel Generating Month](https://nanogenmo.github.io/).



\*\*What I Learned\*\*

\- This was my first look into building command line tools and a deep dive into node system calls

\- I also built out genmo as an API to be integrated into any sort of app, and in fact included a call-and-response type adventure into a Slack bot.



\*\*Why it died:\*\* I would love to clean this up one day, but a lot of the logic did end up being sort of "spaghetti" by the end of it, fixing and patching bug after bug instead of thinking of the problem holistically. At this point updates and fixes would be incredibly cumbersome and locked to original design ideas. Next step here would be to do massive refactor, to the point of a possible rewrite.



\----



That's it for part 1! Like many I have a bunch of projects in my past to look over, so look forward to the next one!









\[aterriblefate]: https://github.com/washingtonsteven/aterriblefate

\[irateIguana]: https://github.com/washingtonsteven/washingtonsteven.github.io

\[rjc]: https://github.com/washingtonsteven/react-json-component

\[genmo]: https://github.com/washingtonsteven/genmo
