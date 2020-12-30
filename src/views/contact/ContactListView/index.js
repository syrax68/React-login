import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ContactListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [contacts, setContacts] = useState([]);

  const getContacts = useCallback(async () => {
    try {
      const response = await axios.get('/api/contacts');

      if (isMountedRef.current) {
        setContacts(response.data.contacts);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <Page
      className={classes.root}
      title="Contact List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results contacts={contacts} />
        </Box>
      </Container>
    </Page>
  );
};

export default ContactListView;
