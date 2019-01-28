#!/usr/bin/env node
const fs = require('fs')
const minimist = require('minimist')
const slugify = require('slug')
const _ = require('lodash')
const moment = require('moment')
const shortid = require('shortid')

const args = minimist(process.argv.slice(2))
const title = _.first(_.get(args, '_', ''))
const guid = shortid.generate()
const slug = `${slugify(title.toLowerCase())}~${guid}`
const date = moment().format('YYYY-MM-DD')
const dir = `./content/blog/${date}-${slugify(title.toLowerCase())}`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
} else {
  throw 'That post already exists!'
}

fs.writeFileSync(
  `${dir}/index.mdx`,
  `---
slug: ${slug}
guid: ${guid}
date: ${date}
title: "${title}"
published: false
---`,
  function(err) {
    if (err) {
      return console.log(err)
    }

    console.log(`${Title} was created!`)
  },
)
