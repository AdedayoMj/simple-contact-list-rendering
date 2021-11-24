import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Theme,
  Box,
  Tooltip,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import INavProps from 'src/interface/navBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    backgroundColor: (props) =>
      props.homeThem === 'dark' ? '#073642' : 'light',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
}));

const NavBar: React.FunctionComponent<INavProps> = (props) => {
  const classes = useStyles(props);
  const { homeThem, handletoggleTheme } = props;
  const icon =
    homeThem === 'dark' ? (
      <Brightness3Icon style={{ color: 'whitesmoke' }} />
    ) : (
      <Brightness7Icon style={{ color: 'whitesmoke' }} />
    );
  return (
    <Box
      className={classes.root}
      style={{ backgroundColor: '#073642 !important' }}
    >
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            Kuehne + Nagel
          </Typography>
          <Tooltip title="Change Theme">
            <IconButton onClick={handletoggleTheme}>{icon}</IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
