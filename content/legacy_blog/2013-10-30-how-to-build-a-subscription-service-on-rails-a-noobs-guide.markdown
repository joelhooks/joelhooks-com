---
layout: post
title: "How to Build a Subscription Service on Rails: A Noob's Guide"
date: 2013-10-30
---

There are few things as nerve-wracking as pushing your first subscription
website into production. Am I covering all the bases? Will everything break and
leave me in a pit of customer support sadness? How do I even take payments? Are
they just going to laugh at me?

### Some Background

My friend John makes [awesome AngularJS training videos](https://egghead.io). They are short, topical, and
presented clearly. He loves making training videos, but has very little interest
in building out a website and marketing the content. "Selling things on the
internet" can be a chore. If you're just selling one off digital things, it is
fairly straight forward, but if you are looking to build out a website, allow
users to register, and charge them on a recurring basis it can be anything but.

As it happens, I'm very interested in these problems. For the last couple of
years I've been [taking
classes](https://www.joelhooks.com/blog/2013/06/07/what-i-learned-from-brennan-dunns-consultancy-masterclass-w-slash-sketchnotes/)
and [going to
conferences](https://www.joelhooks.com/blog/2013/06/06/my-sketchnotes-and-thoughts-from-baconbizconf-2013/)
that boil down to selling things on the internet. Recurring revenue is alluring.
My gurus are **all about** finding pain and providing immense value to people in
exchange for money. This is what I want to do too.

Wonder Twin powers; activate!

### Digging in: The Stack

We have content, traffic, and a solid reputation. What's the next step?

To actually build something, of course. [Rails was the clear
choice](https://www.joelhooks.com/blog/2013/09/15/why-i-built-an-angularjs-training-site-on-rails/)
when it came time to decide what framework to use. It is mature, easy (enough)
to use, and has a metric shit-ton of resources for building this type of thing.

It is also astonishingly easy to deploy Rails apps to Heroku. This has been a
huge win. Using the free Heroku tier has allowed me to have a production and
staging environment a few keystrokes away. For production, Heroku quickly becomes not free as you add in background workers, SSL, and other essential pieces, but you can go a **long** way with free.

### ZOMG There is so much to learn!

I've been developing software professionally for a few years. My roles are
primarily on the UI side of things, but I've built a few full-stack solutions in
the past with Django. Over the years I've always _wanted_ to learn Rails, I just
never had anything real to build. Tutorials and books can be boring, especially
with no context of something "real" that you actually care about to build. That
said, there were a few excellent resources that helped me on the way:

[Michael Hartl's Rub on Rails Tutorial](https://ruby.railstutorial.org/): Outside
of basic Ruby syntax, this is where you want to start. The web version is free,
and he guides you through building a "real" app with Rails in a clear, easy to
understand manner.

[Daniel Kehoe's RailsApp Project](https://railsapps.github.io/): This was a huge
boost for me. It covered all the bases. I wanted to build an app with Rails.
Check. I wanted to use Twitter Boostrap with Rails. Check. I wanted to have
authentication and authorization in the app. Check. I wanted to integrate
recurring subscription payments. Check.

[Peter Keen's Mastering Modern
Payments](https://www.petekeen.net/mastering-modern-payments): If you are going
to sell stuff via a Rails app, **buy this book today**. It saved me **so much
time** and instilled a confidence that I might never have had without it.
RailsApp is pretty good, but for me it started to break down when I wanted to
add payment. I needed deeper understanding and control, and Pete's book
delivered the knowledge I needed in a concise 120 page guide. I'd recommend
getting the verion with the code, because it was a huge help to me.

[Giles Bowkett's Software as a
Disservice](https://gilesbowkett.blogspot.com/2013/10/new-ebook-software-as-disservice-fixing.html)
is a direct critique of RailsApp. It is harsh, but constructive. It addresses
code smells that I had noticed, enforced some of what I learned in Pete's book,
and lays out some solid practices that a Rails noob like me won't learn in 1000
searches that result in a Stack Overflow answer. It's an opinionated style and
practices guide. _note: RailsApp has its flaws, and it was extremely useful to
me. Daniel is passionate and has put out a lot of excellent material, but
charging people real money for a product or service is terrifying. I **needed**
this critique to plug some serious holes in the implementation. It is important
to recognize that Giles is critiquing the **code** and not the developer that
wrote it._

These four sources were keys to the successful launch of egghead.io's Pro
subscription service. Along with countless posts, Stack Overflow answers, and
documentation written by the Ruby/Rails community. It is amazing. Now is a
**very** good time to be a nerd.

### Taking Payments: \*scared face\*

It really is terrifying. Maybe it isn't as scary if you've done it before and
know what you are doing. I didn't qualify.

Luckily we live in a fantastic age of modern convenience.

**Stripe**.

What an amazing service.

- No complicated merchant accounts or setup
- By developers, for developers
- Wonderful API
- Excellent resources for testing
- Solid documentation
- Easy integration

They handle a huge amount of the drudgery invloved with taking payments from
people on the internet. They remove the horrors of PCI compliance by providing
an implementation that allows you to take credit cards without ever actually
having the actual credit card numbers touch your system. They travel over
secure-socket-layer directly to Stripe, who responds with a token that allows
you to initiate an authorized charge. It is beautiful. Once you've authorized a
subscription, Stripe manages the recurring billing for you.

To help with the subscriptions, I found the [Koudoku
gem](https://github.com/andrewculver/koudoku) to be a great resource. While I
had to fork it and manipulate it to some extent for my specific needs, it does a
lot of the heavy lifting. I'm on the fence about using a gem to handle all of
this. On one hand, it is **very** easy. On the other, having your subscription
implementation tucked away in a "black box" can bite you when the shit hits the
fan. Give and take.

### What would I do differently?

**Testing**

**Testing**

**Testing**

It is tough, as a noob, to get in and write proper tests. **All** of the
resources I listed above discuss testing. I skipped it. You know what is
**really hard**? Going back through a non-trivial system and writing a solid
test suite.

This can't be said enough. Tests should **guide design of code** and when they
are tacked on later, they lose a big chunk of value. This isn't to say they
don't still provide immense value, but "test later" often means "test never" and
this isn't a good situation to be in.

I'm working on retrofitting tests, but it is a chore. Test early, test often.

### Summary

Building a subscription service is scary. Luckily the internet is stuffed full
of open source projects, examples, and helpful people sharing knowledge. Some of
it is free, but some of the best resources cost a few dollars. Worth every
penny.

Rails is a great framework for this sort of thing. I'd recommend it highly, if
you are trying to build an application that requires recurring billing for your
users.

**Test early, test often**. It's an additional thing to learn and understand if
you are just starting out, but it is worth the effort. If I could go back and do
anything differently, it would be to write solid tests along the way. Don't make
the same mistake with your apps!
