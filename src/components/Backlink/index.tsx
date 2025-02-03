import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import styles from './styles'
import { translate } from '@docusaurus/Translate'

interface BacklinksData {
	links: {
		[key: string]: string[]
	}
	descriptions: {
		[key: string]: string
	}
}

type Props = {
	documentPath: string
}

const Backlink: React.FC<Props> = ({ documentPath }) => {
	const [backlinks, setBacklinks] = useState<BacklinksData>({ links: {}, descriptions: {} })

	useEffect(() => {
		const fetchBacklinks = async () => {
			try {
				const response = await fetch('/backlinks.json')
				const data = await response.json()
				setBacklinks(data)
			} catch (error) {
				console.error('Error loading backlinks:', error)
			}
		}

		fetchBacklinks()
	}, [])

	const backlinkPaths = backlinks.links[documentPath] || []

	return (
		<div style={styles.backlinkTable}>
			<h2 style={styles.backlinkTableH2}>
				{translate({
					id: 'backlink.title',
					message: 'Эта страница упоминается в:',
					description: 'Заголовок блока обратных ссылок',
				})}
			</h2>
			<div style={styles.backlinkGridView}>
				{backlinkPaths.length > 0 ? (
					backlinkPaths
						.sort()
						.reverse()
						.map((link) => (
							<Link to={link} style={styles.backlinkItemLink} key={link}>
								<div style={styles.backlinkItem}>
									<h3 style={styles.backlinkMentionedFileName}>
										{link.split('/').filter(Boolean).pop()}
									</h3>
									<pre style={styles.backlinkItemText}>
										{backlinks.descriptions[link] || ''}
									</pre>
								</div>
							</Link>
						))
				) : (
					<p style={styles.noBacklink}>
						{translate({
							id: 'backlink.noBacklink',
							message: 'Другие публикации не ссылаются на эту. Пока что',
							description: 'Сообщение, отображаемое при отсутствии обратных ссылок',
						})}
					</p>
				)}
			</div>
		</div>
	)
}

export default Backlink
