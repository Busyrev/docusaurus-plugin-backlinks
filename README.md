# Docusaurus backlinks plugin

## How to use

1. Install the plugin

```shell
npm i @koroligor/docusaurus-plugin-backlinks@latest
```

2. Add the plugin to your auto-doc-transform-config.js:

```js
module.exports = async function transformConfig(config) {
    
    config.plugins.push(
        '@koroligor/docusaurus-plugin-backlinks', // Сюда идет название плагина
    )

    return config;
};
```

3. Add the component to your page:

```jsx
import { Backlink } from "@koroligor/docusaurus-plugin-backlinks/components";
// ...
<Backlink documentPath="/docs/my-page/" />
```

4. Build the site and enjoy your backlinks

```shell
npm run build && exec npm run serve
```

## How it works

Each time when you build the site, the plugin will generate a `backlinks.json` file in the `_backlinks` directory.

This file contains a map of all the links on the site, and the pages that link to them.

The challenge is that Docusaurus doesn't have suitable events and routing API to implement this elegantly, so I need to read and parse each docs file from the disk. For optimization purposes I use regex to parse markdown links instead of using special lexers. This may cause some **bugs like parsing commented links**, but I think it's an acceptable tradeoff for better performance on large sites.

Also you need to know that the plugin doesn't work in development environment, because we use postBuild event to generate backlinks.