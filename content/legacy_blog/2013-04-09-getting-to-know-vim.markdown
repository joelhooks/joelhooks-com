---
layout: post
title: 'Getting to Know VIM'
date: 2013-04-09
comments: true
---

## It's like coming full circle.

When I was first introduced to computers, they very much resembled what I see in
Terminal today. I've always had a distinct fondness for the command line
interface. That said, when I started using computers professionally most of my
time has been spent in fancy GUIs. Perhaps because of the roots of my obsession
I still have an affinity for these text based interfaces.

For the past several years, I've been constantly poking at vim. I've gone from
struggling to remember the `:wq` sequence to trying my damndest to use
`hjkl` instead of my arrow keys. I've used vim movement cheatsheets as
desktop backgrounds, and stopped using 'crutches' like nano when I'm working on
a server via ssh.

This year, I've decided to go full bore with vim. When I'm editing text, I want
to default to vim instead of the many other GUI options I tend to enjoy day to
day.

And I'm having some success!

The excellent [Practical Vim](https://pragprog.com/book/dnvim/practical-vim) has
been extremely helpful. The single most important thing I've done this go-around
is to completely remove _all_ of the dotfiles I've accumulated over the
years. Some custom bits with [Janus](https://github.com/carlhuda/janus)
installed on top of that. Janus is awesome, but I also had _absolutely no idea_ what was going on. It
installs all of the 'essential' plugins, but it is too much. I was generally
left hunting and pecking and doing things poorly.

So I stripped it down, and have been in the process of building up _my own
dotfiles_ line by line.

It now feels like a tipping point has been reached. I have some core
understanding of my editor, how it works, and what options are available. I plan
on documenting this process, including which tools have been useful so far.
Ultimately my interest in vim lies with using it in conjunction with tmux (rad
terminal multiplexer) to create a truly unixy command line development
environment.
