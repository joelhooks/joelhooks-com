---
layout: post
title: 'Learn AngularJS this Weekend'
date: 2013-08-03
---

AngularJS has a reputation for a steep learning curve. It's definitely complex, but follows the 80/20 rule. **20% of the features are what you will use 80% of the time**. If you are new to AngularJS and have a weekend to study, there are some very high quality resources that will let you **start Monday with a strong working knowledge of AngularJS**.

Already know AngularJS? Feel free to skip ahead. These resources are excellent, and you're bound to learn something.

## The Official Tutorial ~4hrs

Start with [the official tutorial](https://docs.angularjs.org/tutorial). It provides a very straight forward overview of AngularJS and walks step by step through building a simple app. When you're done, you should have **a solid understanding of the basics** and the vocabulary you will need to move on to the next step.

The official tutorial is _very_ well put together. Unfortunately it utilizes the angular-seed project as a template. The angular-seed project is fine for quickly throwing together a working AngularJS app, but it doesn't provide a structure that scales well in a production application.

**Don't use the angular-seed to start your real projects!** It's a learning tool only.

## Kickass (**free!**) Video Tutorials on Egghead.io ~3hrs

<div style="float: left; padding:10px;"><a class="nofancybox" href="https://egghead.io"><div style=" height: 191px; width: 150px; background-image: url(/images/egghead_logo.png);"></div></a></div>You've done the tutorial, and should have a good grasp of the basics. Your next stop is John Lindquist's [egghead.io for free AngularJS videos](https://www.egghead.io/). This series of bite-sized videos will deliver a ton of great information. John has gone through almost all of the "hard" concepts, and presented them in an easy to understand way.

_All_ of the videos are great, but the **series on directives is extra fantastic**. Transclusion? No problem. Even after using AngularJS for over a year, I was able to solidify some of the concepts that were confusing for me.

Watch them all and **take some notes**. When you come out of the other side your AngularJS-fu will be starting to take shape.

![ahhhhhhh Learning AngularJS is refreshing - Photo Credit: chotda](/images/lemonade.jpg)

That will take you through Saturday evening, and you deserve a rest. **Send John a donation for his hard work**, pour a tall glass of lemonade, and relax as you reflect on the your new-found knowledge of an awesome framework. Nice work!

## Things get real with angular-app ~4hrs

Sunday morning.

At this point you should understand the core AngularJS concepts and terminology. Time to brew a fresh pot and get to work.

![AngularJS Fuel - Photo Credit: Bjørn Giesenbauer](/images/french_press.jpg)

If you are anything like me, by now you're ready to dig into a **proper example application**. Luckily we have the excellent [angular-app](https://github.com/angular-app/angular-app) project to explore. This non-trivial example focuses on best practices for:

- Folder structure (important!)
- Modules (very important!)
- **Testing** (super important!)
- RESTful services
- Navigation
- Security

angular-app combines a solid AngularJS UI with a node.js backend. It is non-trivial, and studying this app will give you a realistic sense of a proper AngularJS app.

One killer aspect of this example is the build system. It **demonstrates a fantastic Grunt.js build with an integrated Karma Test Runner**.

Peter Bacon Darwin and Pewel Kozlowski have done a great job. Front to back, this project is worth your study time. You could spend several days investigating the nooks and crannies of this example, but we've only got the weekend. Set angular-app to the side for now, but keep it handy. It will serve as valuable reference in the future.

## Start building your own app with ng-boilerplate ~4hrs

At this point you should have a solid knowledge to start building something. The [ng-boilerplate](https://github.com/joshdmiller/ng-boilerplate) project will get you started. **This is the seed you should use**. It takes the lessons you learned studying angular-app, and provides the foundation upon which to build something substantial.

![a strong engine for your AngularJS app](/images/engine.jpg)

ng-boilerplate, unlike the angular-seed project, is **suitable as a starting point for building a production app**. It's a solid shortcut, and worth study.

Spend some time getting to know ng-boilerplate through its excellent README. The READMEs don't stop at the root of the project. Josh has sprinkled them throughout the project to help you understand what is going on.

Once you have your head around ng-boilerplate, you can delete all of the placeholder views, and **start trying things out for yourself**.

Need some ideas?

- PRISM:Refract - NSA Dashboard
- FlySwatter - A simple bug tracker
- GeekTalk - Multiroom Chat
- OctoStats - Ranked Github Users with Clever D3 Visuals
- 1000words - Writing app that sets target of 1000 words per day and graphs your success
- GetItDone - Yup, a todo list.
- ...?

The sky is the limit. Using the reference material you've studied all weekend, combined with the official AngularJS docs, you should be well on the way to AngularJS mastery. You'll be over the hump, having defeated that infamous curve. Build something cool and tell me about it.

If you've hit any road blocks, [send me an email](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=joelhooks@gmail.com&su=Hello,%can%I%20get%20some%20help?) and I'll help you out.

## Congrats! You've leveled up.

The fun isn't over. There is **plenty left to learn**. The weekend _is_ over though, and you've worked hard. Take a break and relax.

You've earned it.

![You've Leveled up your AngularJS! - Photo Credit: Cayusa](/images/yellow_belt.jpg)

P.S. Initial project setup is one of the most critical factors to a project's success. Using templates is a great way to get a head start, but using a template without solid understanding of all the moving parts can be dangerous. I'm working on **step-by-step guide to building your own best practices AngularJS project template**. If you want to get notified of its progress, as well as launch-day discounts, sign up to my newsletter below.

You might also enjoy: <a href="https://joelhooks.com/blog/2013/05/22/lessons-learned-kicking-off-an-angularjs-project/"><strong>Lessons Learned: A Year with a Large AngularJS Project</strong></a>
