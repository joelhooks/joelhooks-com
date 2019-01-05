---
layout: post
title: 'Lessons Learned: A Year with a Large AngularJS Project'
date: 2013-05-22
---

After a year of working with a large AngularJS project, I thought I'd share a
few of the lessons that I learned in the process. Firstly, I love AngularJS. It
suits my needs exceedingly well, and I expect it will be my goto for the
forseeable future when I need a solid framework for "thick client" single page
applications. It's awesome. The team working on it is world class, the community
is fantastic, and it combines a killer combo of functionality for building web
apps.

## Code Organisation

This one is huge. When I arrived the app basically followed what the
angular-seed project represents. Lots of monolithic single files that contained
too much code. We migrated from that to using John Resig's "Simple Class
Inheritence" to divide up encapsulated pieces of functionality. This approach
works well, and as long as you keep the inheritance shallow generally works. We
were saddled with a "dirty sock drawer" still, where monolithic folders existed
to house various types of classes.

<pre>
- project
-- controllers
--- someController.js
--- someOtherController.js
--- ...
--- someController99.js
</pre>

Which lead to a controllers folder that would twist the eyes. My new rule is
that if you hear yourself humming the ABCs in your mind in order to find a
specific file, your folders probably have too many files.

Today I'd want to start building my project in a more modular fashion. Each
discreet bit of functionality, or functional area, contains the majority of the
files/classes/objects that it needs to function. In a perfect world, these
modules would be completely modular, and could be extracted and placed in other
projects as reusable "meta" components. This is difficult sometimes because you
will likely also need a set of common utilities, helpers, or other such files
that serve as shared dependencies across your modules. Unless reusability is a
requirement, I won't spend a lot of time ensuring absolute seperation, but it is
where the bar is raised and something that I keep in mind as I develop.

Cliff Meyers [has written a great
article](https://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
on organizing your code in a large Angular app.

## Directives are awesome and powerful

I'm of the opinion now that Directives are the **killer feature** of AngularJS.
They are wonderful little packages of contained UI/Presentation logic. They
present so much flexibility and power with their ability to extend the grammar
of HTML. We definitely use directives, but perhaps not as much as we could.

One of my favorite aspects of Angular Directives is that they are composable.
Using them as HTML attributes, we are able to leverage directives to build
complex widgets with layered functionality. This can be a double-edge sword at
times, when the layered functionality wants to compete, but overall it is
awesome.

If I was starting a project today, I would put some serious thought into
organizing Directives as visual components and behaviors. There are already
several projects that wrap popular UI frameworks with Angular Directives, but it
isn't strictly necessary to use a full-blown component set to approach it with
this mentality. What are the primary components of the application? How can it
be built around directives so that the primary components are shared throughout
the application instead of cut-n-paste HTML and CSS sprinkled everywhere. How
can I leverage these components for future work?

If you haven't watched them yet, bounce on over to John Lindquist's
[egghead.io](https://egghead.io) and check out the series on Directives. All of
the videos are excellent, but the Directives information is enlightening.

## Know thy framework

Since I've started this project, I've definitely spent some time with the
[Angular internals](https://github.com/angular/angular.js/tree/master/src). The source code is highly readable and well tested, so it is
a **great read** if you are into clean/tight JavaScript.

While I've spent some time with it, this is an area I'd like to get more
intimate with. Many things are still **black box** to me, and while I trust the
folks building Angular, I still feel the need to understand what is occuring
when I build applications. This is one of my immediate goals right now, so
hopefully down the road I might have a thing or two to say about how Angular
works uner the hood.

As an aside, I feel compelled to do the same thing with
[jQuery](https://github.com/jquery/jquery/tree/master/src). So much source,
so little time.

## The Build

Sadly, with this project we are required to use Maven and JAWR for our build. It
has been a real struggle and we can't do "proper" builds. We've been able to
build some tools that help to mitigate, but I don't recommend using Maven for
your front end code.

If I was starting the project today, I would definitely use
[Yeoman](https://github.com/yeoman/generator-angular) to easily generate
templates and make life easier.

## The CSS

This isn't related to Angular directly, but is another important aspect of your
_AngularJS project_ so I wanted to spend a little time on it.

I will admit that a year ago my attitude was "f css". It confused and frustrated
me to the point of distaste. Obviously this stemmed from ignorance, and I've
spent the last year trying to play makeup with CSS. My attitude is no longer "f
css" and sounds more like "SCSS!" because I found a happy place where CSS and I
can get along.

[SCSS](https://sass-lang.com/) syntax takes many of the pain points that put the
screws to my brain with vanilla CSS and added a nice level of clarity. On top of
that, Compass provides a pile of wicked mixins that eliminate an entirely new
level of pain from the stylesheet workflow.

In the future I want to dig into SASS/Compass deeper, combining its expressive
styling capabilities with the module and component level AngularJS work outlined
above. I'd like to use a more organized approach to my stylesheets with
something like [SMACSS](https://smacss.com/) providing a baseline standard for how the styling is
implemented and organized.

At this point, CSS and I have fully made up. I've removed a lot of my ignorance,
which was obviously the key to building a solid relationship. We will see how it
goes. One day at a time.

## Conclusion

If you are building a single-page web application, AngularJS is a solid choice.
It is important to decide on and implement structure for your application early.
Consider up front how to organize your code into modules and components so that
you can harness the power of Directives and maximize reusability potential.

Some good comments on [Hacker
News](https://news.ycombinator.com/item?id=5756911) if you'd like to join the
discussion.

You might also enjoy: <a href="https://joelhooks.com/blog/2013/07/15/a-look-at-angularjs-internal-directives-that-override-standard-html-tags/"><strong>AngularJS Directives That Override Standard HTML Tags</strong></a>

or maybe: <a href="https://joelhooks.com/blog/2013/08/03/learn-angularjs-in-a-weekend/"><strong>Learn AngularJS this Weekend</strong></a>
