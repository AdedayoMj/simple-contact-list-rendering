import {
  Grid,
  Container,
  makeStyles,
  Theme,
  Box,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CustomCard from '../card';
import TextField from '@material-ui/core/TextField';
import api from '../../api/contact';

import Pagination from '@material-ui/lab/Pagination';
import logging from '../../common/logging';
const useStyles = makeStyles((theme: Theme) => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    margin: '1rem 0',
    marginTop: 'auto',
  },
  text: {
    fontSize: 18,
    color: 'grey',
    margin: 30,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const HomePageView: React.FunctionComponent = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const contentPerPage = 24;
  const contactArray = query
    ? contacts.filter((e) => e.name.includes(query))
    : contacts;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    setQuery(enteredValue);
  };

  const retrieveContacts = async () => {
    const response = await api.get('/contacts');

    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const allContacts = await retrieveContacts();
        if (allContacts) setContacts(allContacts);
      } catch (error) {
        setError(true);
        logging.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    })();
  }, []);

  //get current contacts
  const pageCount = Math.ceil(contactArray.length / contentPerPage);
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage;
  const currentContacts = contactArray
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .slice(firstContentIndex, lastContentIndex);

  return (
    <Container>
      <Box style={{ minHeight: '85vh' }}>
        <Grid
          container
          spacing={2}
          alignContent="center"
          justifyContent="center"
        >
          <Grid item xs={8} sm={6} lg={4}>
            <Box
              style={{
                marginTop: 40,
                marginBottom: 10,
              }}
            >
              <TextField
                variant="outlined"
                id="query"
                name="query"
                placeholder="Search contacts (case sensitive e.g Homer)"
                fullWidth
                onChange={inputHandler}
              />
            </Box>
          </Grid>
        </Grid>
        {contactArray.length > 0 ? (
          <Grid container spacing={4}>
            {currentContacts.map((contact, index) => {
              return (
                <CustomCard
                  key={index}
                  name={contact.name}
                  url={contact.url}
                  loading={loading}
                />
              );
            })}
          </Grid>
        ) : (
          !loading && (
            <Typography className={classes.text}>Contacts not found</Typography>
          )
        )}
      </Box>

      <br />
      {contactArray.length > 0 && !loading && (
        <Box className={classes.pagination}>
          <Pagination
            count={pageCount}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default HomePageView;
