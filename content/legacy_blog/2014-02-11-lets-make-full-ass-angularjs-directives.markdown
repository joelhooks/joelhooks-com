---
layout: post
title: "Let's Make Full-Ass AngularJS Directives"
date: 2014-02-11
---

_With best intentions we set forth to create the mighty directive. The steepest slope of the dreaded AngularJS learning curve._

### The "place where the jQuery goes."

So what is a directive? We've [talked about this before](https://www.joelhooks.com/blog/2013/07/27/using-angularjs-stop-using-jquery-as-a-crutch/), and decided that they are **not** where the jQuery goes... usually... if you **are** going to use jQuery, directives are **definitely** where it should go.

It's easy to say "OMG, NO JQUERY" - but what does that actually mean? What does a **really kickass directive** look like?

### The Anatomy of a Good Directive.

The [ui-bootstrap](https://github.com/angular-ui/bootstrap) library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It's a robust open-source project, with a constant flurry of activity.

When you start to dig through the library's src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple.

While the solutions **are** varied, there are also some common traits the ui-boostrap directives share across the library.

#### Minimal use of the link function

How many of your project's link functions contain **all the things**?

_me: raises guilt hand sheepishly_

Down and dirty, just toss it in the `link` function.

When you start to browse the ui-bootstrap code, pay attention to the link functions on the directives themselves.

##### dropdown

```javascript
.directive('dropdown', function() {
  return {
    restrict: 'CA',
    controller: 'DropdownController',
    scope: {
      isOpen: '=?',
      onToggle: '&'
    },
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    }
  };
})
```

The **Dropdown** directive has a link function, but its sole purpose in life is to associate the directive with a controller.

**This is a good thing**

Why? Well, to be honest, directives can be a real pain in the ass to unit test. How do you make a directive easy to unit test? Don't give it any functionality.

Controllers, on the other hand, are easy to unit test, so we can avoid the headache of even thinking about unit testing a directive by offloading the logical bits to a controller.

#### The directive's controller

What does it look like? Basically, it looks like a normal controller.

##### DropdownController

```javascript
.controller('DropdownController', function($scope, $attrs, dropdownConfig, dropdownService, $animate) {
  var self = this, openClass = dropdownConfig.openClass;

  this.init = function( element ) {
    self.$element = element;
    $scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : false;
  };

  this.toggle = function( open ) {
    return $scope.isOpen = arguments.length ? !!open : !$scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return $scope.isOpen;
  };

  $scope.$watch('isOpen', function( value ) {
    $animate[value ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( value ) {
      dropdownService.open( $scope );
    } else {
      dropdownService.close( $scope );
    }

    $scope.onToggle({ open: !!value });
  });

  $scope.$on('$locationChangeSuccess', function() {
    $scope.isOpen = false;
  });
})
```

It's obviously **much** bulkier than the actual directive, but it's also crystal clear what the controller is doing. Normal controller stuff!

One particular item of note is the `init` function. In the directive above, you probably noticed that the link function did exactly one thing:

```javascript
dropdownCtrl.init(element);
```

Since you can't get at the element in the controller, this allows us to still have access to the element, but in a clean, testable, injected way.

If we were going to critique the controller, it might be about its access to `$element` at all. Is the controller the right place to be doing _any_ DOM manipulation, even if it is ever so slight? Where else would we do that if we aren't going to do it in the `link` function or the controller?

It needs to go someplace, and pedantic nitpicking is just a hobby.

#### Out at the boundaries

This facet of this clean gem of a directive sparkles bright:

##### dropdownService

```javascript
.service('dropdownService', function($document) {
  var self = this, openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function() {
    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      closeDropdown();
    }
  };
})
```

The AngularJS 'service' is where the boundaries of our applications live.

- connections to the outside world
- domain/data models
- core logic
- ...
- the DOM?

This actor is wonderful. It connects **all the dropdowns** and manages their shared state. In this case, we can only have one open drop down on the page. `dropdownService` keeps track of who that is, and if another drop down is opened, it snaps the current one shut before allowing the next to open.

Additionally, the service listens for events on the `document` to close the open drop down if the user clicks the page or hits the `esc` key.

One central place to encapsulate what would otherwise be confusing spaghetti logic on line 342 of a typical directive's `link` function.

### Pause and study

It really pays to take pause and review a little code when you sit down to write a complex directive. For one, ui-bootstrap covers a lot of ground. The entire point of Bootstrap (proper) is to provide a robust set of _typical_ components. Meaning, odds are the component you are building (at least the soul of it) is likely covered by the Boostrap component set.

ui-bootstrap conveniently provides this world class reference implementation of the most common web application components... the Angular Way™.
