import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Link,
  Typography,
  makeStyles,
  Chip,
  Container,
  TextField,
  InputBase,
  IconButton,
} from '@material-ui/core';
import { APP_VERSION } from 'src/constants';
import Logo from 'src/components/Logo';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  banner: {
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    width: '100%',
    zIndex: '99',
    height: 80
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    marginTop: "50px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    backgroundColor: "#fff",
    border: '1px solid #ddd',
    boxShadow: '1px 1px 9px #ccc',
    '& > div':{
      backgroundColor: "#fff",
      boxShadow: "none"
    }
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  },
  searchButton: {
    width : '100%',
    '& > div':{
      '&:focus':{
        outline: 'none',
        border: 'none'
      },  
      '&:after':{
        border:'none'
      },
      '& > div > input' : {
        width : '100%',
        height: 55,
        color: '#555',
        '&:hover':{
          border: 'none'
        },
        '&:focus':{
          border: 'none',
          outline : 'none'
        },
      },   
    },  
  },
  divider: {
    height: 1,
    marginBottom: 4,
    backgroundColor: '#555',
    '& > hr':{
      backgroundColor: '#555',
    }
  },
  blocSearch: {
    color: "#555",
    width : '80%',
    borderLeft : '1px solid #ececec',
    borderRight: '1px solid #ececec',
    padding: '24px 20px'
  },
  textLogo: {
    color: '#0e5a73',
    textTransform: 'uppercase',
    fontFamily: 'font-family: sansation_lightregular,Helvetica Neue,Helvetica,Arial,sans-serif',
    borderBottom: '1px solid #444'
  },
  menuRight : {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonContact :{
    background: 'rgb(11, 168, 150)',
    color: 'white',
    borderRadius: '5px',
    paddingTop: '15px',
    paddingBottom: '15px',
    '&:hover':{
      cursor: 'pointer',
      background: 'rgb(11, 168, 150)',
      color: '#13c6b3',
    }
  },
  listeItem: {
    margin: '0 10px',
    color: "#555",
    '&:hover':{
      color : '#13c6b3',
      borderBottom : '5px solid #13c6b3',
      transform: 'scaleX(1)',
      transitionDelay: '0s'
    }
  },
  textLink:{
    textDecoration: "none",
    color: "#31708f",
    textAlign: "center",
    '&:hover':{
      color: "#10a797"
    }
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
        <Toolbar className={classes.banner}>
            <Container maxWidth="xl">
              <Box
                alignItems="center"
                display="flex"
                justifyContent="flex-start"
              >
                <Box
                  alignItems="center"
                  display="flex"
                  textAlign="center"
                  width = "30%"
                  minWidth = "350px"
                  paddingRight = "20px"
                >
                  <Logo />
                  <Box
                    alignItems="center"
                    display="block"
                    textAlign="center"
                  >
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h3"
                      className={classes.textLogo}
                    >
                      Optédif formation
                    </Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                    >
                      Apprendre autrement
                    </Typography>
                  </Box>
                </Box>
                <div className={classes.blocSearch}>
                  <Box
                    alignItems="center"
                    display="flex"
                    textAlign="center"
                  >
                    <SearchIcon />
                    <TextField
                      placeholder= "Sujet de formation"
                      borderBottom= "none"
                      className={classes.searchButton}
                    />
                  </Box>
                </div>
                <div>
                <List component="nav" aria-label="secondary mailbox folders" className={classes.menuRight}>
                  <ListItem button className={classes.listeItem}>
                    <ImportContactsTwoToneIcon/><ListItemText primary="Formations" />
                  </ListItem>                
                  <ListItem button className={classes.listeItem}>
                    <EmailOutlinedIcon/>
                    <ListItemText primary="Contact" />     
                  </ListItem> 
                  <Link
                    component={RouterLink}
                    to="/app"
                    underline="none"
                    variant="body2"
                  >
                    <ListItem button className={classes.listeItem}>
                      <PersonOutlineRoundedIcon/><ListItemText primary="Inscription/Connexion" />
                    </ListItem>
                  </Link>
                </List>
                </div>
              </Box>
            </Container>
        </Toolbar>
        {/* <Hidden mdDown>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            Version
            {' '}
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/app"
          underline="none"
          variant="body2"
        >
          Dashboard
        </Link>
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/docs"
          underline="none"
          variant="body2"
        >
          Documentation
        </Link>
        <Divider className={classes.divider} />
        <Button
          color="secondary"
          component="a"
          href="https://material-ui.com/store/items/devias-kit-pro"
          variant="contained"
          size="small"
        >
          Get the kit
        </Button> */}
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
