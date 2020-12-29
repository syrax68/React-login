import React, {useState} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
} from '@material-ui/core';

import AccountDetails from './AccountDetails';
import Notifications from '../Notifications';
import Security from '../Security';
import Subscription from '../Subscription';
import useAuth from 'src/hooks/useAuth';

const General = () => {

  const [currentTab, setCurrentTab] = useState('account');
  const tabs = [
    { value: 'account', label: 'Account Details' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' },
    { value: 'subscription', label: 'Subscription' },
  ];
  const { user } = useAuth();
  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  return (
    <>
    <Container maxWidth="lg">
      <Box mt={3}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          textColor="secondary"
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
      <Box
        py={3}
        pb={6}
      >
        {currentTab === 'account' && <AccountDetails />}
        {currentTab === 'notifications' && <Notifications />}
        {currentTab === 'security' && <Security user={user} />}
        {currentTab === 'subscription' && <Subscription />}
      </Box>
    </Container>
    </>
  );
};

export default General;
