---
layout: post
title: 'AngularJS Directives That Override Standard HTML Tags'
date: 2013-07-15
---

Directives are the heart and soul of AngularJS. They are incredibly powerful.
AngularJS sets out to extend the grammar of the browser to supply semantics that
facilitate the creation of web applications, going beyond the standard
hyper-linked web page. The primary weapon to accomplish this is the directive.

Creating your own directives is an awesome way to create composed, reusable
behaviors in your applications. This article isn't about making your own
directives, instead I wanted to take a closer look at the internal directives of
AngularJS. Specifically, we will be looking at how and why AngularJS extends the
functionality of native HTML tags like `<input>` and `<a>` to make the magic
happen.

## A is for Anchor

```javascript
var htmlAnchorDirective = valueFn({
  restrict: 'E',
  compile: function(element, attr) {
    if (msie <= 8) {
      // turn <a href ng-click="..">link</a> into a stylable link in IE
      // but only if it doesn't have name attribute, in which case it's an anchor
      if (!attr.href && !attr.name) {
        attr.$set('href', '');
      }

      // add a comment node to anchors to workaround IE bug that causes element content to be reset
      // to new attribute content if attribute is updated with value containing @ and element also
      // contains value with @
      // see issue #1949
      element.append(document.createComment('IE fix'));
    }

    return function(scope, element) {
      element.on('click', function(event) {
        // if we have no href url, then don't navigate anywhere.
        if (!element.attr('href')) {
          event.preventDefault();
        }
      });
    };
  },
});
```

