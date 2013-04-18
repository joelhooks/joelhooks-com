---
layout: post
title: "AngularJS and StateMachines"
date: 2013-04-04 09:50
comments: true
categories: 
published: false
---

basically the machine is a block of json that defines states and their transition to other states. You can only be in a single state at one time, and any given state has a limited number of other states that it can transition to. To actually do stuff when we land on states, it uses eventing and triggers a command. The machine is then listening for an action event, that corresponds to one of its transitions.

the angular gizmo gives the command its stuff

it is beautiful in a steampunk sort of way. A bit rustic, maybe bulky, but exactly suited to the task at hand.