---
layout: post
title: 'Configuring Dependency Injection in AngularJS'
date: 2013-08-18
---

Dependency injection is the act of supplying values or object instances (dependencies) to target objects
from outside of the target object. In many (most?) cases this is automated
by a framework, such as AngularJS.

This means that a given target object does **not** create its own dependencies,
through the use of the `new` keyword or other creation methods.

By creating and managing dependencies
outside of an object, it makes it much easier to switch out that dependency as
needed. This is very useful when you are writing your unit tests, and can have
many advantages in larger systems.

There are only three ways for an object to resolve its dependencies:

- internally, via the `new` operator
- lookup via a global variable (requirejs is an example)
- the dependency is passed to the object

The third option is _dependency injection_, and it is the preferred approach in
AngularJS apps.

## Defining your dependencies

Dependency injection is a core feature of AngularJS. There are 3 approaches to
defining your dependencies, ordered by complexity from least to most:

- module.service
- module.factory
- module.provider

**note:** _AngularJS also provides `value` and `constant` dependencies. We aren't
going to get into those two today._

Both `service` and `factory` are abstractions that sit on top of `provider`.
Using `factory` and `provider` will give you more flexibility, but are more
verbose.

Before we look at how to use these tools, let's take a look at the AngularJS
source code and understand how they work.

### Interlude into the AngularJS internals

If you're a geek like me, you might be curious as to what is going on under the hood
when you declare dependencies.

I mentioned earlier that `service` and `factory` were abstractions on top of `provider`.
To show you exactly how that works, we need to open up `injector.js` in `src/auto/`
folder in the AngularJS source code:

```javascript
function provider(name, provider_) {
  if (isFunction(provider_) || isArray(provider_)) {
    provider_ = providerInjector.instantiate(provider_);
  }
  if (!provider_.$get) {
    throw $injectorMinErr(
      'pget',
      "Provider '{0}' must define $get factory method.",
      name,
    );
  }
  return (providerCache[name + providerSuffix] = provider_);
}

function factory(name, factoryFn) {
  return provider(name, { $get: factoryFn });
}

function service(name, constructor) {
  return factory(name, [
    '$injector',
    function($injector) {
      return $injector.instantiate(constructor);
    },
  ]);
}
```

As you can see at a glance, `service` calls `factory` which calls `provider`. So, when it
gets right down to it, these three methods are the exact same thing. Convenient!

Almost the exact same thing.

There is a subtle difference. The AngularJS `service` uses
`$injector.instantiate` on the constructor function that you pass in. This means
that internally the `service` creates an instance of your function with the
`new` operator. This will provide the resulting object a valid 'this' scope.

Using **`factory` doesn't call `new` on the function that is passed in**.
When using `factory`, the function that is passed in is called directly, and an
object is expteded to be returned.

