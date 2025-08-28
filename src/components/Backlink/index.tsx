import React, { useEffect, useState } from 'react'

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

	useEffect(() => {
		const fetchBacklinks = async () => {
			try {
				const response = await fetch('/blog/backlinks.json')
				const data = await response.json()
				setBacklinks(data)
			} catch (error) {
				console.error('Error loading backlinks. Possible reasons: local development or internal error', error)
			}
		}

		fetchBacklinks()
	}, [])

	const backlinkPaths = backlinks.links[documentPath] || []

	if (backlinkPaths.length === 0) {
		return null
	}

	return (
		<ul>
			{backlinkPaths.map(link =>  <li><a href={link}>{backlinks.descriptions[link] || ''}</a></li>)}
		</ul>
	)
}

export default Backlink
