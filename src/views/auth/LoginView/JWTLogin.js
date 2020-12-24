import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import LockIcon from '@material-ui/icons/Lock';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(() => ({
  root: {},
  inputText:{
    backgroundColor: "#fff",
    color: "#555",
    display: "flex",
    marginTop: '20px',
  },
  input: {
    border: '1px solid #ccc',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    width: '100%',
    padding: '5px',
    color: '#555'
  },
  iconButton: {
    padding: 9,
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRight: '0px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  divider: {
    height: 1,
    margin: 4,
    backgroundColor: '#555',
    '& > hr':{
      backgroundColor: '#555',
    }
  },
  checkText:{
    marginTop: 15,
    color: '#555'
  },
  buttonConnexion:{
    backgroundColor: "#0ba896",
    color: "#fff",
    width: '100%',
    '&:hover':{
      backgroundColor: '#286090',
    }
  },
  textLink:{
    textDecoration: "none",
    color: "#31708f",
    '&:hover':{
      color: "#10a797"
    }
  }
}));
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [state, setState] = React.useState({
    checkedG: true,
  });
  const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Formik
      initialValues={{
        email: 'demo@devias.io',
        password: 'Password123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await login(values.email, values.password);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleSubmit,
        handleChange,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
            <div className={classes.inputText}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <PersonOutlineRoundedIcon style={{color: "#555"}}/>
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Adresse e-mail"
                inputProps={{ 'aria-label': 'Adresse e-mail' }}
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
            </div>
            <div className={classes.inputText}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <LockIcon style={{color: "#555"}} />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Mot de passe"
                inputProps={{ 'aria-label': 'Mot de passe' }}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </div>
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedG} onChange={handleChangeCheckbox} name="checkedG" />}
              label="Se souvenir de moi"
              className={classes.checkText}
            />
            <Divider className={classes.divider}/>
            <p style={{fontSize : "16px" , color: "#555", fontFamily: "open sans,sans-serif" , marginTop: "10px"}}>
              En entrant sur Optedif vous confirmez que vous acceptez les 
              <a className={classes.textLink} href="https://optedif-formation.fr/cgu/"> Conditions Générales</a>
            </p>
            <br></br>
            <Button 
              variant="contained" 
              color="#0ba896" 
              className={classes.buttonConnexion}
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
            >
              Connexion
            </Button>
            <Box 
              display= "flex"
              justifyContent = "flex-end"
              alignItems="center"
              height="50px"
            >
              <a className={classes.textLink} href="/resetting/request">J&#39;ai perdu mon mot de passe</a>
            </Box>
        </form>
      )}
    </Formik>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string,
};

export default JWTLogin;
