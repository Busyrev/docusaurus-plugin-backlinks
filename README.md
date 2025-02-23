# Docusaurus backlinks plugin

Adds Backlink component to your blog posts and docs resources.

![backlinks plugin demonstration](https://file.def.pm/yfvyM1BB.jpg)

Inspired by [anaclumos](https://github.com/anaclumos)'s [solution](https://github.com/facebook/docusaurus/discussions/8217).

## Demo

- 🖼️ [My personal blog](https://blog.amd-nick.me) + [My info resources](https://blog.amd-nick.me/docs)
- Send your resources to me if you make some changes and I'll add them to this list

## How to use

1. Install the plugin

```shell
npm install docusaurus-plugin-backlinks
```

2. Add the plugin to your docusaurus.config.js:

```js
module.exports = {
  plugins: [
    'docusaurus-plugin-backlinks',
  ],
}
```

3. Add the component to your page:

```jsx
import { Backlink } from "docusaurus-plugin-backlinks/components";
// ...
<Backlink documentPath="/docs/my-page" />
```

![explanation demo](https://file.def.pm/rt2667uy.png)

4. Build the site and enjoy your backlinks

```shell
# do not use yarn run dev, it will not work (works only after build)
yarn run build && yarn run serve
```

## How it works

Each time when you build the site, the plugin will generate a `backlinks.json` file in the `_backlinks` directory.

This file contains a map of all the links on the site, and the pages that link to them.

The challenge is that Docusaurus doesn't have suitable events and routing API to implement this elegantly, so I need to read and parse each docs file from the disk. For optimization purposes I use regex to parse markdown links instead of using special lexers. This may cause some **bugs like parsing commented links**, but I think it's an acceptable tradeoff for better performance on large sites.

Also you need to know that the plugin doesn't work in development environment, because we use postBuild event to generate backlinks.

Read my /docs resource that I dedicated to notes about developing this plugin
<!-- #todo add the real link. Why somebody need to search for this? -->

## TODO

- [ ] Improve component import method. I'm a JS newbie and couldn't figure out how to make JS and TS work together (getting "module not found" when using `export {Backlink} from './components/Backlink'`)
- [ ] Use `./backlinks.json` instead of `/backlinks.json` (generate file for each route separately)
- [ ] Maybe even generate .ts or .js files for each route instead of json (microoptimization?)
- [ ] Use titles instead of slugs in baklinks cards to made them more readable
- [ ] Write tests for the plugin. Try to break it and fix it. Especially try to find bugs with link parsing
- [ ] Add options to hide on mobiles, add ignored routes, etc.
- [ ] Add a way to add custom backlinks to the page (frontmatter or something)
- [ ] If Docusaurus adds routing API, we can avoid storing titles and excerpts in JSON files
- [ ] Also, it would be nice to wait for an API to get a list of entities in publications (like in Telegram API). Then we won't need hacky parsers and extra readings from the disk

## Personal dev notes

You can ignore it.

### Start developing "from scratch"

```shell
git clone git@github.com:AMD-NICK/blog.amd-nick.me.git
git clone git@github.com:AMD-NICK/docusaurus-plugin-backlinks.git
cursor blog.amd-nick.me docusaurus-plugin-backlinks
cd blog.amd-nick.me && yarn install && cd ..
cd docusaurus-plugin-backlinks && yarn install && yarn link && yarn run build:watch && ..
cd blog.amd-nick.me && yarn link "docusaurus-plugin-backlinks"
yarn run dev
```

### After changes

```shell
# upload changes to npmjs
cd docusaurus-plugin-backlinks
yarn publish --patch (--minor) (--major) (--new-version [version])

# update version in blog's package.json
cd ../blog.amd-nick.me && yarn add docusaurus-plugin-backlinks
```

<!--
related resources:

- https://docusaurus.io/feature-requests/p/backlinks-or-pages-that-link-here
- https://github.com/facebook/docusaurus/discussions/8217
-->
