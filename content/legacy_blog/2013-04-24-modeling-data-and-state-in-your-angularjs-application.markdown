---
layout: post
title: 'Modeling Data and State in Your AngularJS Application'
date: 2013-04-24
---

## Respect your data. Contain your state.

![](./images/AngularJS-Shield-large.png)
Data and state are the foundation of your application. These two items should be
absolutely respected. As you work through the AngularJS documentation, these two
items are generally stored on the controllers. This works OK, but as your app
grows beyond the "todo list" it quickly breaks down. Controllers need shared
state, data needs to be contained, and it needs to be done in a consistent manner
that is easy to comprehend.

I've [written about
this](https://joelhooks.com/2011/03/12/an-introduction-to-robotlegs-as3-part-2-models/)
in the past, in the context of ActionScript 3 and the Robotlegs framework. This
approach is valid for JavaScript, but requires some translation to build something usable for
AngularJS.

## What is a Model?

> A model notifies its associated views and controllers when there has been a
> change in its state. This notification allows the views to produce updated
> output, and the controllers to change the available set of commands. A passive
> implementation of MVC omits these notifications, because the application does
> not require them or the software platform does not support them.
> [from
> Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

As the "M" in [MVC](https://www.codinghorror.com/blog/2008/05/understanding-model-view-controller.html), model classes **encapsulate** your application’s data and **provide an API** to access
and manipulate that data. The other classes in your application will make
requests of models via this API. When data on the model is updated, the model
dispatches events that the other classes within your application can react to.
Models are appropriate for capturing the domain logic, such as performing
calculations or other manipulations.

An example of this might be a shopping
cart. When an item is added to the shopping cart model, the new total for all of
the items in the cart will be calculated. The new total will then be stored on
the model for access by other classes within the application. By placing this
logic within your models, you ensure that it isn’t scattered across the entire
application and know exactly where to look to see how and when your data is
being manipulated.

In addition to controlling access to data, models maintain the state of your
application. Consider a list of objects. You want to keep track of which of
these objects is selected, so the data model has a selected property which is
updated with the currently selected item. Other areas of your application can
now access this property to discover which item is selected and react
accordingly.

As you can see, data and state are intimately related. **State is data, data is
state**.

Models are portable. There are many common sets of data that can easily
transport between one application and the next. Think of, as an example, a
`UserLoginModel` or a `ShoppingCartModel`. Portability takes a bit more thought and
energy, but no more than writing the same code over again for each project.
Obviously every model isn't going to qualify for this, but many will so it is
something to watch out for.

The model is the core of your application. The
visual components get all the ooos and aaahs, but as a developer you know that
data is the man behind the curtain. It is our jobs, as developers, to curate the
data and deliver it to those beautiful interface items accurately. This is why
isolating domain logic in the model is so important. By isolating it you have
made it easier to locate, update, and maintain.

We've dug into what a model is, but if you're like me, you are waiting to see
how to actually use models within an AngularJS application, so let's take a look
at that.

## Exploring the Code

<iframe width="100%" height="300"
src="https://jsfiddle.net/joelhooks/jWmck/embedded/js,result,html/"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This is a simple/naive example that has a list of authors with a poignant quote from
each. If you explore the example you will quickly notice that all of the data
and state is stuffed in the controller. This is OK for a trivial demo, and
something more complicated/non-trivial is difficult to present in a blog post.
It should be enough to present the concepts and gain some understanding on how
using models can reduce the overall cognitive load of more complex applications.

This "everything stuffed in a controller" approach works, but **we can do better**.

**note:** I'm using jsFiddle, and it puts obvious restrictions on how you
organize your code. I will be adding some thoughts on that in a future post, but
a monolithic single JS file isn't going to scale very well.

If you'd like to see a good write-up on structuring larger Angular apps, my
friend [Cliff
Meyers](https://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
wrote a great article on the subject.

## Introducing a Model to Store Data

In the above example, all of our data is stored within the controller on the
`$scope`. It is all hardcoded in the app as well, but we will talk about service
integration in the future. The task we want to accomplish now is a little
seperation of data and presentation. This doesn't mean that we won't be using
`$scope`. We will. AngularJS uses the `$scope` as a [Presentation
Model](https://martinfowler.com/eaaDev/PresentationModel.html). This is
fine, but we can still provide much nicer separation with a "proper" model for
the data.

<iframe width="100%" height="300"
src="https://jsfiddle.net/joelhooks/jWmck/7/embedded/js,result/"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

If you look at the JavaScript above, I think you will agree that it is already
starting to look a bit cleaner. While the controller's `$scope` is still
ultimately supplying the view with the data it craves, the actual data is housed
in a model. The model is a 'singleton' (of the lowercase 's' variety) defined as
an Angular service.

I found Angular's definition of "service" confusing at first. It has nothing
directly to do with what I consider a service, but is simply one of the methods
for defining dependencies for injection.

<iframe width="100%" height="300"
src="https://jsfiddle.net/joelhooks/jWmck/9/embedded/js,result/"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This is more like it. Now we have a tiny controller, and all of our data and
state is offloaded onto `authorListModel`. We've added the `setSelectedAuthor`
to the model, which dispatches an event. Our controller is listening for the
event, so it updates the `$scope` appropriately and the view displays the
information we expect.

This clean separation is going to pay huge dividends as the application grows in
scope. We can now easily separate the `textarea` that contains the quote from
the list of available authors.

**anti-pattern alert:** you might be tempted to add event listeners on your
model. Don't. It makes them harder to test and generally kills models in terms
of single-responsibility-principle. Since a model _has an_ event dispatch, which
can also listen for events, the temptation is always there. Ignore this warning
at your own peril! ;)

<iframe width="100%" height="300"
src="https://jsfiddle.net/joelhooks/jWmck/10/embedded/js,result,html/"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This is a bit silly, but shows the flexibility of this approach. The `textarea`
is now driven by its own controller. That controller is also listening for the
update event the model dispatches. Instead of inspecting the model, it uses a
parameter sent with the event to update `$scope.quote` and the magical Angular
binding does the rest. Nice.

## Do I really need to use events like this?

Most definitely **not**. Instead of the eventing I outlined above, you could
simply bind to the model. One of Angular's greatest strengths is its awesome
two-way `{{binding}}`.

<iframe width="100%" height="300"
src="https://jsfiddle.net/joelhooks/jWmck/12/embedded/js,html,result"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This is pretty nice, and is arguably cleaner than the eventing approach. In many
(most) cases, this approach might be preferred.

## Conclusion?

Models provide an excellent way to separate data and display. By migrating your
data and state to a model, you have much more flexibility with how that data is
presented. Models are also **prime** candidates for unit testing, as they
typically have exactly **one dependency** (some form of event emitter, in this
case the `$rootScope`) and contain highly testable domain
logic.

Hopefully this gets you started down the road of using models in your AngularJS
apps. In the near future, I will expand on models to discuss services (the
external kind) and how they play with this approach.

If you have any comments, questions, or critique please share. I'd love to hear
about how you solve this problem of separating view and data with AngularJS.

If you are looking for nuts & bolts lessons on AngularJS, it is hard for me to
express in words how awesome [John Lindquist's
egghead.io](https://www.egghead.io/) is. If you haven't already, go there now.

Join the conversation on [Reddit](https://redd.it/1d31fh) and [Hacker
News](https://news.ycombinator.com/item?id=5607330)
