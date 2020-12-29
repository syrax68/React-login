import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import Subscription from './Subscription';
import Notifications from './Notifications';
import Security from './Security';
import Organisations from './Organisations';
import Trainer from './Trainer';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('account');
  const { user } = useAuth();

  const tabs = [
    { value: 'account', label: 'Account' },
    { value: 'organisations', label: 'Organisations' },
    { value: 'trainerProfile', label: 'Trainer Profile' },
    { value: 'orders', label: 'Orders' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' },
    { value: 'subscription', label: 'Subscription' },
    
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {(user && user.activeTrainer)?
            tabs.map((tab) => (      
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            )):tabs.map((tab) => (   
              tab.value !== 'trainerProfile'?   
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />:null
            ))
            }
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'account' && <General />}
          {currentTab === 'organisations' && <Organisations />}
          {user && user.activeTrainer && currentTab === 'trainerProfile' && <Trainer />}
          {currentTab === 'orders' && <Security user={user}/>}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security user={user}/>}
          {currentTab === 'subscription' && <Subscription />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
