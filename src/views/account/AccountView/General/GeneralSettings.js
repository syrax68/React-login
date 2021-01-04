import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import wait from 'src/utils/wait';
import countries from './countries';
import gender from './gender';
import * as locales from '@material-ui/core/locale';

const useStyles = makeStyles(() => ({
  root: {}
}));
const GeneralSettings = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [locale, setLocale] = useState('enUS');

  return (
    <Formik
      enableReinitialize
      initialValues={{
        canHire: user.canHire || false,
        city: user.city || '',
        country: user.country || '',
        birthday: user.birthday || '',
        gender: user.gender || '',
        email: user.email || '',
        isPublic: user.isPublic || false,
        activeTrainer: user.activeTrainer || false,
        name: user.name || '',
        phone: user.phone || '',
        state: user.state || '',
        trainer: user.trainer || false,
        administrateur: user.administrateur || false,
        salesman: user.salesman || false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        canHire: Yup.bool(),
        city: Yup.string().max(255),
        country: Yup.string().max(255),
        birthday: Yup.date(),
        gender: Yup.string().max(255),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        isPublic: Yup.bool(),
        activeTrainer: Yup.bool(),
        name: Yup.string().max(255).required('Name is required'),
        phone: Yup.string(),
        trainer: Yup.bool(),
        administrateur: Yup.bool(),
        salesman: Yup.bool(),
        state: Yup.string()
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await wait(200);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Profile updated', {
            variant: 'success'
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email ? errors.email : 'We will use this email to contact you'}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone Number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Autocomplete
                    getOptionLabel={(option) => option.text}
                    options={countries}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="State/Region"
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.city && errors.city)}
                    fullWidth
                    helperText={touched.city && errors.city}
                    label="City"
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.birthday && errors.birthday)}
                    fullWidth
                    helperText={touched.birthday && errors.birthday}
                    label="Birthday"
                    name="birthday"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birthday}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Autocomplete
                    getOptionLabel={(option) => option.text}
                    options={gender}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Autocomplete
                    options={Object.keys(locales)}
                    getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                    value={locale}
                    disableClearable
                    onChange={(event, newValue) => {
                      setLocale(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Language" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    Make Contact Info Public
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Means that anyone viewing your profile will be able to see your
                    contacts details
                  </Typography>
                  <Switch
                    checked={values.isPublic}
                    edge="start"
                    name="isPublic"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    Available to hire
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Toggling this will let your teammates know that you are available
                    for acquiring new sessions
                  </Typography>
                  <Switch
                    checked={values.canHire}
                    edge="start"
                    name="canHire"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    Activate my trainer account
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Toggling this will let you show your trainer profile
                  </Typography>
                  <Switch
                    checked={values.activeTrainer}
                    edge="start"
                    name="activeTrainer"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <Typography
                    variant="h6"
                    color="textPrimary"
                    >
                    Salesman
                    </Typography>
                    <Switch
                    checked={values.salesman}
                    edge="start"
                    name="salesman"
                    />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                    <Typography
                      variant="h6"
                      color="textPrimary"
                    >
                    Trainer
                    </Typography>
                    <Switch
                      checked={values.trainer}
                      edge="start"
                      name="trainer"
                    />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <Typography
                      variant="h6"
                      color="textPrimary"
                    >
                    Administrateur
                    </Typography>
                    <Switch
                      checked={values.administrateur}
                      edge="start"
                      name="administrateur"
                    />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