Hat tip to
[@ThomasBurleson](https://twitter.com/ThomasBurleson) for pointing this
out. This can be confusing if encountered in the wild. Now you know.
Half the battle.

Let's start with the simplest use case. The `service`.

### Defining a service in AngularJS

A service instantiates a constructor function.

```javascript
(function(angular) {
  var module = angular.module('myApp.myModel', []);

  var MyModel = function MyModel(asyncService) {
    return {
      someApi: function() {
        return asyncService.getStuff();
      },
    };
  };

  module.service('myModel', ['asyncService', MyModel]); //simple option
})(angular);
```

In this example we are creating a module that will store a model that grabs data from some asynchronous
service. The `myModel` service will return an instance of `MyModel` when it is requested
for injection by other objects. The instance of `MyModel` is a singleton, and only one instance will
ever be created and used by the application.

This example could actually be even simpler if the injectable doesn't require any additional
dependencies.

```javascript
module.service('myModel', MyModel); //most simple option
```

`module.service` requires only two arguments. A string for its unique name, and a constructor
to create an instance of. This approach is useful, and most of the time is probably all you need
for your application.

When you need more flexibility than the `service` provides, it is time to look at `factory`.

### Defining a factory in AngularJS

A factory returns an object.

```javascript
(function(angular) {
  var module = angular.module('myApp.myModel', []);

  var MyModel = function MyModel(asyncService) {
    return {
      someApi: function() {
        return asyncService.getStuff(); //promise?
      },
    };
  };

  module.factory('myModel', [
    'asyncService',
    function(asyncService) {
      //could do some stuff here
      return new MyModel(asyncService);
    },
  ]);
})(angular);
```

Using a `factory` provides additional flexibility. By providing a factory function
over a straight constructor, you are provided with the opportunity to do some work
prior to returning the object. You are also in charge of creating the
instance that you want returned, unlike `service`, which creates the
instance for the constructor function you provide.

The above example is obviously not
doing anything interesting, but when you need to do some work prior to resolving a
dependency, a factory can be a good choice.

In the real world, I've used `factory` to provide a configurable mock data "mode". The
factory function would check to see which mode the app was in, and dynamically switch
between mock and real data. This can be incredibly handy when you want to work with out
depending on external services.

Note that the factory function will be called exactly **one time**. Any work you do
will only be done once, and `myModel` will be whatever your factory function returns.
In this case, we are simply returning an instance of `MyModel`, but a factory can return
objects _and_ functions. Use that to your advantage.

The last way to define dependencies is with `provider`. Let's look at that next.

### Defining a provider with AngularJS

```javascript
(function(angular) {

    var module = angular.module("myApp.myModel", []);

    var MyModel = function MyModel() {
        return {
            asyncService: null,
            someApi: function {
                return this.asyncService.getStuff(); //promise?
            }
        }

    }

    var myModelProvider = {
        model: new MyModel();
        $get: ['asyncService', function (asyncService) {
            this.model.asyncService = asyncService; //"manual" dependency injection
            return this.model; //resolved for the lifetime of app
        }]
    };

    modules.provider('myModel', myModelProvider);
}(angular))
```

As you can see, `provider` is lower level. Explicit and verbose. The `$get` function
is used by AngularJS internally for the injector. A provider is **required** to have a `$get`
function. When using `factory` (and `service` as well) the `$get` function is defined for
you.

For all practical purposes you will likely never need to use `provider` unless you are a
control freak. In most circumstances a `factory` or `service` will suffice, but it is nice
to know that `provider` is there, if you needed that level of explicit control for some reason.

One thing to note about providers is that the provider is _available during **configuration phase** of a module_. While I haven't found a specific use case for this, it is something to have in your toolbox.

### A little trick for dynamic dependencies

I mentioned before that with a `factory` (or `provider`) you can return an object or a function.
As it turns out, this can be very useful if you need to dynamically update a resolved dependency.
Here's a simple example using a factory.

```javascript
module.factory('myDynamicInjectable', function() {
  var count = 0;
  return function() {
    count = count + 1;
    return count;
  };
});
```

This is an extremely trivial example, but now when you inject `myDynamicInjectable` and call it,
it will return the freshly incremented `count`.

**warning:** _don't do this. There are two things wrong with this example. It is storing state
with the count variable, and then it is manipulating state. This isn't the appropriate location
for either of those activities! A better solution would be to create an object that stored
that state and provided a nice API for manipulating it._

A more realistic (useful) use of this might look like this:

```javascript
module.factory('getCurrentShoppingCart', [
  'getCurrentAccount',
  function(getCurrentAccount) {
    return function() {
      //getCurrentAccount is also a factory that returns a function
      //perhaps a user can have multiple accounts?
      return getCurrentAccount().shoppingCart;
    };
  },
]);
```

There is a ton of dynamic flexibility you can take advantage of when returning functions from
both the `provider` and `factory` approaches. I'd proceed with caution. You could easily abuse this
flexibility. Don't use this approach to manipulate and/or store state in the providers! The
job of these tools is to **resolve dependencies**, and should be used only to **resolve dependencies**.

## Conclusion

AngularJS provides several ways to configure dependency injection. From the simple `service` to the more flexible
`factory` and `provider` approaches. You should have a solid understanding of how these work
under the hood, and what situations are appropriate for each method.

P.S. This article is the expansion of the answer to a question that was emailed to me.
If you have any questions, I'd love to help you out. My email and twitter can be found below, and I
answer them all.

**Related:**

- [AngularJS, Dependency Injection, and When Is a Singleton Not a Singleton?](/blog/2013/05/01/when-is-a-singleton-not-a-singleton/)
- [Modeling Data and State in Your AngularJS Application](/blog/2013/04/24/modeling-data-and-state-in-your-angularjs-application/)
