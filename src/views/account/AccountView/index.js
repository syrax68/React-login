import React, { useState, useEffect } from 'react';
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

const AccountView = (props) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(props.match.params.parameter1? props.match.params.parameter1: props.match.params.parameter);
  const { user } = useAuth();
  const tabs = [
    { value: 'account', label: 'Account' },
    { value: 'organisations', label: 'Organisations' },
    { value: 'trainer', label: 'Trainer Profile' },
  ];

  useEffect(() => {
    setCurrentTab(props.match.params.parameter1? props.match.params.parameter1: props.match.params.parameter);
  }, [props]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  return (
    <Page
      className={classes.root}
      title={currentTab}
    >
      <Container maxWidth="lg">
          {tabs.map((tab, key) => (   
            tab.value === currentTab?   
              <Header key={key} title={tab.label}/>
            :null
            ))
          }
        
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
              tab.value !== 'Trainer Profile'?   
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
          {currentTab === 'account' && <General parameter={props.match.params.parameter2}/>}
          {currentTab === 'organisations' && <Organisations />}
          {user && user.activeTrainer && currentTab === 'trainer' && <Trainer />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
