---
layout: post
title: "AngularJS End to End (E2E) Testing With Protractor"
date: 2013-07-17 16:59
comments: true
categories: angularjs, testing, programming, javascript, automation
published: false
---

https://github.com/juliemr/protractor

Angular 1.2 and Beyond http://www.youtube.com/watch?v=W13qDdJDHp8&feature=player_detailpage#t=2921s

ptor.findElement(protractor.By.x(‘...’));
ptor.findElements(protractor.By.x(‘...’));


protractor.By.className('redBtn')
protractor.By.css('.redBtn')
protractor.By.id('loginButton')
protractor.By.linkText('Go Home')
protractor.By.partialLinkText('home')
protractor.By.name('email')
protractor.By.tagName('h2')
protractor.By.xpath
protractor.By.binding("{{status}}")
protractor.By.select("user")
protractor.By.selectedOption("red")
protractor.By.input("email")
protractor.By.repeater("cat in pets")
protractor.By.("cat in pets").row(1).column("{{cat.name}}")

clear()
If this element is a text entry element, this will clear the value.
click()
Click this element.
getAttribute(name)
Get the value of a the given attribute of the element.
getCssValue(propertyName)
Get the value of a given CSS property.
getLocation()
Where on the page is the top left-hand corner of the rendered element?
getSize()
What is the width and height of the rendered element?
getTagName()
Get the tag name of this element.
getText()
Get the visible (i.e. not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.
isDisplayed()
Is this element displayed or not? This method avoids the problem of having to parse an element's "style" attribute.
isEnabled()
Is the element currently enabled or not? This will generally return true for everything but disabled input elements.
isSelected()
Determine whether or not this element is selected or not.
sendKeys(keysToSend)
Use this method to simulate typing into an element, which may set its value.

browser().navigateTo(url)
ptor.get(url)
browser().location().url()
ptor.getCurrentUrl()
binding(name)
ptor.findElement(protractor.By.binding('{{status}}')).getText()
input(name).enter(value)
ptor.findElement(protractor.By.input("user")).sendKeys(value)
input(name).check()
ptor.findElement(protractor.By.input("user")).click();
input(name).select(value)
See Select below.
input(name).val()
ptor.findElement(protractor.By.input("user")).getText()
repeater(selector, label).count()
ptor.findElements(protractor.By.repeater("cat in pets")).length()
repeater(selector, label).row(index)
ptor.findElements(protractor.By.repeater("cat in pets")).row(index)
repeater(selector, label).column(binding)
ptor.findElements(protractor.By.repeater("cat in pets")).row(index)..column(binding)
select(name).option(value)
ptor.findElement(protractor.By.id(‘selectId’).click();
ptor.findElement(protractor.By.css(‘option [value=”0”]’’).click();
select(name).options(value1, value2...)
ptor.findElement(protractor.By.id(‘selectId’).click();
ptor.findElement(protractor.By.css(‘option [value=”0”]’’).click();
ptor.findElement(protractor.By.css(‘option [value=”2”]’’).click();
ptor.findElement(protractor.By.css(‘option [value=”4”]’’).click();
element(selector, label)
See WebElement Methods Mentioned Earlier

