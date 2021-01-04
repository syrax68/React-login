import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Filter from './Filter';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const SessionBrowseView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [sessions, setSessions] = useState([]);

  const getSessions = useCallback(async () => {
    try {
      const response = await axios.get('/api/sessions/sessions');
  
      if (isMountedRef.current) {
        setSessions(response.data.sessions);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  return (
    <Page
      className={classes.root}
      title="Session List"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results sessions={sessions} />
        </Box>
      </Container>
    </Page>
  );
}

export default SessionBrowseView;
