import { pink } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        light: '#0eafa0',
        main: '#00756A',
        dark: '#00756A',
        contrastText: '#fff',
      },
      secondary: {
        light: '#71708C',
        main: '#46455C',
        dark: '#c60055',
        contrastText: '#fff',
      },
      openTitle: '#3f4771',
      protectedTitle: pink['400'],
      type: 'light'
    }
  })

  export default theme