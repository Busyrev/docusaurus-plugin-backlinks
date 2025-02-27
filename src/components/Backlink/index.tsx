import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import styles from './styles'
import { translate } from '@docusaurus/Translate'

interface BacklinksData {
	links: {
		[path: string]: string[]
	}
	descriptions: {
		[path: string]: string
	}
}

type Props = {
	documentPath: string
}

const Backlink: React.FC<Props> = ({ documentPath }) => {
	const [backlinks, setBacklinks] = useState<BacklinksData>({ links: {}, descriptions: {} })
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	useEffect(() => {
		const fetchBacklinks = async () => {
			try {
				const response = await fetch('/backlinks.json')
				const data = await response.json()
				setBacklinks(data)
			} catch (error) {
				console.error('Error loading backlinks. Possible reasons: local development or internal error', error)
				// setBacklinks({ links: {
				// 	"/2023/12/15/long-polling": ["/test", "/lorem", "/artifacts", "/xss"],
				// }, descriptions: {
				// 	"/test": "Короткое описание буквально в несколько строк 🗒️, как часто может произойти на сайте ✍️. Встречайте: блаблабла",
				// 	"/lorem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
				// 	"/artifacts": "[Описание](https://google.com), *которое* [искалечено](#) всякими спец. символами 🤖. Вот так вот. 🤷‍♂️",
				// 	"/xss": "XSS [атака](javascript:alert('XSS')) <script>alert('XSS')</script>",
				// } })
			}
		}

		fetchBacklinks()
	}, [])

	const backlinkPaths = backlinks.links[documentPath] || []

	if (backlinkPaths.length === 0) {
		return null
	}

	return (
		<div style={styles.backlinkTable}>
			<h2 style={styles.backlinkTableH2}>
				{translate({
					id: 'backlink.title',
					message: 'This page is mentioned in:',
					description: 'Title of the backlinks block',
				})}
			</h2>
			<div style={styles.backlinkGridView}>
				{backlinkPaths.map((link) => (
					<Link to={link} key={link} style={styles.backlinkItemLink}>
						<div
							onMouseEnter={() => setHoveredLink(link)}
							onMouseLeave={() => setHoveredLink(null)}
							style={{
								...styles.backlinkItem,
								...(hoveredLink === link ? styles.backlinkItemHovered : {})
							}}
						>
							<h3 style={styles.backlinkTitle}>
								{link.split('/').filter(Boolean).pop()}
							</h3>
							<pre style={styles.backlinkItemText}>
								{backlinks.descriptions[link] || ''}
							</pre>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Backlink
