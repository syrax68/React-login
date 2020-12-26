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
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {}
}));
const Organisations = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [logo, setLogo] = useState();

  const handleChangeLogo = (event) => {
      setLogo(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        city: '',
        address: '',
        organisationAndMe: '',
        registration: '',
        isPublic: false,
        social: '',
        vat: '',
        organisationAndMyTraining: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        organisationAndMyTraining: Yup.string(),
        city: Yup.string().max(255),
        address: Yup.string().max(255),
        organisationAndMe: Yup.string(),
        registration: Yup.string().max(255).required('Registration number is required'),
        isPublic: Yup.bool(),
        social: Yup.string().max(255).required('Social reason is required'),
        vat: Yup.string().max(255),
        postal: Yup.number().min(0)
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
            <CardHeader title="Create an organisation" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                    <Typography 
                        variant="h3"
                    >
                        Logo
                    </Typography><br></br>
                    <TextField
                        fullWidth
                        name="social"
                        type="file"
                        onBlur={handleBlur}
                        onChange={handleChangeLogo}
                        value={values.social}
                        variant="outlined"
                    />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                    <img src={logo} alt="" style={{maxWidth: "250px"}}/>
                </Grid>        
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.social && errors.social)}
                    fullWidth
                    helperText={touched.social && errors.social}
                    label="Social reason"
                    name="social"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.social}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.registration && errors.registration)}
                    fullWidth
                    helperText={touched.registration && errors.registration }
                    label="Registration number"
                    name="registration"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.registration}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.vat && errors.vat)}
                    fullWidth
                    helperText={touched.vat && errors.vat}
                    label="VAT N °"
                    name="vat"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vat}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Address"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.postal && errors.postal)}
                    fullWidth
                    helperText={touched.postal && errors.postal}
                    label="Postal code"
                    name="postal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postal}
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
                    error={Boolean(touched.organisationAndMe && errors.organisationAndMe)}
                    fullWidth
                    helperText={touched.organisationAndMe && errors.organisationAndMe}
                    label="This organization and me"
                    name="organisationAndMe"
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.organisationAndMe}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                   <TextField
                    error={Boolean(touched.organisationAndMyTraining && errors.organisationAndMyTraining)}
                    fullWidth
                    helperText={touched.organisationAndMyTraining && errors.organisationAndMyTraining}
                    label="This organization and my training"
                    name="organisationAndMyTraining"
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.organisationAndMyTraining}
                    variant="outlined"
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

Organisations.propTypes = {
  className: PropTypes.string,
};

export default Organisations;
