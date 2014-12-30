---
layout: post
title: "TodoMVC: React + RxJS + Angular 2.0 DI"
date: 2014-12-29 17:31
comments: true
categories: angularjs, react, rxjs
published: false
---

There's a great post from [Merrick Christensen](http://merrickchristensen.com/articles/react-angular-di.html) that explores the idea of using Angular 2.0's DI tool with the React framework. Why would you do this? Well, depndency injection solves a very real problem when writing tests. It's a lot easier to test things when you can replace their dependencies cleanly and easily without a lot of configuration.

di.js is a bit rough around the edges. It is very much under development, but it is actually usable today.

Merrick shows that the idea is possible, but stops at a proof of concept. How would this look in a real application, or at the very least the ubiquitous TodoMVC?