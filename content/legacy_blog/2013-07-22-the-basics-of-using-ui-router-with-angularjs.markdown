---
layout: post
title: 'The basics of using ui-router with AngularJS'
date: 2013-07-22
---

URL routing is a popular approach to matching the contents of a URL to specific
functionality within a web application. URL routes programatically present
specific content to users based on the URL that they are visiting. It is a
popular approach that has proven to be very effective.

Something that might not be obvious is that URL routing is also a [finite state
machine](https://en.wikipedia.org/wiki/Finite-state_machine). When you configure
the routing for an app, you are laying out the various states the application
can be in, and informing the application what to display and do when a specific
route is encountered.

AngularJS supplies [URL routing](https://docs.angularjs.org/tutorial/step_07) by default.
It is adequate, but also has some limitations.

![A resonable application structure](/images/app-layout.png)

## So what's the problem?

Looking at the structure above, imagine an application where interacting with
items on the header or the sidebar causes the main content to load completely
different HTML. AngularJS provides a mechanism for this with `ng-switch`. You
can see a (very simple) example of this below.

<iframe width="100%" height="300"
  src="https://jsfiddle.net/joelhooks/Swm48/4/embedded/result,js,html"
  allowfullscreen="allowfullscreen" frameborder="0"></iframe>

In this case, `ng-switch` is swapping out `div` elements, but you can also use
this approach to swap out templates using `ng-include`.

I'm not going to explore this option. I'm not particularly fond of it.

**Why not?**

- The `ng-switch` adds markup that could be confusing
- The state of the main content area is captured and stored on a model
- It feels like "logic in markup", which I try to avoid
- If you go down the `ng-include` road, you need to remember to always put
  single quotes around your template names. I always forget. ;<

## ui-router

[ui-router](https://github.com/angular-ui/ui-router) fully embraces the
state-machine nature of a routing system. It allows you to define states, and
transition your application to those states. The real win is that it allows you
to decouple nested states, and do some very complicated layouts in an elegant
way.

You need to think about your routing a bit differently, but once you get your
head around the state-based approach, I think you will like it.

<iframe width="100%" height="300"
  src="https://jsfiddle.net/SvUjA/1/embedded/result,js,html"
  allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This example is functionally very similar to the `ng-switch` approach. The main
difference is that the main content area is populated with templated HTML for
each of the states, without using switching or `ng-include`.

```javascript
angular.module('app', ['ui.compat']).config([
  '$stateProvider',
  function($stateProvider) {
    var home = {
        name: 'home',
        url: '/',
        templateUrl: 'content.html',
      },
      red = {
        name: 'red',
        url: '/red',
        parent: home,
        templateUrl: 'content.red.html',
      },
      blue = {
        name: 'blue',
        url: '/blue',
        parent: home,
        templateUrl: 'content.blue.html',
      },
      green = {
        name: 'green',
        url: '/green',
        parent: home,
        templateUrl: 'content.green.html',
      };

    $stateProvider.state(home);
    $stateProvider.state(red);
    $stateProvider.state(green);
    $stateProvider.state(blue);
  },
]);
```

The above code is the configuration for the router. We are defining the `module`, but instead
of injecting `$routeProvider` as we would with stock AngularJS, we are injecting
a `$stateProvider` that is used to define the states. We are defining 4 states.

- `home` is the parent state of the next 3. It defines the header, siderbar, and
  the `ui-view` element that will be populated with the child states.
- `red` is the first child state. It references the `home` as its parent, as
  well as targeting its own template.
- `blue` and `green` are identical to `red`, but use different templates.

After the states are defined, they are added to the `$stateProvider`. They are
now ready to be navigated to.

```javascript
    .run(['$state', function ($state) {
       $state.transitionTo('home');
    }])
```

the `run` method is a great place to navigate to your intial state. You are able to
inject the now-resolved `$state` object and use its `transitionTo` method to set `home`
as the current state.

```javascript
    .controller('SidebarCtrl', function ($scope, $state) {

    $scope.content = ['red', 'green', 'blue'];

    $scope.setPage = function (page) {
        $state.transitionTo(page);
    };
```

The `SidebarCtrl` lists contains a simple array called content on its `$scope` which
is used in a `ng-repeat` to give us a simple menu. When one of those items is clicked
the `setPage` function is called with the item that was clicked. In this case, the
content items correspond to the names of the states that we've defined, so we simply
`transitionTo` the selected state to display the content of that state.

## Next steps with ui-router

This only really scratches the very surface of what you can pull off with
ui-router. There are a ton of options and the
[wiki](https://github.com/angular-ui/ui-router/wiki) is well put together. Some
things I didn't explore, but that are available:

- Passing data between states
- Listening for state events
- Named views (love this, it deserves its own post)
- URL Routing

**The ui-router README warns that the utility is still in active early
development**. The API is still subject to change, so if you choose ui-router for
your next project, that is something to be aware of.

Let me know if you'd like me to explore ui-router a bit deeper in future posts.
I think it is an excellent approach to routing, and look forward to using it
more.

**Update:** I've recorded a [screencast about ui-router](https://egghead.io/lessons/angularjs-introduction-ui-router) for egghead.io.

**Update 2:** Here's a [screencast about ui-router's named views](https://egghead.io/lessons/angularjs-ui-router-named-views) that I recorded for egghead.io. (note: it is paid/subscription content)
