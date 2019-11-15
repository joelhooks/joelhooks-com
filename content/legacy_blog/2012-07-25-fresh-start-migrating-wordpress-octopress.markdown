---
layout: post
title: 'Fresh Start: Migrating from Wordpress to Octopress'
date: 2012-07-25
description: 'this post has all of the right fields'
categories: ['test']
keywords: ['test']
banner: './images/banner.jpg'
---



I've been wanting to part ways with WordPress for some time. It's been expensive, running a VPS for the hosting. I've been "attacked" on multiple occasions that result in blacklisting from the Google when I ran on much less expensive shared hosting. It is probably theme dependent also, as well as how a given server is configured.

What I've really been wanting to do is migrate my words to a static Github repository and serve it up through Github Pages. I'm already shelling out for the Github, why not take advantage. It is also appealing to serve up an entirely static site. Suck it script kiddies.

## Exiting Wordpress

I've got a lot of words written that people still find useful. I don't want to disappoint Rob! And frankly, I don't want to break the internet and leave a trail of broken links across the Google.

<div align="center"><blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/jhooks">jhooks</a> I still refer to some of your blog posts when I’m doing RobotLegs stuff so I would definitely kep them around in some format</p>&mdash; Rob Dodson (@rob_dodson) <a href="https://twitter.com/rob_dodson/status/227195345283727360" data-datetime="2012-07-23T00:16:06+00:00">July 23, 2012</a></blockquote></div>

The first step was to strip out all of the "junk" posts that have accumulated. These were generally time based announcements that weren't adding anything to **any** conversation. After that, I stripped the theme and used the excellent [Boilerplate](https://wordpress.org/extend/themes/boilerplate) theme. If I was to build a Wordpress theme "from scratch," this is the theme I'd go for. I wish I'd found it before. It has an excellent separation of concerns and seems like it would be a pleasure to build upon. Sorry Wordpress, it's too late for that.

With the theme stripped an all non-essential plugins disabled, I tweaked the theme so that individual pages had much of the extra fluff removed from them. All dates are gone, next/previous navigation is gone, and I added in a box at the bottom just to let people know that the page should be considered an "archive." It's important to get the pages right at this step. It would be a severe pain to manipulate the resulting static pages.

All that was left was extracting all of the [individual posts into static pages](https://joelhooks.com/2009/12/24/continuous-scrolling-thumbnail-component-for-flex/). [The WP Static HTML Output](https://wordpress.org/extend/plugins/static-html-output-plugin/) plugin is excellent. It spit out a zip with the proper folder structure to ensure that my links would not be broken. The only flaw was that the Archive Utility on OS X wouldn't unzip the output. I had to use the command line unzip utility. It gave me all of the resources for each page, including the SWFs and other media that they linked to. This was perfect.

There are other options for this too. [exitWP](https://github.com/thomasf/exitwp/) looks like a solid way to extract posts and create markdown that could potentially be used with [Jekyll](https://github.com/mojombo/jekyll) (and subsequently [Octopress](https://octopress.org/)), but I liked the flat file structure of the straight brute force HTML output.

## Enter Octopress

Octopress is a wicked open-source blogging platform that leverages a hosted git repository to deliver my words. It hooks up to Github and Heroku, depending on your preference for platform. I've got mine working through Github.

What I like about Octopress is that **everything is version controlled**. I can start a draft, work, commit, come back later to work some more, and finally deploy it when it is ready. It allows my blog to _feel_ like a proper software project, and I like that.

There is a handful of themes, and I haven't got into customization yet, but it looks a lot nicer to modify than Wordpress PHP. It feels like the type of system that **I** like to work on and tinker with.

Octopress is **_dead simple_** to get up and running with. The documentation is first rate, and the steps are clear and concise. You can literally have something public facing in 10 minutes via Github or Heroku.

To get my static pages integrated, I simply dropped the files and folders into the source folder within the Octopress structure. The next time I generated and deployed, all of my links were working. Fantastic.

One item that I didn't really think about was the `sitemap.xml`. I stripped all the navigation from the archived pages, and I didn't leave crawlers any way to navigate my content. I grabbed the sitemap from and added some awful code to the sitemap generator plugin that Octopress uses.

It isn't pretty, but it got all of my post page links wedged into the sitemap. Hopefully this appeases the robots.

Another cool tool that works well with Octopress is [Pow](https://pow.cx/). Octopress is a rack app, and once to point Pow at your Octopress folder, it serves the page up locally at `https://foldername.dev`. Then it's just a matter of running `rake watch` and going to town.

## Conclusion

I'm stoked about making progress on my blogspace. It has been on the todo list for some time. It falls well into the [breakable toy](https://redsquirrel.com/dave/work/a2j/patterns/BreakableToys.html) category of things, and that is something I can use right now as I learn new tools. I'm looking forward to improving this space with quality content about modern standards-based web development with open source tools.
