---
layout: post
title: 'Why I Built an AngularJS Training Site on Rails'
date: 2013-09-15
---

If you're into AngularJS at all, you are probably familiar with the kickass [AngularJS video training](https://egghead.io/) from egghead.io. If you haven't seen egghead.io, it is a collection of 50+ short "bite-sized" training videos, largely focused on the AngularJS framework. <div style="float: right; padding:5px;"><a class="nofancybox" href="https://egghead.io"><div style=" height: 191px; width: 150px; background-image: url(./images/egghead_logo.png);"></div></a></div>The videos are created by (and feature) my friend [John Lindquist](https://twitter.com/johnlindquist) playing Webstorm like a violin while explaining basic AngularJS concepts.

Over the last few months John and I have been discussing egghead.io, and what its future holds. Is it an AngularJS training site? Is John going to be the only presenter? Is the donation model the best approach for keeping the lights on?

## The Problem

egghead.io was a static site, built on AngularJS. It was using the YouTube API to grab a list of videos from a playlist, and list them out in a simple list. It had a permanent "in progress, fixing stuff" message in the top left, and a request (plea?) for donations in the top right. When you would click on of the videos, it would display the embedded video in the page.

![egghead.io on AngularJS](./images/egghead_before.jpg)

Frankly, this was adequate for John's needs. He just wants to create content and teach people. He didn't want to think about:

- SEO
- Content pipelines
- Information architecture
- Server maintenance
- Marketing

Set it and forget it.

As it happens, I'm really interested in all of those topics.

## The Solution Part 1: **Ruby on Rails**

I was asked, "Why would you build an AngularJS training site with Ruby on Rails?!"

This was the first time I've used Rails, outside of tutorial type projects. It has been floating at the top of my "to learn" list for several years. Aside from basic nerd compulsion to explore cool technology, it became rapidly apparent that this was the _right tool for the job_.

One of the drawbacks of a single page app, built with AngularJS or another similar framework, is that SEO become extremely tricky. There are approaches for overcoming this, but it is beyond trivial. egghead.io is a web **page** with the purpose of delivering content. Web pages need to searchable, so people hunting Google will actually be able to find them. Egghead had a bit of search traffic. It actually does fairly well (2nd page) in a search for "AngularJS". What wasn't getting search hits was the video lessons themselves.

![egghead.io gets a facelift](./images/egghead_after.jpg)

By rendering the pages on the server, and delivering them to the browser, Google can now crawl the pages and actually show the pages to searchers interested in the content. It didn't take long to see a bump in organic search traffic.

![A nice spike in search traffic for egghead.io](https://cl.ly/image/2e2p422t2f2R/Screen%20Shot%202013-09-15%20at%2012.29.01%20PM.png)

I was also able to get authentication squared away with Devise and CanCan. It was a bit tricky, since I chose Rails 4 and Bootstrap 3. Many of the gems required using git branches, but after some trial and error it all dialed in very nicely.

Rails wasn't the only choice for this. I also considered Django and a Node stack, but ultimately the "convention over configuration" nature of Rails won my heart. It is **so freaking easy** and pleasant to work with. After a month, it has earned a well-deserved slot in my web development toolbelt.

## The Solution Part 2: **Heroku**

You want to talk about **freaking easy**? Heroku. Frictionless. Magic. Amazing. Awesome. Kickass. Incredible. ZOMG WOW.

If it isn't obvious, I really love Heroku.

Even with a fair bit of traffic, I'm able to comfortably get away with the free plan. Through the use of strategic caching and CloudFront to serve static content, the server itself doesn't have to do much heavy lifting.

`git push heroku master`

{% emoji emoji1f493 %}

I'm not scared of managing my own VPS, but there is enough work to do without getting into SYSOP tasks. Heroku ftw.

## The Solution Part 3: **Wistia**

TIL: **video seo** is a thing.

You ever notice your search results that show a preview thumbnail of a video with the little "play" icon? Usually these are for YouTube results. This is because, and is no shocker, Google is _really good at video SEO_. For YouTube. Try as you might, if you are hosting your videos on YouTube, you will **never** see these "rich snippets" on your own pages where you embed the videos.

Video SEO is black magic voodoo. It involves creating a specific sitemap XML that correlates media to a URL. It looks something like this:

```xml
<url>
  <loc>https://egghead.io/lessons/bower-introduction-and-setup</loc>
  <video:video>
    <video:content_loc>https://embed.wistia.com/deliveries/4f239fa48f86dd8854a707fa6384de5aa3c54db7/file.mp4</video:content_loc>
    <video:thumbnail_loc>https://embed.wistia.com/deliveries/3df06507df5589c130ceb906a59d8f04f9a5f034/file.png</video:thumbnail_loc>
    <video:title>Bower - Introduction to Bower</video:title>
    <video:description>Bower is a package manager for Javascript libraries that allows you to define, version, and retrieve your dependencies. In this tutorial, John gives a quick introduction to Bower and will show you how to get started.</video:description>
    <video:publication_date>2013-09-05T14:27:26+00:00</video:publication_date>
    <video:family_friendly>yes</video:family_friendly>
    <video:duration>168</video:duration>
    <video:tag>bower tutorial</video:tag>
    <video:tag>bower setup</video:tag>
    <video:tag>bower angularjs</video:tag>
    <video:tag>bower screencast</video:tag>
  </video:video>
</url>
```

You **can** associate your YouTube videos with a video sitemap, but it is fruitless. Given the same video, Google will **always** favor YouTube.

That's where [Wistia](https://wistia.com/) comes in.

Wistia offers "Professional video hosting built specifically for business." They host and stream videos, give awesome analytics, embedding, and (perhaps most importantly) **easy to use video SEO tools**.

Videos on the egghead.io domain are embedded via Wistia, and not YouTube. John is still posting to YouTube, but on the site we are able to take advantage of Wistia and take back some of the "Google juice" that would otherwise be delivered solely to YouTube.

![rich snippets for the egghead.io domain](https://cl.ly/image/0X2C2443413h/Screen%20Shot%202013-09-11%20at%208.05.26%20AM.png)

I'll admit to being overly excited when I saw the first "rich snippet" attached to an egghead.io domain. Maybe I'm a nerd?

## The Solution Part 4: **General SEO**

Wistia has the video SEO covered, but an interesting aspect of video is that while you can tell Google the video exists, their robots aren't smart enough (yet) to analyze the video for keywords. To get over this hurdle, you can use transcripts of the video and provide the spiders the words they crave.

For this we used [CastingWords](https://castingwords.com/). I was amazed, despite the videos technical nature, the transcripts we got back were very accurate.

Transcripts are a win/win/win. Lots of people would rather just read a block of text for speed. There are people that can't hear at all, so audio content is useless to them. Search spiders love text.

Along with the transcripts we've been going through the backlog of videos adding summary descriptions to each. It is a chore, but it is worth the effort.

## The Solution Part 5: **Open Source isn't Charity**

The donation model in open-source software is flawed. It is not charity. It takes a lot of **work** to build high quality open source software. It takes a lot of **work** to write documentation and provide training.

![Ain't too proud to beg.](./images/programmer.jpg)

We can do better than asking for hand-outs.

While lots of generous visitors (~500) have donated to egghead.io over the last year, we decided to take a different approach. Instead of simply asking for a donation, what if we [bundled up the first 50 AngularJS videos and offered an "offline HD bundle"](https://egghead.io/first-50-video-download-offline-bundle) of all the videos instead? This way we aren't accepting charity, and giving supporters something tangible for their hard-earned $$.

This approach has some limitations. All of the videos are streaming for free a back click away, but having the full resolution copies on your hard drive is something people want. It also gives a people a way to "donate" and get a receipt that can be expensed or deducted as a training cost.

It's been a huge success. The lights will be on at egghead.io for quite some time. We will be able to expand the site, and explore a wider range of high quality content.

## Conclusion and Next Steps

I love AngularJS. It is an amazing tool. It isn't always the right tool for the job. If you are building web applications it might be a perfect fit. If you are building web **pages** the "single page application" approach has some severe flaws. Ruby on Rails solves these nicely.

Video provides many distinct challenges from a delivery and SEO perspective. YouTube makes it incredibly easy to share your content online, but the "cost of free" is that Google will leverage your content to take your audience away from your site and into their ecosystem. They give YouTube search priority, and squeeze your content for every drop of juice they can. By moving to a commercial hosting service like Wistia, you can regain a lot of control over the hard work you've put into your content.

We aren't running a charity, and asking for donations is a habit I'd like to see broken in OSS. There are clearly better ways to be compensated for our efforts, and I know that I **love** supporting OSS. It makes my day to send a content producer $$ for a high-quality book, workshop, or other training. I get smarter, they get paid. Everybody wins.

![the before and after of egghead.io](./images/egghead_before_after.jpg)

Working on the relaunch of egghead.io has been a lot of fun. It has allowed me to put to use a lot of the things I've been learning over the last year in regards to SEO, conversion rate optimization, and generally building a modern web page. It is **extremely awesome** to have a project that I care deeply about, and can work on lovingly in my free time. I love my enterprise clients, but having a little techno proto-baby to feed and care for fills my heart with joy. Again, I might be a nerd ;)

Now I'm looking forward to publishing my first screencast to the site! It should be soon, so be on the lookout :>

P.S. If you're looking to build an AngularJS site **on** Rails, I highly recommend [this book](https://www.fullstack.io/edu/angular/rails/).
