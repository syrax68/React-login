import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import ContactEditForm from './ContactEditForm';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ContactEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [contact, setContact] = useState(null);

  const getContact = useCallback(async () => {
    try {
      const response = await axios.get('/api/contacts/1');
    
      if (isMountedRef.current) {
        setContact(response.data.contact);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContact();
  }, [getContact]);

  if (!contact) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Contact Edit"
    >
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <ContactEditForm contact={contact} />
        </Container>
      </Box>
    </Page>
  );
};

export default ContactEditView;
