import {
  Typography,
  Grid,
  Card,
  Avatar,
  makeStyles,
  CardContent,
  Box,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { ICard } from '../../interface/card';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
  card: {
    display: 'flex',
    backgroundColor: theme.palette.type === 'dark' ? '#444444' : '#F8F8FF',
    color: theme.palette.type === 'dark' ? 'light' : 'grey',
    // textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textTransform: 'capitalize',
    height: 80,
    boxShadow: ' 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '&:hover, &:focus': {
      boxShadow: ' 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    },
    [theme.breakpoints.down('xs')]: {
      height: 55,
    },
  },
  avartar: {
    height: 60,
    width: 60,
    marginLeft: 10,

    backgroundSize: 'cover !important',
    backgroundPosition: 'center !important',
    [theme.breakpoints.down('xs')]: {
      height: 40,
      width: 40,
    },
  },
  sekeleton: {
    height: 25,
    width: 150,

    [theme.breakpoints.down('xs')]: {
      height: 15,
      width: 80,
    },
  },
  contactText: {
    fontSize: 17,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));

const CustomCard: React.FunctionComponent<ICard> = (props) => {
  const classes = useStyles();
  const { name, url, loading } = props;
  return (
    <Grid className={classes.root} item xs={6} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        {loading ? (
          <Skeleton
            animation="wave"
            variant="circle"
            className={classes.avartar}
          />
        ) : (
          <Avatar className={classes.avartar} alt={name} src={url} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            {loading ? (
              <Skeleton animation="wave" className={classes.sekeleton} />
            ) : (
              <Typography component="div" className={classes.contactText}>
                {name}
              </Typography>
            )}
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default CustomCard;
