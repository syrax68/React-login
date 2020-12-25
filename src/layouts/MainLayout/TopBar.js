import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Typography,
  makeStyles,
  TextField,
  Collapse
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import ViewListIcon from '@material-ui/icons/ViewList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    marginTop:"15px",
    [theme.breakpoints.down('sm')]: {
      width: 50
    }, 
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  banner: {
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    width: '100%',
    zIndex: '99',
    [theme.breakpoints.down('sm')]: {
      height: 45,
      minHeight: 45,
      padding: 0
    },
    [theme.breakpoints.up('md')]: {
      height: 70
    },
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  blocIcon:{
    alignItems:"center",
    display:"flex",
    textAlign:"center",
    [theme.breakpoints.down('sm')]: {
      paddingRight : "10px"
    },
    [theme.breakpoints.up('md')]: {
      paddingRight : "20px"
    },
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
      '& > input' : {
        width : '100%',
        [theme.breakpoints.up('md')]: {
          height: 55,
        },     
        color: '#7c7c7c',
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
    [theme.breakpoints.down('sm')]: {
      padding: '7px 10px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px 20px'
    },
  },
  textLogo: {
    minWidth: "300px",
    color: '#0e5a73',
    textTransform: 'uppercase',
    fontFamily: 'font-family: sansation_lightregular,Helvetica Neue,Helvetica,Arial,sans-serif',
    borderBottom: '1px solid #444'
  },
  menuRight : {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  menuRightCollaps:{
    background: "#fff"
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
    [theme.breakpoints.down('md')]: {
      padding: '0px'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px',
    },
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
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
        <Toolbar className={classes.banner}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="flex-start"
                width = "100%"
              >
                <Box
                  className={classes.blocIcon}
                >
                  <Hidden smUp>
                    <ToggleButton value="list" aria-label="list" style={{color:"#555"}} onClick={handleMenuOpen}>
                      <ViewListIcon />
                    </ToggleButton>
                  </Hidden>
                  
                  {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <HorizontalSplitOutlinedIcon/>
                  </button> */}
                  <Link
                    variant="body1"
                    color="inherit"
                    to="/"
                    component={RouterLink}
                  >
                    <Logo className={classes.logo}/>
                  </Link>
                  <Hidden mdDown>
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
                  </Hidden>
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
                <Hidden smDown>
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
                </Hidden>
                <Hidden mdUp>
                  <List component="nav" aria-label="secondary mailbox folders" className={classes.menuRight}>               
                    <ListItem button className={classes.listeItem}>
                      <EmailOutlinedIcon/>    
                    </ListItem> 
                    <Link
                      component={RouterLink}
                      to="/app"
                      underline="none"
                      variant="body2"
                    >
                      <ListItem button className={classes.listeItem}>
                        <PersonOutlineRoundedIcon/>
                      </ListItem>
                    </Link>
                  </List>
                </Hidden>
              </Box>
        </Toolbar>
        <Collapse in={openMenu} style={{marginTop:"44px"}}>
          <List component="nav" aria-label="secondary mailbox folders" className={classes.menuRightCollaps}>
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
        </Collapse>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
