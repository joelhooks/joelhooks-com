---
layout: post
title: "Packaging Ruby Gems in a Jar using RVM"
date: 2013-02-20 12:16
comments: true
published: false
categories: 
---

http://www.jruby.org/download

http://blog.nicksieger.com/articles/2009/01/10/jruby-1-1-6-gems-in-a-jar/

jruby -S gem install -i ./compass-gems compass --no-rdoc --no-ri

jar cf compass-gems.jar -C compass-gems .

jruby -S gem list

jruby -rcompass-gems.jar -S gem list

http://mojo.codehaus.org/exec-maven-plugin/usage.html

edited version.rb