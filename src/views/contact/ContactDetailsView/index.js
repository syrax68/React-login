import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Details from './Details';
import Invoices from './Invoices';
import Logs from './Logs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ContactDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [contact, setContact] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

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
      title="Contact Details"
    >
      <Container maxWidth={false}>
        <Header contact={contact} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
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
          {currentTab === 'details' && <Details contact={contact} />}
          {currentTab === 'invoices' && <Invoices />}
          {currentTab === 'logs' && <Logs />}
        </Box>
      </Container>
    </Page>
  );
};

export default ContactDetailsView;
