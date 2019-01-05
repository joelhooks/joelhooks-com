---
layout: post
title: 'Using Custom Jasmine Matchers to Make Unit Tests More Readable'
date: 2012-11-17
comments: true
---

![Clean and Dry](/images/clean_and_dry.jpg)

[Image from purplemattfish](https://www.flickr.com/photos/29601732@N06/3969905051/)

I'm a stickler for the "single assertion per test" guideline. One of the pillars of good unit tests is readability. Multiple asserts undermine this principle and make tests that are more difficult to read, understand, and maintain. A clean solution to this problem is to use custom Jasmine matchers in place of multiple assertions.

## Keep it DRY, Even (Especially?) in Tests

Consider the following:

In our app, we recieve a "split date" object from our service. It returns a value in the `{year: 2012, month: 11, day: 17}` format. We have some functionality that will convert the format back and for to a JavaScript `Date`.

This seems straight forward enough, but as it turns out we need to go the other direction as well:

This is bothersome. We have two stacks of `expect` calls that are very similar, but different enough to require a bit more than a helper method. We definitely want to verify all of the properties of the results, but do we really need to do this individually? The short answer is 'no.'

## Enter the Custom Matcher

A custom matcher is nestled in a `beforeEach` function. This will cause Jasmine to load the matcher prior to EVERY `describe` and `it` in your test suite.

Within the `beforeEach` is `this.addMatcher` that takes an `object` whose properties are your actual custom matchers. In our example the 'toEqualDate' matcher is the only property, but you can add as many as you might need for your application.

In the scope of the `toEqualDate` function, we pass in the `expectedDate` parameter. This is the argument passed into `toEqualDate(myExpectedDate)`. We also have access to `this.actual` that is the argument passed into `expect(myActualDate)` within your test.

The next important bit is the `this.message` function that Jasmine will use to display any custom error messages. In this case we are returning two messages as appropriate. The first will return an invalid match, and the second will return a message if either object is not a valid date (if they are undefined, null, or incorrectly formatted).

Finally the `toEqualDate` function will return true or false based on the values we are comparing. If they are indeed valid `Date` objects, it will compare them. If they are not, we return false.

At the top of the `beforeEach` we also have two utility methods to clean up our custom matcher.

## Keeping it Clean and DRY

I don't know about you, but these tests look a **lot** better to me. While the overall lines of code may have increased, we've created a reusable solution that can be used over and over again while not repeating ourselves. Our tests now have a single `expect` that is easy to understand and clearly expresses the intent of the test in an easy to read way.

## Additional Reading

[Official Documentation on Jasmine Matcher](https://github.com/pivotal/jasmine/wiki/Matchers)

[Custom Jasmine Matchers For Clarity In Testing Backbone.js Models](https://lostechies.com/derickbailey/2011/09/03/custom-jasmine-matchers-for-clarity-in-testing-backbone-js-models/)

[Custom jQuery matchers in Jasmine](https://testdrivenwebsites.com/2010/08/04/custom-jquery-matchers-in-jasmine/)
