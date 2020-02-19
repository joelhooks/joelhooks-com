---
layout: post
title: 'Stop writing For loops. Start using underscore.'
date: 2014-02-06
---

How many for loops did you write today? This week?

```javascript
var i;

for (i = 0; i < someArray.length; i++) {
  var someThing = someArray[i];
  doSomeWorkOn(someThing);
}
```

Sure. That's harmless enough. Ugly and weird, but not something to really complain about. But this is all too common:

```javascript
var i, j;

for (i = 0; i < someArray.length; i++) {
  var someThing = someArray[i];
  for (j = 0; j < someThing.stuff.length; j++) {
    doSomeWorkOn(someThing.stuff[j]);
  }
}
```

Which on the scale of bad code, isn't even **that** bad, but you start throwing some `if`s in there and the insanity really starts.

## I haven't written a For loop in two years.

"The hell you say?"

It's true. Cold turkey. Not a single one (ok, you caught me, I just wrote a couple above), and my code is easier to understand because of my abstinence.

How'd I do it?

```javascript
_.each(someArray, function(someThing) {
  doSomeWorkOn(someThing);
});
```

Or, even better:

```javascript
_.each(someArray, doSomeWorkOn); //thanks paulmcpazzi!
```

That's [underscorejs](https://underscorejs.org/) in action. Clean, easy to read, short, no variables, stacks of semi-colons... just plain nice.

Here's another example:

```javascript
var i,
  result = [];

for (i = 0; i < someArray.length; i++) {
  var someThing = someArray[i];
  // my hand already hurts from all this damn typing
  if (someThing.isAwesome === true) {
    result.push(someArray[i]);
  }
}
```

Again, a typical use case for the time honored `for` loop. Meh. Like an ex-smoker or a recently converted vegan, even the sight of the thing fills me with righteous indignation.

```javascript
var result = _.filter(someArray, function(someThing) {
  return someThing.isAwesome === true;
});
```

As the underscore method name `filter` suggests, this handy 3 lines of easy to parse code gives me a new array of **awesome things**.

Or maybe I'd like to do some work on the things and get a new array of the results?

```javascript
var result = _.map(someArray, function(someThing) {
  return trasformTheThing(someThing);
});
```

Those three functions are insanely useful on a daily basis, and don't even scratch the surface of what underscore brings to the table.

```javascript
var grandTotal = 0,
  somePercentage = 1.07,
  severalNumbers = [33, 54, 42],
  i; // don't forget to hoist those indices;

for (i = 0; i < severalNumbers.length; i++) {
  var aNumber = severalNumbers[i];
  grandTotal += aNumber * somePercentage;
}
```

Oy.

```javascript
var somePercentage = 1.07,
  severalNumbers = [33, 54, 42],
  grandTotal;

grandTotal = _.reduce(
  severalNumbers,
  function(runningTotal, aNumber) {
    return runningTotal + aNumber * somePercentage;
  },
  0,
);
```

It seems a little weird at first, and I **still** hit the docs for methods like **reduce** above. Knowing they exist, and a flat refusal to use for loops is my primary weapon. The above methods are really just scratching the surface. The underscorejs library is filled with awesome utilities like this that can be combined together to create new and wonderful things.

## The 30 day no-loop challenge

Stop.

For the next 30 days, don't write any for loops. If you see a nasty pile of those gnarly things, replace them with an **each** or a **map**. Do a little **reducing**. And let me know how it goes!

Beware. Underscore is the gateway to functional programming. What has been seen, can't be unseen. In a good way!

If you're wanting to dig a little deeper, you should jump over to this tutorial on [functional programming in javascript](http://reactivex.io/learnrx/). It's great and only takes about 1/2 hour to work through. It is "how the sausage is made" fundamentals for the underscore functions I used above. Lot's of wholesome nerd fun!

**note**: _As a more performant alternative to underscore, you might check out [lodash](https://lodash.com/benchmarks)_

**note**: _it should also be noted that modern browsers support the above methods natively. `Array.forEach`, `Array.reduce`, and `Array.map` exist, but to use them you likely need to create shims to fallback for cases when they don't exist. For me, having the consistent underscore (lodash) API is much more convenient. YMMV_

**note**: Yes, for loops **are** faster. I optimize for readability and ease of use for my team before squeezing performance out of CPUs. I don't write games, or rich animated consumer experiences. Big projects, 10s of developers, code that already trends towards sprawling and messy.

The "clean readable code" optimization pays huge dividends, even if it comes at the cost of (very) marginal performance hits.

Now, if we are doing a big list of items in Angular, we focus on performance in terms of CPU, but even then, the only time we hit a wall with an unoptimized datagrid was on last-gen Android phones.

Clean first! ;)
