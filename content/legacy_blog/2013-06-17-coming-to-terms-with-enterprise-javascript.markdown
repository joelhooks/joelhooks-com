---
layout: post
title: 'Coming to Terms With Enterprise JavaScript'
date: 2013-06-17
---

## What is enterprise javascript?

Good question. One that might even make you chuckle[1] a little bit on the inside.
The word "enterprise" is definitely a loaded term. It could be considered by
some to be a buzzword. Others might say "Why are we talking about starships?"

When I use the term "enterprise" to describe software, I typically mean
"software that helps people get work done more efficiently." In this sense,
Angry Birds and your favorite Twitter client are not enterprise applications. A
Twitter client that has additional features to facilitate and track a company's
social engagement, on the other hand, might fall into the enterprise category.

An application that is used in a call center to track incoming support requests
is definitely "enterprise". A system that connects several "legacy" systems and
presents employees with a unified interface and saves 1000s of man-years every
month of application context switching? Enterprise.

Enterprise software is software that is sold to a business or government agency,
and not to individuals. Content management, billing, point of sale, payment
processing, customer relations, help desk, project management, enterprise
application integrations, time tracking, business intelligence... you get the
idea.

This is software for **getting things done**. This is software that **makes a business
money**. Because of this, it is software that businesses will invest heavily in.

## Enterprise isn't cool.

Maybe. It certainly evokes thoughts of ugly user interfaces with huge J2EE
backends. Developers working on Saturdays to get their TPS reports filed.
Enterprise software certainly can be that. It doesn't have to be.

Today's software users, even enterprise software users, are more sophisticated.
They are used to using applications like Facebook and Gmail on a daily basis.
They have iPhones that present beautiful easy to use interfaces and excellent
user experience (UX). They want more.

More importantly, perhaps, is that software that provides excellent UX makes it
easier to get work done. Using software that sucks, is slow, is ugly, or
generally misbehaves is counter-productive. Bad software represents lost revenue
and increased overhead. Employees that are forced into bad software are forced
to focus their energy on wrestling the software. Not only does this make them
miserable, but it saps a business's most valuable resource - the brain-power and
energy of their employees.

## Enterprise can be cool.

It can! It largely depends on how you define "cool." For me, my biggest thrill
in software development is eliminating cognitive overhead for people that are
trying to get work done. I want to make their working lives better. I want them
to be mentally free to concentrate on harder problems. I want their businesses
to make more money. I want them to see real value in their software, so that
they will keep hiring developers to build more software. Achieving these goals
is definitely cool.

## Where does JavaScript fit in?

In today's world, savvy enterprise customers demand rich experiences. They want
to be able to access their data anytime and anywhere. They carry smart phones
and tablets and expect their software to function on these devices as well as it
does on their desktop computers.
Arguably the quickest way to achieve this multi-screen approach is through web
applications. Applications that run, and run well, in any modern browser. You
don't have negotiate walled-garden app stores to deploy a web app.

HTML pages originated as a format for linking scientific documents. This was a
great achievement, but soon users wanted more interactivity. JavaScript was
introduced, and now we could begin to see richer experiences, right in the
browser. This eventually brought us to DHTML, or dynamic HTML. The next
evolution in web pages was AJAX, or asynchronous JavaScript and XML. This is a
huge step, allowing us to hit the server for additional data without moving to
an entirely new page.

These days we've gone a step further with single-page web applications. A
single-page app isn't a brochure-like web page for strictly delivering content.
It is a real application, built to do work. A single-page application is a
"thick" client that is more similar to a desktop application than a web page.

JavaScript has matured. HTML has matured. CSS has matured. All of these
technologies continue to see growth as their standards are updated to match
modern technology, and the demands of users.

Enterprises want to leverage these advances and build robust applications to
facilitate commerce. JavaScript is uniquely qualified as a programming language
to help with this. It allows us to harness the the computing power of modern
computers directly in the browser. In the past, we were forced to offload much
of the work for displaying a web page on to the server. A request was made and
the server generated a page that was displayed in the browser.

With modern JavaScript we are able to query the server for data via its
application programming interface (API) and use that data to dynamically update
content in the browser without actually changing URLs or reloading a page. The
client side application has its own templates and logic and can manage itself
tidily. The server is now a caretaker for data, while the application running in
the browser is entirely in charge of presentation and interaction with the data
that is provided.

JavaScript has been used in enterprise applications for many years. It is almost
as if we've come full circle. The major difference in modern applications is
that presentation concerns can now be completely offloaded to the client. We
aren't beholden to a JSP or other server-side page template for rendering
content for our users. After the initial payload of the web application is
delivered, the server's job is now reduced to handling requests for data. This
is still a big job, but the separation of concerns opens up a lot of
opportunity. Because the server's boundaries are clearly separated from
presentation and focused on data, we are able to build APIs that can support
infinite possibilities in terms of how we present and interact with the data
that is flowing from the server.
This is awesome. This is opportunity. We are going to take advantage of this.

## So what is enterprise JavaScript?

Enterprise JavaScript is used for building web applications that facilitate
commerce is some form or another. Enterprise JavaScript is likely going to be
larger and more complicated than a simple web page. Enterprise JavaScript is
probably going to be developed by a team, perhaps a large team or even several
teams, and will require stronger standards and practices than smaller
non-enterprise use cases.

Is it useful to tack on this "enterprise" label to JavaScript? Sometimes. When
you say that you are building an enterprise application, it definitely evokes a
mental image of what you are dealing with. Good or bad. You could say
"large-scale" JavaScript instead, but it wouldn't be as specific. I'm an
enterprise developer, and I use JavaScript. Enterprise JavaScript.

[1][https://enterprise-js.com/](https://enterprise-js.com/) is hilarious. Hint:
don't follow its advice!
