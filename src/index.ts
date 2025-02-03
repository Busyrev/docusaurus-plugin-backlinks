import {aliasedSitePathToRelativePath, resolveMarkdownLinkPathname} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

const plugin = function() {
	return {
		name: 'docusaurus-plugin-backlinks',

		async postBuild({plugins, outDir}: {plugins: any[], outDir: string}) {
			const allContent = await getBlogAndDocsContent(plugins)
			const backlinksMap = await getBacklinksMap(allContent)
			await saveToFile(backlinksMap, path.join(outDir, 'backlinks.json'))
		}
	};
};

export default plugin;

interface BlogPost {
	content: string;
	metadata: {
		source: string;
		permalink: string;
		description?: string;
	};
}

interface DocItem {
	source: string;
	permalink: string;
	description?: string;
}

async function getBlogAndDocsContent(plugins: any[]): Promise<BlogPost[]> {
	const blogPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-blog')
	const docsPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-docs')

	const blogPosts = blogPlugin?.content?.blogPosts || []
	const docItems = docsPlugin?.content?.loadedVersions[0]?.docs || []

	return [
		...blogPosts.map((post: any) => ({
			content: post.content,
			metadata: post.metadata
		})),
		...docItems.map((doc: DocItem) => ({
			content: fs.readFileSync(aliasedSitePathToRelativePath(doc.source), 'utf8'),
			metadata: {
				source: doc.source,
				permalink: doc.permalink,
				description: doc.description
			}
		}))
	]
}

interface ResolverContext {
	siteDir: string;
	contentPaths: {
		contentPath: string;
		contentPathLocalized: string;
	};
	sourceToPermalink: Map<string, string>;
	sourceFilePath: string;
}

function getMarkdownLinkResolver(pages_with_metadata: any[]) {
	function createResolverContext(file_permalink_dict: {[key: string]: string}): ResolverContext {
		return {
			siteDir: ".",
			contentPaths: {
				contentPath: 'blog',
				contentPathLocalized: 'docs',
			},
			sourceToPermalink: new Map(Object.entries(file_permalink_dict)),
			sourceFilePath: "override me",
		}
	}

	function createSourceToPermalinkDict(pages_with_metadata: any[]) {
		const dict: {[key: string]: string} = {}
		for (const {metadata} of pages_with_metadata) {
			dict[metadata.source] = metadata.permalink
		}
		return dict
	}

	const sourceToPermalinkDict = createSourceToPermalinkDict(pages_with_metadata)
	const resolverContext = createResolverContext(sourceToPermalinkDict)
	const registeredRoutes = new Set(Object.values(sourceToPermalinkDict))
	return (url: string, sourceFilePath: string) => {
		resolverContext.sourceFilePath = aliasedSitePathToRelativePath(sourceFilePath)
		return resolveMarkdownLinkPathname(url, resolverContext) ||
			(registeredRoutes.has(url) ? url : null)
	}
}

const ignoreRoutes = new Set(['/about', 'about'])

function isIgnoredUrl(url: string) {
	return url.startsWith('http') || url.startsWith('/tags/') ||
		ignoreRoutes.has(url) || url === '#' || url === '/'
}

interface BacklinksMap {
	links: { [key: string]: string[] };
	descriptions: { [key: string]: string };
}

async function getBacklinksMap(pages_with_metadata: any[]): Promise<BacklinksMap> {
	const resolveMarkdownLink = getMarkdownLinkResolver(pages_with_metadata)

	const backlinksMap = {
		links: {} as { [key: string]: Set<string> },
		descriptions: {} as { [key: string]: string },
	}

	for (const {content, metadata} of pages_with_metadata) {
		if (!content) {
			console.error("[backlinks-plugin] postBuild, content is undefined", metadata.source)
			throw new Error("Content is undefined")
		}

		const links = content.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g) || []

		for (const linkMarkup of links) {
			const [_, title, url] = linkMarkup.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/)

			const resolvedUrl = resolveMarkdownLink(url, metadata.source)

			if (resolvedUrl) {
				addBacklink(backlinksMap, resolvedUrl, metadata.permalink, metadata.description)
			} else if (!isIgnoredUrl(url)) {
				console.warn("🤔 [backlinks-plugin] postBuild hook, NOT resolved Url", url, " in ", metadata.source)
			}
		}
	}

	const links = backlinksMap.links
	const result: BacklinksMap = {
		links: Object.fromEntries(
			Object.entries(links).map(([k, v]) => [k, Array.from(v)])
		),
		descriptions: backlinksMap.descriptions
	}

	return result
}

function addBacklink(backlinksMap: any, resolvedUrl: string, permalink: string, description?: string) {
	if (!backlinksMap.descriptions[permalink]) {
		backlinksMap.descriptions[permalink] = description || ''
	}

	if (!backlinksMap.links[resolvedUrl]) {
		backlinksMap.links[resolvedUrl] = new Set()
	}
	backlinksMap.links[resolvedUrl].add(permalink)
}

async function saveToFile(data: any, filePath: string) {
	try {
		await fs.outputFile(filePath, JSON.stringify(data, null, 2))
	} catch (err) {
		console.error("[backlinks-plugin] postBuild hook, error writing backlinks.json", err)
		throw err
	}
}
