---
layout: post
title: "Robust Data Models With AngularJS"
date: 2012-07-24 17:26
comments: true
published: false
categories: [AngularJS, JavaScript, Architecture] 
---
[AngularJS](http://angularjs.org) is a wonderful Javascript Model-View-Controller [MVC] framework for creating web *applications*. It uses a "thick client" approach, where the JavaScript application receives data from a server and **all** of the rendering occurs on the client-side.

Like my children, I love all of the tiers of MVC equally. I just happen to love models a little bit more. Data models are the solid bedrock upon which to build your application. Why? Models manage state. If you limit the management of state to a solid model structure, life can be a wonderful thing indeed.

Angular Scope
-

If you are reading the AngularJS documentation in any level of depth, you will quickly see that data "models" are generally objects or values attached to a [scope](http://docs.angularjs.org/guide/scope). Scopes are created with controllers, and are generally associated directly with a view component. View components can be as complex as a directive, or as simple as an HTML element that has been associated with a controller. All of an elements children will inherit from the scope, creating a hierarchy of scopes, all the way down to the rootScope, within an AngularJS application.

These scopes provide a lot of power within an application. It allows us to separate our concerns cleanly. A directive (view component) doesn't have to have direct access to its siblings or parent, but it can communicate through events via the scope. The scope provides a good number of beneficial APIs.

Scopes do a lot. They have a big job. Frankly I'd prefer not to burden them too much with the additional chore of holding application state by serving as a data model.

We Need Some Class
-

The dynamic nature of Javascript is truly a wonderful thing. I've especially come to enjoy it for unit testing, where creating spies and fakes has become practically effortless. While I love this ability to mold and shape objects at runtime, there are still times where I'd prefer a Class that I can apply some set of functionality to and extend within my application.

{% gist 3173217 Class.js %}

There are plenty of different ways to achieve inheritance in JavaScript, but the practical simplicity of [John Resig's](http://ejohn.org/blog/simple-javascript-inheritance/) will be suitable for this example (and beyond). it provides a simple syntax for creating an object with full prototypical inheritance, without a lot of the "boilerplate" that goes along with that. Just like any good base class should.

{% gist 3173217 MyModel.js %}

Nothing fancy. Just what we like. 

This approach to inheritance isn't the only approach you might use, it is just the approach that I am using in this example. You could replace it with many different implementations/solutions and achieve the same (or at least very similar) results.
