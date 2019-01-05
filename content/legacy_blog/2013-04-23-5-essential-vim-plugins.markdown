---
layout: post
title: '5 Essential VIM Plugins That Greatly Increase my Productivity'
date: 2013-04-23
comments: true
---

There are **a lot** of VIM plugins to choose from. An individual's list of what
would be considered "essential" is largely a personal matter. For any given
plugin, there is also probably going to be an excellent alternative plugin that does the
same basic thing in a slightly different way. I'm just starting to use VIM for
more than just quick edits of files on a server, and the plugins below are
solving very specific workflow issues that I've encountered while learning to be
productive in VIM.

**warning:** watch out for plugins, generally. For many (some included in my
list of favorites here) might hamper your ability to understand the core
functionality of VIM. Many times the problem is best solved by understanding how
you can accomplish the task with just VIM, and not a plugin. One of the biggest
barriers I had with getting over the initial learning curve was over-saturation
with plugins, as I [wrote
here](https://joelhooks.com/blog/2013/04/09/getting-to-know-vim/).

## Vundle

If any of these plugins had an "absolutely" in front of its "essential"
descriptor, it would be [Vundle](https://github.com/gmarik/vundle).

Vundle is short for VIM Bundle. It is spiritually alike to
[Bundler](https://gembundler.com/), and provides a clean easy way to manage
plugins that you install. In past VIM efforts, I didn't use any sort of scheme
for managing plugins, and it was allways a complete **mess**. Vundle has solved
this for me completely.

Vundle also allows me to rapidly reconfigure my setup across multiple machines,
which can be a real boost. It isn't really a day-to-day productivity booster,
but when you need it, it is great to have it configured.

## NERDTree

One of the first walls I hit was "how the heck do I navigate files in a
project?"

The solution is multi-pronged, and starts with
[NERDTree](https://github.com/scrooloose/nerdtree). The NERD Tree is a
filesystem explorer that looks something like this:

![NERDTree](/images/nerdtree.png)

It opens to your current directory, and allows you to drill down into folders.
This allows you to traverse your project and open files. It also has file
management capabilities for creating, deleting, and other common tasks.

NERDTree is fantastic for hunting something down, but there are other tools that
help solve this problem in different ways.

**note**: I was chastised a bit for this one on [Hacker
News](https://news.ycombinator.com/item?id=5597939). NERDTree **is** big, and
you might have better luck with `netrw` as suggested. I plan on digging in to
`:h netrw` to see if I can drop NERDTree off this list of (my) essentials.

##ctrlp

> Full path fuzzy file, buffer, mru, tag, ... finder for Vim.

[ctrlp](https://github.com/kien/ctrlp.vim) is **rad**. It really lets you fly
around your project's files. After a quick `let g:ctrlp_map = '<c-p>'` to map it
to a hotkey, you are off to the races. It has different modes that allow you to
jump to files, buffers, most recently used, as well as tags.

With no fault to ctrlp, I've had issues with tags and JavaScript. ctags is
behind the times, and DoctorJS lost its maintainer. Tern looks to have some
promise in this regard, and the VIM plugin is under heavy development. Having
solid JS tags would turbo-charge ctrlp for me, so I'm paying close attention to
ongoing development.

## Syntastic

[scrooloose](https://github.com/scrooloose) has several awesome VIM plugins,
including NERDTree above. I also get a lot of mileage out of
[Syntastic](https://github.com/scrooloose/syntastic). It is a simple linter that
highlights problems with syntax in a file. It works on `save`, and provides
meaningful feedback about warnings and errors.

## EasyMotion

Last, but in absolutely no way least, is the elegent
[EasyMotion](https://github.com/Lokaltog/vim-easymotion). This plugin is all
about navigating in the file you are currently editing.

![EasyMotion](/images/easymotion.png)

When activated with the `word` motion, EasyMotion assigns the first letter of
every word after the cursor with a letter-based hotkey. After the first 26
letters are used up, it switches to capitals. Those soon change to sections that
allow you to "drill in" and get very fine-grained movement across large
distances in your file. As your finger muscles get trained, the motion really is
**easy**.

This list isn't exhaustive, by any means. I also have several "essential"
plugins that I used specifically related to languages and file types that are
common for me. Vundle is probably the most essential out of this list. It has
been a huge help over the previous cut-n-paste horrid approach I've used in the
past. Running `:BundleUpdate` and watching Vundle march down my installed plugin
list, looking at the github repository for each plugin I've installed, and
updating them without any hassle at all is hugely satisfying.

If you are interested, my [dotfiles are stored
here](https://github.com/joelhooks/dotfiles). They are an ongoing process, but
there are some interesting things going on.

I'd love the hear about your essential VIM plugins. I'm always on the hunt for
new and interesting additions to my workflow.

{% render_partial _partials/consultancy_class.markdown %}
