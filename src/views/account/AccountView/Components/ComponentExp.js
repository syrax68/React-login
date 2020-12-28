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

const ComponentExp = props => {
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
        dateExp: '',
        durationExp: '',
        timeExp: '',
        company: '',
        skillExp: '',
        descExp: '',
      }}
      validationSchema={Yup.object().shape({
        isPublic: Yup.bool(),
        dateExp: Yup.date(),
        durationExp : Yup.number().min(0),
        timeExp: Yup.string().max(255),
        company: Yup.string().max(255),
        skillExp: Yup.string().max(255),
        descExp: Yup.string(),
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
                    error={Boolean(touched.dateExp && errors.dateExp)}
                    fullWidth
                    helperText={touched.dateExp && errors.dateExp}
                    label="Date"
                    name="dateExp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateExp}
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
                    error={Boolean(touched.durationExp && errors.durationExp)}
                    fullWidth
                    helperText={touched.durationExp && errors.durationExp}
                    label="Duration"
                    name="durationExp"
                    onBlur={handleBlur}
                    onChange={handleChange}                               
                    value={values.durationExp}
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
                        error={Boolean(touched.timeExp && errors.timeExp)}
                        fullWidth
                        helperText={touched.timeExp && errors.timeExp}
                        label="Time"
                        name="timeExp"
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
                    error={Boolean(touched.company && errors.company)}
                    fullWidth
                    helperText={touched.company && errors.company}
                    label="Company"
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}                               
                    value={values.company}
                    variant="outlined"
                    placeholder="Client company"
                />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.skillExp && errors.skillExp)}
                    fullWidth
                    helperText={touched.skillExp && errors.skillExp}
                    label="Skill"
                    name="skillExp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.skillExp}
                    variant="outlined"
                />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                <TextField
                    error={Boolean(touched.descExp && errors.descExp)}
                    fullWidth
                    helperText={touched.descExp && errors.descExp}
                    label="Description"
                    name="descExp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descExp}
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
                    Delete experience
                </Button>
            </Grid>
          </>
        )}
        </Formik>
        </>
  );
};
export default ComponentExp;
