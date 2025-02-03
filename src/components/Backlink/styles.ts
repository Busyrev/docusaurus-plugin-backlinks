export const styles = {
	backlinkTable: {
		margin: 'var(--ifm-spacing-vertical) 0',
		width: '100%',
		height: 'auto',
		padding: 'var(--ifm-global-spacing)',
		borderRadius: 'var(--ifm-pagination-nav-border-radius)',
		border: '2px solid var(--ifm-menu-color-background-active)',
	},

	backlinkTableH2: {
		fontSize: '0.8rem',
		color: 'var(--ifm-color-emphasis-400)',
	},

	backlinkGridView: {
		margin: '1rem auto',
		display: 'grid',
		gap: '0.5rem',
		gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
	},

	backlinkTitle: {
		margin: '0.5rem 0.5rem',
		fontSize: '1.2rem',
		padding: 'calc(var(--border-radius) / 4)',
		paddingBottom: '0.5rem',
	},

	backlinkItem: {
		padding: '0.1rem',
		border: '1px solid var(--ifm-color-emphasis-100)',
		borderRadius: 'var(--ifm-pagination-nav-border-radius)',
		transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
	},

	backlinkItemHovered: {
		backgroundColor: 'var(--ifm-menu-color-background-active)',
	},

	backlinkItemLink: {
		textDecoration: 'none',
	},

	backlinkItemText: {
		margin: 0,
		fontSize: '0.8rem',
		color: 'var(--ifm-color-emphasis-700)',
		fontFamily: 'var(--ifm-font-family-san-serif)',
		whiteSpace: 'pre-wrap',
		// border: '1px solid var(--ifm-color-emphasis-900)',
		// borderTopLeftRadius: 0,
		// borderTopRightRadius: 0,
	},

	noBacklink: {
		fontSize: '0.8rem',
		color: 'var(--ifm-color-emphasis-700)',
	},
};

export default styles;
