import React, {useState} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
} from '@material-ui/core';

import TrainerProfile from './Components/TrainerProfile';
import TrainerSubscription from './Components/TrainerSubscription';
import PublicProfile from 'src/views/social/ProfileView'; 

const Trainer = () => {

  const [currentTab, setCurrentTab] = useState('trainer');
  const tabs = [
    { value: 'trainer', label: 'Trainer Profile' },
    { value: 'public', label: 'Public Profile' },
    { value: 'subscription', label: 'Trainer Subscription' },
  ];

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
        {currentTab === 'trainer' && <TrainerProfile />}
        {currentTab === 'public' && <PublicProfile />}
        {currentTab === 'subscription' && <TrainerSubscription />}
      </Box>
    </Container>
    </>
  );
};

export default Trainer;
