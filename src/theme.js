const theme = {
  colors: {
    white: `#ffffff`,
    black: `#333333`,
    grays: {
      vlight: `#f2f2f2`,
      light: `#f7f7f7`,
      med: `#e8e8e8`,
      dark: `#888888`
    },
    aqua: `#DCE5EA`,
    turq: `#59C6CA`,
    teal: `#6D97AA`,
    blue: `#6152F6`,
    pink: `#F6B8C3`,
    lyellow: `#f7e6d5`,
    skyblue: `#bce8ff`,
    red: `#C83D3A`
  },
  breakpoints: ['619px', '769px']
}

/**
 * Retrieves a value from the theme following the given
 * path. If not found, returns fallback.
 *
 * (My implementation of styled-system's function of
 * the same name).
 * @param path {string}
 * @param fallback {string}
 */
export function themeGet(path, fallback) {
  const props = path.split('.')
  // eslint-disable-next-line
  const result = props.reduce((acc, prop) => {
    if (acc.hasOwnProperty(prop)) return acc[prop]
  }, theme)
  return result ? result : fallback
}

export function getBreakpoint(index) {
  if (index < theme.breakpoints.length) return theme.breakpoints[index]
  throw new Error('invalid breakpoint index')
}

export default theme
