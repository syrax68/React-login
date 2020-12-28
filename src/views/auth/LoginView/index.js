import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import TopBar from 'src/layouts/MainLayout/TopBar';
import Footer from 'src/layouts/MainLayout/Footer';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import Auth0Login from './Auth0Login';
import FirebaseAuthLogin from './FirebaseAuthLogin';
import JWTLogin from './JWTLogin';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'open sans,sans-serif'
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
  divider: {
    height: 1,
    marginBottom: 4,
    backgroundColor: '#555',
    '& > hr':{
      backgroundColor: '#555',
    }
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
    '&:hover':{
      color : '#13c6b3',
      borderBottom : '5px solid #13c6b3',
      transform: 'scaleX(1)',
      transitionDelay: '0.5s'
    }
  },
  blocImageCover: {
    width: '100%',
    height: '250px',
    backgroundImage: `url(${process.env.PUBLIC_URL+'/static/images/covers/cover.jpg'})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositionY: '50px',
  },
  blocImageForm: {
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL+'/static/images/covers/background.png'})`,
    height: '100%'
  },
  connexionText: {
    color: '#40454a',
    textAlign: 'center',
    fontSize: '33px'
  },
  imageLine:{
    width: '133px'
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

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <TopBar activeaccount='true'/>
      <div className={classes.blocImageCover}>
        <div className={classes.blocImageForm}>
          <Box 
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            marginLeft="120px"
            height= "100px"
            color="#fff"
          >
            <HomeIcon style={{ fontSize: 40 }}/>
            <Typography
              variant="h3"
              color="#fff"
            >
              / Connexion
            </Typography>
          </Box>  
          
        </div>
      </div>
      <Container
        className={classes.cardContainer}
        maxWidth="lg"
      >
        <Card style={{ width: 550 }}>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="center"
              mt={1}
            >
              <div style={{ textAlign: "center"}}>
                <Typography
                  className={classes.connexionText}
                >
                  Connexion
                </Typography>
                <img
                  alt="Select file"
                  className={classes.imageLine}
                  src="/static/images/covers/line.png"
                />
              </div>
            </Box>

            <Box
              flexGrow={1}
              mt={3}
            >
              {method === 'Auth0' && <Auth0Login /> }
              {method === 'FirebaseAuth' && <FirebaseAuthLogin /> }
              {method === 'JWT' && <JWTLogin /> }
            </Box>
            <Box mb={2}>
              <Divider className={classes.divider}/>
            </Box>
            <Box
              display="flex"
              justifyContent= "center"
              alignItems= "center"
            >
              <p style={{textAlign : "center", color: "#000"}}>Pas encore membre Optedif ?<br></br>
                  <a href="/register/" className={classes.textLink}>
                      Inscrivez-vous pour trouver<br></br>
                      un formateur ou un apprenant
                  </a>
              </p>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </Page>
  );
};

export default LoginView;
