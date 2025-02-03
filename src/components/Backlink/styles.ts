export const styles = {
  backlinkTable: {
    width: '100%',
    height: 'auto',
    padding: 'var(--ifm-global-spacing)',
    marginTop: 'var(--ifm-spacing-vertical)',
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

  backlinkMentionedFileName: {
    margin: 0,
    fontSize: '1rem',
    padding: 'calc(var(--border-radius) / 4)',
    paddingBottom: '0.5rem',
  },

  backlinkItem: {
    borderRadius: 'var(--border-radius)',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--ifm-menu-color-background-active)',
    },
  },

  backlinkItemLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },

  backlinkItemText: {
    fontFamily: 'var(--ifm-font-family-san-serif)',
    fontSize: '0.8rem',
    whiteSpace: 'pre-wrap',
    color: 'var(--ifm-color-emphasis-700)',
    margin: 0,
  },

//   highlight: {
//     color: 'var(--ifm-color-emphasis-900)',
//   },

  noBacklink: {
    fontSize: '0.8rem',
    color: 'var(--ifm-color-emphasis-700)',
  },
};

export default styles;