The [`htmlAnchorDirective`](https://github.com/angular/angular.js/blob/master/src/ng/directive/a.js) has a simple job. It is there to prevent navigation and page reloading. Typically this is in conjunction with `ng-click`, which is used to actually capture the click and navigate the user within the application. Every `<a>` in your application is effectively extended by AngularJS. The functionality is primarily the `event.preventDefault()` that is applied if the anchor tag doesn't have an `href` attribute.

One thing to note, and this is typical throughout the AngularJS internals, is that this directive requires special attention for IE 7. When I'm digging around in the internals, I'm always appreciative of this effort made by the AngularJS contributors. These aren't fun problems to solve, and it is nice that somebody has made the effort to solve them for us :>

## Digging into \<form\>

[AngularJS overrides `<form>`](https://github.com/angular/angular.js/blob/master/src/ng/directive/form.js) to provide some important functionality. The core of this extension of `<form>` is to prevent any page refresh that would occur with an unmodified `<form>` tag. Lets have a look:

```javascript
var formDirectiveFactory = function(isNgForm) {
  return [
    '$timeout',
    function($timeout) {
      var formDirective = {
        name: 'form',
        restrict: 'E',
        controller: FormController,
        compile: function() {
          return {
            pre: function(scope, formElement, attr, controller) {
              if (!attr.action) {
                // we can't use jq events because if a form is destroyed during submission the default
                // action is not prevented. see #1238
                //
                // IE 9 is not affected because it doesn't fire a submit event and try to do a full
                // page reload if the form was destroyed by submission of the form via a click handler
                // on a button in the form. Looks like an IE9 specific bug.
                var preventDefaultListener = function(event) {
                  event.preventDefault
                    ? event.preventDefault()
                    : (event.returnValue = false); // IE
                };

                addEventListenerFn(
                  formElement[0],
                  'submit',
                  preventDefaultListener,
                );

                // unregister the preventDefault listener so that we don't not leak memory but in a
                // way that will achieve the prevention of the default action.
                formElement.on('$destroy', function() {
                  $timeout(
                    function() {
                      removeEventListenerFn(
                        formElement[0],
                        'submit',
                        preventDefaultListener,
                      );
                    },
                    0,
                    false,
                  );
                });
              }

              var parentFormCtrl = formElement
                  .parent()
                  .controller('form'),
                alias = attr.name || attr.ngForm;

              if (alias) {
                scope[alias] = controller;
              }
              if (parentFormCtrl) {
                formElement.on('$destroy', function() {
                  parentFormCtrl.$removeControl(controller);
                  if (alias) {
                    scope[alias] = undefined;
                  }
                  extend(controller, nullFormCtrl); //stop propagating child destruction handlers upwards
                });
              }
            },
          };
        },
      };

      return isNgForm
        ? extend(copy(formDirective), { restrict: 'EAC' })
        : formDirective;
    },
  ];
};
```

The above function is a factory that creates a form directive. The directive itself does several things. Aside from some memory management it also serves to prevent the default behavior of the form action. Typically with an AngularJS application, you will want to capture the user's input it a form, and feed that data into a controller to send it to the server. This is different from the standard `action` attribute of a form that will perform a POST operation and typically redirect the user to a new page. This behavior is probably not what you want in your single-page JavaScript application, so AngularJS is working to help prevent that. You probably still want to be able to submit your form, and the `ngSubmit` directive placed as an attribute on the `<form>` tag will execute an expression when your designated submit input is clicked.

If you're paying close attention, you'll notice that the form directive above has a `FormController` assigned to it. The `FormController` is the brains of all the forms within an AngularJS application, and every `<form>` gets one. The `FormController` tracks all of the controls within a form and manages the validity of the form.

## The Input Directive

```javascript
var inputDirective = [
  '$browser',
  '$sniffer',
  function($browser, $sniffer) {
    return {
      restrict: 'E',
      require: '?ngModel',
      link: function(scope, element, attr, ctrl) {
        if (ctrl) {
          (inputType[lowercase(attr.type)] || inputType.text)(
            scope,
            element,
            attr,
            ctrl,
            $sniffer,
            $browser,
          );
        }
      },
    };
  },
];
```

Wow! It's so simple ;)

It is. This is because [the actual `<input>` tag](https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js) is only the entry point. The real work is done based on the **type** of input that is being used. AngularJS is looking for the following input types:

- text
- number
- url
- email
- radio
- checkbox

With the URL, email, and number types, AngularJS provides some basic validation:

```javascript
var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
```

Here's the code for the URL type:

```javascript
function urlInputType(
  scope,
  element,
  attr,
  ctrl,
  $sniffer,
  $browser,
) {
  textInputType(scope, element, attr, ctrl, $sniffer, $browser);

  var urlValidator = function(value) {
    if (isEmpty(value) || URL_REGEXP.test(value)) {
      ctrl.$setValidity('url', true);
      return value;
    } else {
      ctrl.$setValidity('url', false);
      return undefined;
    }
  };

  ctrl.$formatters.push(urlValidator);
  ctrl.$parsers.push(urlValidator);
}
```

Simple stuff. It is using the REGEX above and setting the validity on the `FormController`, which you can then use to display feedback to the user. Email and number validation works in a similar fashion.

With text-type inputs AnglularJS also provides **data-binding** via `ngModel`, which is an extremely convenient solution to capturing user input and displaying it in the form. We should look at `ngModel` a bit closer in a future post.

## Just the beginning.

It wasn't immediately obvious to me when I started using AngularJS that the framework was overriding these default HTML tags to add the secret sauce on top. Once the realization dawned on me, it opened my eyes to the power and potential that directives hold. You aren't restricted to the extensions that AngularJS provides with these built-in directives. You can further extend the capabilities of HTML by creating your own directives that override and extend the native HTML elements.

Digging into the guts of the [AngularJS source code](https://github.com/angular/angular.js/tree/master/src) is a great way to learn the hows and whys of the framework, and can reveal techniques that can be applied to your own applications. The AngularJS source is well documented, cleanly written, and well tested. If you're working with AngularJS, I highly recommend diving into these internals and discovering this for yourself. It won't be time wasted.

You might also enjoy: <a href="https://joelhooks.com/blog/2013/05/22/lessons-learned-kicking-off-an-angularjs-project/"><strong>Lessons Learned: A Year with a Large AngularJS Project</strong></a>

or maybe: <a href="https://joelhooks.com/blog/2013/08/03/learn-angularjs-in-a-weekend/"><strong>Learn AngularJS this Weekend</strong></a>
