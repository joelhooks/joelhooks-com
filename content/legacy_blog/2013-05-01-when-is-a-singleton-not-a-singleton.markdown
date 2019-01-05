---
layout: post
title: 'AngularJS, Dependency Injection, and when is a singleton not a Singleton?'
date: 2013-05-01
---

The Singleton is the Highlander of design patterns. **There can be only one**.

An example of a Singleton implementation might look something like this:

```js
(function(global) {
  'use strict';
  var MySingletonClass = function() {
    if (MySingletonClass.prototype._singletonInstance) {
      return MySingletonClass.prototype._singletonInstance;
    }
    MySingletonClass.prototype._singletonInstance = this;

    this.Foo = function() {
      // ...
    };
  };

  var a = new MySingletonClass();
  var b = new MySingletonClass();
  global.result = a === b;
})(window);
```

[from Tom Roggero](https://stackoverflow.com/a/6733919/87002)

The above JavaScript is from an [answer](https://stackoverflow.com/questions/1635800/javascript-best-singleton-pattern)
from StackOverflow that seemed resonable. I've never actually needed an enforced Singleton in JavaScript.
I suspect I never will, but... know thy enemy!

Singletons have some use cases, but it is generally considered poor form to use
them. They are especially bothersome when you start trying to unit test your
code. They effectively create global state, and shared state is a real pain to
manage when you are writing unit tests.

It **is** extremely handy to only have one instance of a thing within a certain
context, so how do we gain the benefit of a Singleton, without the pain?

## Dependency Injection (DI)

[Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) is a lovely thing. It can be accomplished in several ways, from simply
passing arguments into a constructor, to full blown DI containers like
[Guice](https://code.google.com/p/google-guice/),
[SwiftSuspenders](https://github.com/tschneidereit/SwiftSuspenders), and
[AngularJS](https://angularjs.org/). I'm not going to go to deep in this post, but [here is one from
the archives](https://joelhooks.com/2009/07/12/inversion-of-control-and-dependency-injection-in-flex-using-the-parsley-application-framework-part-1/) that is still relevant (if you don't mind a little AS3). [Here are a couple](https://misko.hevery.com/2008/11/11/clean-code-talks-dependency-injection/) of awesome talks from Miško Hevery that I highly recommend.

Most containers have a mechanism for
providing _context-based singletons_.

## Context-Based singletons.

With a DI container, we have contexts. In the case of AngularJS, we have
the application module, which provides the overall container for a given
application. Within this container we define dependencies that can be
liberally injected into other actors within the module, such as directives,
controllers, and/or utility classes. The module and its sub-modules **are** the context.

```javascript
angular
  .module('someModule', [])
  .service('mySingletonThing', MySingletonThing);
```

Here's a very typical line of config code in an AngularJS application. This configures
a service for `someModule` called `mySingletonThing`. `mySingletonThing` is a
singleton, but it is not a Singleton. `MySingletonThing` does not enforce its
singleton nature. We can create as many instances as we desire. We won't, but it
is nice to have freedom. ;)

Instead we rely on AngularJS's ability to inject dependencies.

```javascript
angular.module("someModule").
    controller("MyController", ["mySingletonThing", function(mySingletonThing) {
        //do stuff
    };

angular.module("someModule").
    controller("MyOtherController", ["mySingletonThing", function(mySingletonThing) {
        var hahaTakeThat = new MySingletonThing();
        console.log(hahaTakeThat === mySingletonThing); //false
    };
```

When we talk about a context-based singleton, these defined dependencies
are what we mean. Within a given context the _DI container_ will only allow a single
instance of the object to be injected. The object itself does not protect
against or prevent multiple instances. You can `new`, `new`, `new` it all day long,
and there will be no complaints. With objects managed by a DI container you
should _never_ need to use `new` for objects that are injectable.

This provides you with all the benefits of a Singleton, with none of the
sadness. Now when you write your units tests, you can use as many individual instances as
you might need, without managing global state. **Joy**.

With Angular's DI implementation, we are a bit limited. Within a given module, we only
have access to a single context. This limits some flexibility that would
be gained by allowing nested contexts. Consider for example a user with
multiple accounts. What I'd really like is for each account to represent a
context that could have its **own** singleton objects. It would be **very**
handy to dynamically add/remove account sub-modules from the user. The singleton
injectables defined in the user module would cascade to sub-modules, but a
sub-module could also define its own singleton mappings, perhaps even overriding
the parent module's. I don't know if this is on the roadmap, but it would be awesome to
have a more robust injector.

## Conclusion

A Singleton is a singleton, but a singleton is not **always** a Singleton in the
_formal_ sense. The enforced Singleton is generally regarded as "**to be avoided**", but context-based
singletons are an extremely useful tool that play nice and
don't represent hairy global state. YMMV
