import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import wait from 'src/utils/wait';
import fullTime from '../Helpers/FullTime';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComponentCert = props => {
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    props.onRemoveElement();
  };
  return (
    <>
    <Formik
      enableReinitialize
      initialValues={{
        isPublic: false,
        dateCert: '',
        durationCert: '',
        timeCert: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        isPublic: Yup.bool(),
        dateCert: Yup.date(),
        durationCert : Yup.number().min(0),
        timeCert: Yup.string().max(255), 
        skillCert: Yup.string().max(255),
        descCert: Yup.string(),
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
          <>
            <Grid
            item
            md={3}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.dateCert && errors.dateCert)}
                    fullWidth
                    helperText={touched.dateCert && errors.dateCert}
                    label="Date"
                    name="dateCert"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateCert}
                    variant="outlined"
                    placeholder="ex: 2020-02-02"
                />
            </Grid>
            <Grid
            item
            md={3}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.durationCert && errors.durationCert)}
                    fullWidth
                    helperText={touched.durationCert && errors.durationCert}
                    label="Duration"
                    name="durationCert"
                    onBlur={handleBlur}
                    onChange={handleChange}                               
                    value={values.durationCert}
                    variant="outlined"
                />
            </Grid>
            <Grid
            item
            md={3}
            xs={12}
            >
                <Autocomplete
                    getOptionLabel={(option) => option.text}
                    options={fullTime}
                    renderInput={(params) => (
                    <TextField
                        error={Boolean(touched.timeCert && errors.timeCert)}
                        fullWidth
                        helperText={touched.timeCert && errors.timeCert}
                        label="Time"
                        name="timeCert"
                        onChange={handleChange}
                        variant="outlined"
                        {...params}
                    />
                    )}
                />
            </Grid>
            <Grid
            item
            md={3}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.titleCert && errors.titleCert)}
                    fullWidth
                    helperText={touched.titleCert && errors.titleCert}
                    label="entitled"
                    name="titleCert"
                    onBlur={handleBlur}
                    onChange={handleChange}                               
                    value={values.titleCert}
                    variant="outlined"
                    placeholder="title of the certification"
                />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.skillCert && errors.skillCert)}
                    fullWidth
                    helperText={touched.skillCert && errors.skillCert}
                    label="Skill"
                    name="skillCert"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.skillCert}
                    variant="outlined"
                />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.descCert && errors.descCert)}
                    fullWidth
                    helperText={touched.descCert && errors.descCert}
                    label="Description"
                    name="descCert"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descCert}
                    variant="outlined"
                    placeholder="A brief description of the certification performed"
                />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                <Button variant="contained" onClick={handleClick}>
                    Delete Certificate
                </Button>
            </Grid>
          </>
        )}
        </Formik>
        </>
  );
};
export default ComponentCert;
