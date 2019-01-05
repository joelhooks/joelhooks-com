---
layout: post
title: 'Using AngularJS? Stop using jQuery as a crutch.'
date: 2013-07-27
---

Have you ever heard (or said!) this:

"Directives? That's where the jQuery goes."

I definitely have.

In an effort to better understand
[@joshdmiller](https://twitter.com/joshdmiller)'s excellent
[ng-boilerplate](https://github.com/joshdmiller/ng-boilerplate), I
wanted to understand its dependency on Boostrap. More specifically, I wanted to
see if I could swap out Twitter Bootstrap for Zurb Foundation. Bootstrap is
great, but I really love using SCSS.

## Down the rabit hole...

Up until this point, I've completely ignored
[angular-ui-bootstrap](https://github.com/angular-ui/bootstrap), which is a wrapper for
Twitter Bootstrap that you can use with AngularJS. It hasn't been on my radar,
simply because I prefer Foundation. That was a mistake. This wonderful little
library is amazing. On many levels, it expresses the power and flexibility of
AngularJS like nothing else I have seen.

From the [angular-ui-bootstrap
README](https://github.com/angular-ui/bootstrap#native-lightweight-directives):

> We are aiming at providing a set of AngularJS directives based on Twitter
> Bootstrap's markup and CSS. The goal is to provide native AngularJS directives
> without any dependency on jQuery or Bootstrap's JavaScript. It is often better
> to rewrite an existing JavaScript code and create a new, pure AngularJS
> directive. Most of the time the resulting directive is smaller as compared to
> the orginal JavaScript code size and better integrated into the AngularJS
> ecosystem.

This struck me.

The only dependency that ui-bootstrap has on Twitter Bootstrap is the CSS style
sheets. All of the widgets work because they have been implemented with
AngularJS directives.

I was reading through some posts on the Google groups in my earlier quest to
find out how to integrate Foundation into ng-boilerplate (I'm stubborn!) and was
very interested in what Josh had to say:

<blockquote>You can wire up some callbacks and $apply calls to make a jQuery
plugin work but as Pawel said, rewriting something in AngularJS often takes less
work. jQuery doesn't have any of the binding or scope magic. When we cut out all
of the jQuery code that makes up for that, we're often left with very little
code. And when we put those few lines of code in an AngularJS directive,
everything will work out of the box. So in balancing levels of effort, rewriting
makes sense more often than it doesn't.<cite><br/>- <a
href="https://groups.google.com/d/msg/angular/Htkzt7Fsaog/TeFm5l4snTwJ">Josh
David Miller</a></cite></blockquote>

**Mind blown.**

In the post quoted above Josh also links to his [excellent Stack
Overflow](https://stackoverflow.com/questions/14994391/how-do-i-think-in-angularjs-emberjsor-other-client-mvc-framework-if-i-have-a/15012542#15012542)
post that expands on this viewpoint. You may have seen this already, but if you
haven't, go take 10 minutes to read through it.

> Don't even use jQuery. Don't even include it. It will hold you back. And when
> you come to a problem that you think you know how to solve in jQuery already,
> before you reach for the $, try to think about how to do it within the confines
> the AngularJS. If you don't know, ask! 19 times out of 20, the best way to do
> it doesn't need jQuery and to try to solve it with jQuery results in more work
> for you.

Bold words.

I'm convinced.

**jQuery is a crutch if you are writing AngularJS applications.**

If you're starting an AngularJS app, take a good look at
ng-boilerplate. Then take a look at [ui-bootstrap's directives](https://github.com/angular-ui/bootstrap/tree/master/src). They are a living
example of how you can do "jQuery things" with a fraction of the code, and build
an app that is easier to maintain, way more testable, and generally nicer to
work with.

P.S. If you were wondering, it is theoretically possible to simply use the
Foundation CSS with ui-bootstrap. There is some work being done in that regard,
and I'm looking forward to pitching in on it. I don't know that it will ever get
to "drop in replacement" status, but from the discussions I've read the future
looks promising on this front.

P.P.S This isn't a critique of jQuery. I think jQuery is awesome and has moved
the web forward considerably. Even within Angular, they use what is called
"jqLite" to give the core essentials of jQuery's functionality. In that sense,
just using Angular in the Angular way uses jQuery, but a minimal subset of it.
