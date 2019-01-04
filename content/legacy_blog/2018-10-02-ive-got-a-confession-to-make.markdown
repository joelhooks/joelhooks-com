---
layout: post
title: "I've got a confession to make 😭"
date: 2018-10-02
---

We don’t have a _single_ test covering our front-end/UI for egghead.io.

It’s **embarrassing.**

You know how it is. Testing is a good idea. It’s objectively better than the opposite, which in our case is click testing, twitter notifications, and relying on our user base to “smoke test” the application for us.

It’s barely professional, but our current situation isn’t unique.

The decision to write tests or not is often a matter of economics. Before egghead, working as a consultant building websites for other businesses, I was a testing zealot. At every opportunity I insisted that we absolutely, no excuses, 100% **had** to have automated tests in place if we were going to build a high quality product.

This is still true. I still believe this.

But when I started building egghead, it was heads down, get shit done, features as fast as possible eff tests mode.

Sometimes those early decisions come back to bite you. The system grows. Small choices take root and grow. That’s often good, but when it’s not the weeds creep through your entire project, setting choking out the good ideas and making the entire garden hard to maintain.

So we started writing tests for critical aspects of the business. Our accounting backend has excellent test coverage and it _helps me sleep at night_ knowing that or life blood flows through a quality system that we can count on. And it’s not just us. egghead instructors get paid royalties for their work. They rely on us, and put their trust in us.

When that trust is broken, it is so hard to regain.

Over the past two years we’ve been migrating our front-end from Rails erb server templates to React. It’s been a great project. A monsterous project in many ways, but worth the effort.

Once again, I chose to forge ahead with no tests.

I’m here to admit that I regret this decision, and want to start making changes. It’s embarrassing. It makes us look bad when something obviously broken ships to production. It’s particularly exacerbating when that something could have been easily prevented with some light automation, a couple integration tests, and a handful of unit tests!

The tools are out there. React applications are super testable. There are no excuses for it.

We have to make sure our users trust us. Their _trust_ is our lifeblood.

We are going to figure it out, and start making testing a priority.

Cheers,

Joel
