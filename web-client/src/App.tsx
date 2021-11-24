import React from 'react';
import {
  ThemeProvider,
  createTheme,
  makeStyles,
  Theme,
  Box,
} from '@material-ui/core';
import NavBar from './components/navBar';
import HomePageView from './components/home';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));
const App: React.FunctionComponent = () => {
  const [darkMode, setDartMode] = React.useState(true);
  const classes = useStyles();
  //create global theme
  const theme = createTheme({
    palette: {
      primary: { main: '#073642' },
      error: { main: '#f44336' },
      type: darkMode ? 'light' : 'dark',
    },

    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });
  //function to toggle themchange
  const handletoggleTheme = () => {
    setDartMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <NavBar
          homeThem={theme.palette.type}
          handletoggleTheme={() => handletoggleTheme()}
        />
        <HomePageView />
      </Box>
    </ThemeProvider>
  );
};
export default App;
