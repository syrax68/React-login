import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Paper,
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `#282828 url(${process.env.PUBLIC_URL+'/static/images/covers/background.png'})`,
    flexGrow: 1,
    fontFamily: 'open sans,sans-serif',
    paddingTop: '20px',
    color: '#8a8a8a',
    fontSize: '14px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: 'none',
    boxShadow: 'none',
    border: 'none',
    color: theme.palette.text.secondary,
    '& > p':{
        textAlign: 'left',
        marginBottom: '10px',
        marginLeft: "15px",
        color: '#8a8a8a'
    }
  },
  title:{
    color: "#13c6b3",
    textAlign: "left",
    marginLeft: "15px",
    fontSize: '14px',
    fontFamily: 'open sans,sans-serif',
  },
  list:{
    '& > li':{
        paddingTop : "0px",
        paddingBottom: "0px",
    },   
    '& > li > div > span':{
        fontSize: '14px',
        color : '#8a8a8a'
    }
  },
  lastGrid:{
      background : `url(${process.env.PUBLIC_URL+'/static/images/covers/map.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPositionX: 'center',
      backgroundPositionY: 'center'
  },
  blocBottom:{
    background: `#383737 url(${process.env.PUBLIC_URL+'/static/images/covers/background.png'})`,
    borderTop: '1px solid #000',
    minHeight: '40px'
  }
}));
const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}
  
const Footer = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <footer
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
        <Toolbar className={classes.banner}>
            <Container maxWidth="lg" >
                <Grid container spacing={3}>
                    <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="h5"
                            className={classes.title}
                            >
                            Les avantages Optédif
                        </Typography> 
                        <List className={classes.list} component="nav" aria-label="secondary mailbox folders">
                            <ListItem >
                                <ListItemText primary="Qui sommes nous ?" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Pédagogie et tarification" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Notre offre de qualité formation" />
                            </ListItem>
                        </List> 
                        <Typography
                            variant="h5"
                            className={classes.title}
                            >
                            La société
                        </Typography> 
                        <List className={classes.list} component="nav" aria-label="secondary mailbox folders" >
                            <ListItem>
                                <ListItemText primary="Mentions Légales" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Règlement intérieur" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Conditions générales d'utilisation" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Conditions générales de vente" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Références" />
                            </ListItem>
                        </List>  
                    </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Typography
                                variant="h6"
                                className={classes.title}
                                >
                                Contribuez! 
                            </Typography>
                            <List className={classes.list} component="nav" aria-label="secondary mailbox folders" >
                                <ListItem>
                                    <ListItemText primary="Contact" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Devenez partenaire Optédif" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs className={classes.lastGrid}>
                        <Paper className={classes.paper}>
                            <p>Optédif est présent sur Paris, Lyon, Marseille, Lille, Toulouse, Bordeaux, Nantes,
                                Rennes, Brest, Strasbourg, Clermont-Ferrand, Chambéry, Dijon, Nice et des centaines d'autres villes.
                            </p>
                            <p>Centre administratif Optédif 555 Chemin du Bois 69140 Rillieux la Pape.</p>
                            <List className={classes.list} component="nav" aria-label="secondary mailbox folders" >
                                <ListItem>
                                    <MailOutlineIcon fontSize="small" /> <ListItemText primary="contact@optedif.fr" style={{marginLeft:"5px"}}/>
                                </ListItem>
                                <ListItem>
                                    <PhoneIcon fontSize="small"/> <ListItemText primary="09 72 65 24 84" style={{marginLeft:"5px"}}/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
        <Toolbar className={classes.blocBottom}>
            <Container>
                <p style={{textAlign : 'center'}}>Optédif 2020 - © Tous droits réservés - N° Formateur 82691159869 -
                    Certifié
                    ICPF&amp;PSI</p>
            </Container>
        </Toolbar>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
