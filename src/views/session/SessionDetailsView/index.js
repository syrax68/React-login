import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Activities from './Activities';
import Applicants from './Applicants';
import Header from './Header';
import Overview from './Overview';
import Reviews from './Reviews';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const SessionDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('overview');
  const [session, setSession] = useState(null);

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'activity', label: 'Activity' },
    { value: 'applicants', label: 'Applicants' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getSession = useCallback(async () => {
    try {
      const response = await axios.get('/api/sessions/sessions/1');

      if (isMountedRef.current) {
        setSession(response.data.session);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  if (!session) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="session Details"
    >
      <Container maxWidth="lg">
        <Header session={session} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'overview' && <Overview session={session} />}
          {currentTab === 'reviews' && <Reviews reviews={session.reviews} />}
          {currentTab === 'activity' && <Activities activities={session.activities} />}
          {currentTab === 'applicants' && <Applicants applicants={session.applicants} />}
        </Box>
      </Container>
    </Page>
  );
}

export default SessionDetailsView;
