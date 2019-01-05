---
layout: post
title: 'Size and Composition of Effective Software Teams'
date: 2013-05-21
---

The success or failure of _any_ project is based on the team or teams working on
it. Teams are like fingerprints and snowflakes. They are composed of individuals
with unique experiences and skillsets. When we set out to build large
applications in a reasonable amount of time, we will generally build a larger
team composed of specialists to get it done. The specialties range from UI
developers to marketing experts, with many other areas of expertise in between.

How does a big team organize to work together effectively? I've seen several
approaches, and I want to talk about two. The first, which is not my preference,
is the creation "silos" for teams based on areas if expertise. The second is to
create cross-functional autonomous teams.

## Building silos

The first approach is to group teams based on their areas of influence. In this
case you might have a UI team, a server-side systems team, a qa team, a
marketing team, etc...

![photo credit: PXLated](/images/silos.jpg)

These teams might even be divided along vendor lines, for a project that
utilizes consultants to help deliver a project. This has some potential for
conflict related to a breakdown in communication.

What is wrong with this? It can lead to caustic relationships with "us v them"
mentality. Communication breaks down. Daily status meetings for teams don't
cross-pollinate ideas or current status of activities. Generally these teams
will require some sort of "ambassador" that shuttles information between the
teams. It leads to "waterfall" development where the server-side team needs to
finish work in order to hand it off to the UI team. The UI team will then finish
their part and hopefully hand it off to the QA team, unless they ran into issues
with integration and it needs to be handed back to the server-team.

This can work, but successful software is built on top of **communication**, so
how can we organize to help better facilitate that?

## Cross-functional and Autonomous

A cross-functional team is composed of members across the boundaries
specialties. This team might consist of ui specialists, server-side experts, qa
pros, as well as representitives from the business side of things including
product owner/business analyst and marketing gurus. These teams can shephard
virtually any functionality from start to finish.

![photo credit: Pink Sherbet Photography](/images/rainbow.jpg)

When a team is composed in this fashion, daily status meetings start to take on
more meaning. They facilitate active communication across disciplines and allow
members to interact more closely. It removes much of the us/them problem. It
doesn't matter who writes an individual team member's check or what their area
of expertise might be. They are a member of a team that can fully deliver value
with much less reliance on external dependencies.

Autonomy and the ability to get work done at a comfortable speed without
hitting hard stops to wait on another team to deliver allows teams to succeed.
Teams are modular, allowing the business to add new teams that have the
capability to deliver value to the project.

In most cases developers will be on a single team. The exception might be an
"architect" or devops specialist that serves as "glue" between the different
teams providing consistency. The same is likely true for the business analyst
and marketing specialist. It is important not to spread the business liasons too
thin. The teams should have well-groomed backlogs of work from which to pull
from.

## How big should a team be?

My favorite "rule" for team size comes from Amazon's [Jeff
Bezos](https://www.fastcompany.com/50106/inside-mind-jeff-bezos) who uses the
concept of "pizza teams":

> Bezos pursued his idea of a decentralized, disentangled company where small
> groups can innovate and test their visions independently of everyone else. He
> came up with the notion of the "two-pizza team": If you can't feed a team with
> two pizzas, it's too large. That limits a task force to five to seven people,
> depending on their appetites.

A "pizza team" might look like this:

- 1 designer/UX Specialist
- 1 or 2 UI developers
- 1 or 2 server-side developers
- 1 QA expert
- 1 product owner/business analyst

This is a very general list, but you get the idea. A team composed in this
fashion can **get shit done**. This is the ultimate goal.

Team size and composition is only one factor in the communication puzzle, but it
is an important one. In the end, whatever works for you and gets your software shipping is the best.
I've had experience working inside of both of these types of teams, and greatly
prefer the cross-functional approach. Regardless of how your teams are composed
remember that we are all on the **same team** and that the basic assumption that
the members of the team are both **smart** and **capable** are essential.

How do you organize teams? What has worked
for you, and conversly what has been completely **FUBAR**?
