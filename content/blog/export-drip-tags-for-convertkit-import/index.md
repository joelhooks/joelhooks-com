---
slug: export-drip-tags-for-convertkit
date: 2019-01-15
title: 'Exporting Drip Tags for Import into Convertkit'
categories: ['tools']
featured: false
published: true
---
If you need to migrate your email list subscribers from Drip to Convertkit, you will run into the problem of importing each of your tags as an individual list into Convertkit.

If you follow the [official recommendation][1], they suggest that you export each individual tag from Drip. With each export taking 3 minutes to 12 hours, you could be there for a long long time.

To solve this for myself, I [wrote a simple node.js script][2] that reads in the subscribers.csv that contains ALL of my subscribers and parsed it to create individual csv files for each tag.

This saved me a shitload of time!

Here's a video overview:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Lx-UDHy90Bk" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />

[1]: https://help.convertkit.com/article/799-switch-from-drip
[2]: https://github.com/joelhooks/migrate-to-convertkit-from-drip