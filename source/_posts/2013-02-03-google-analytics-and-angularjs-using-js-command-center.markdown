---
layout: post
title: "Google Analytics and AngularJS Using JS Command Center"
date: 2013-02-03 15:57
comments: true
published: false
categories: AngularJS, patterns, jsCommandCenter
---

I'm not going to spend a lot of time defining MVC. That said, it is necessary to at least come to terms with what we will be discussing here, and what Model-View-Controller (MVC) means in the context of an AngularJS application.

[jump past the intro…](#themeat)

##Model-View-Controller

* **Model**: Stores and manipulates application data/state.
* **View**: The presentation or UI layer.
* **Controller**: An intermediary between tiers.

Generally a simple concept, though in reality we experience some confusion. The trouble lies in how implementations of MVC differ from framework to framework and even with individual developers. 

With AngularJS, controllers are of the "view controller" type. They facilitate binding inside of HTML views via the `$scope`. Additionally methods attached to the `$scope` are available to the views. This allows controllers to react to user interactions and other events.

Controllers are also targets for dependency injection, allowing you to deliver stateful models to the controller. This is useful, as I try to keep controllers as stateless as possible. If state is managed within models, I've found that the application will ultimately be cleaner. State is a killer. Contain it.

##Using Commands in AngularJS

One pattern that I enjoy is the Command pattern. Isolated chunks of logic that are (generally) executed in reaction to a system event. Given a centralized event bus, this allows for a very decoupled mechanism for applying business logic and shepherding interaction between MVC tiers.

AngularJS doesn't provide commands out of the box. That's OK, what AngularJS **does** provide is a centralized event bus and an injector for delivering dependencies.

Being comfortable with what I know to be a solid, fully tested command implementation found in robotlegs (an application framework built for AS3) I went directly to the unit tests of this framework to begin to understand the implementation. It uses a "fluent" API to easily map and umap commands. For the developer utilizing the library, you are only required to interact with the very simple CommandMap api. Sounds right.

To port the library, I started at the unit tests. One by one I added the tests and implemented the library in JavaScript. It went amazingly well, and over a weekend I had a fully functioning JS port that I could trust. The next step was to create an [AngularJS adapter](https://github.com/joelhooks/js-command-center/tree/master/src/angularCommandMap). 

The adapter went right into production, with only a couple minor issues, and the results were great. We still use controllers the Angular Way, but our system is augmented to facilitate cross-cutting concerns in a tidy fashion. An additional benefit to our application is that controllers are only available when their given view is being displayed. This is fine, in most cases, but there are definitely times when you want a bit of the controller tier to be always available to receive and react to events. We noticed this in particular relying on our "root" controller heavily. It started bloating and had upwards of 20 dependencies being injected into it. Excessive dependencies is a definite code smell. Luckily it is very easy to recognize.

##<a id="themeat">Analytics</a>

As an example of a cross-cutting concern, analytics makes a good case study. Here's a feature that we want to be flexible and basically available from anywhere. We want to track page-views, clicks, transactions, site search, and really tweak the analytics of the app to provide as much business value as possible. This is a feature that is going to evolve and will require iteration based on input from multiple business interests.

###Possible Solutions

* Globally available function
* Inheritance (class, object, prototype)
* Event based
* …

… or, there are quite a few viable solutions to this problem. Each with pros and cons. We use events already, so it made sense for us to look at an event based solution. Commands are *extremely* unobtrusive to implement in an existing code base. You can start with one Command that does a single thing, and leverage them appropriately. Beyond 

