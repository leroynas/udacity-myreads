import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#60ad5e',
      main: '#2e7d32',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b2fab4',
      main: '#81c784',
      dark: '#519657',
      contrastText: '#000',
    },
  },
});

export default theme;
