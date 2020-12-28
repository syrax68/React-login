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
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import wait from 'src/utils/wait';
import time from './Helpers/Time';
import fullTime from './Helpers/FullTime';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none',
  },
}));
const addCertification = (values,handleBlur,handleChange, errors, touched) => {
    return(
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
        </>
    );
}
const addExperience = (values,handleBlur,handleChange, errors, touched) => {
    return(
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
        </>
    )
}
const Trainer = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [experience,setExperience] = useState(false);
  const [certification,setCertification] = useState(false);

  const handleClickExperience = () => {
      setExperience(true);
  }
  const handleClickCertification = () => {
      setCertification(true);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        lowestPrice: '',
        higestPrice: '',
        averagePrice: '',
        registration: '',
        isPublic: false,
        dateCert: '',
        dateExp: '',
        durationCert: '',
        durationExp: '',
        timeExp: '',
        timeCert: '',
        company: '',
        skillCert: '',
        skillExp: '',
        descExp: '',
        descCert: '',
        computerSkill: '',
        birthday: '',
        timeTrainer: '',
        skills: '',
        solicited: '',
        favoriteSkill: '',
        phoneNum: '',
        trainerNum: '',
        language: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        organisationAndMyTraining: Yup.string(),
        lowestPrice: Yup.number().min(0),
        highestPrice: Yup.number().min(0),
        averagePrice: Yup.number().min(0),
        address: Yup.string().max(255),
        computerSkill: Yup.string(),
        registration: Yup.string().max(255).required('Registration number is required'),
        isPublic: Yup.bool(),
        dateCert: Yup.date(),
        dateExp: Yup.date(),
        durationCert : Yup.number().min(0),
        durationExp : Yup.number().min(0),
        timeExp: Yup.string().max(255),
        timeCert: Yup.string().max(255), 
        company: Yup.string().max(255),
        skillCert: Yup.string().max(255),
        skillExp: Yup.string().max(255),
        descCert: Yup.string(),
        descExp: Yup.string(),
        birthday: Yup.date(),
        timeTrainer: Yup.string(),
        skills: Yup.string(),
        solicited: Yup.string(),
        favoriteSkill: Yup.string(),
        phoneNum: Yup.string().max(30),
        trainerNum: Yup.string().max(30),
        language: Yup.string().max(255),
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
            <CardHeader title="Trainer Profil" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                    <TextField
                        error={Boolean(touched.lowestPrice && errors.lowestPrice)}
                        fullWidth
                        helperText={touched.lowestPrice && errors.lowestPrice}
                        label="Lowest price"
                        name="lowestPrice"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lowestPrice}
                        variant="outlined"
                        placeholder="Your lowest price: ex: 250"
                    />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                    <TextField
                        error={Boolean(touched.averagePrice && errors.averagePrice)}
                        fullWidth
                        helperText={touched.averagePrice && errors.averagePrice}
                        label="Average price"
                        name="averagePrice"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.averagePrice}
                        variant="outlined"
                        placeholder="Your average price: ex: 350"
                    />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                    <TextField
                        error={Boolean(touched.highestPrice && errors.highestPrice)}
                        fullWidth
                        helperText={touched.highestPrice && errors.highestPrice}
                        label="Highest price"
                        name="highestPrice"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.highestPrice}
                        variant="outlined"
                        placeholder="Your highest price: ex: 750"
                    />
                </Grid>
                <Grid
                  item
                  md={8}
                  xs={12}
                >
                    
                </Grid>        
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <Autocomplete
                    getOptionLabel={(option) => option.text}
                    options={time}
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(touched.timeTrainer && errors.timeTrainer)}
                        fullWidth
                        helperText={touched.timeTrainer && errors.timeTrainer}
                        label="Time"
                        name="timeTrainer"
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
                  <TextField
                    error={Boolean(touched.skills && errors.skills)}
                    fullWidth
                    helperText={touched.skills && errors.skills }
                    label="Skills"
                    name="skills"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.skills}
                    variant="outlined"
                    placeholder="Separated by comma"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.solicited && errors.solicited)}
                    fullWidth
                    helperText={touched.solicited && errors.solicited}
                    label="I don't wish to be solicited for the following courses even if they are in my field"
                    name="solicited"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.solicited}
                    variant="outlined"
                    placeholder="Separated by comma"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Precision</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid
                        container
                        spacing={4}
                    >
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <TextField
                                error={Boolean(touched.favoriteSkill && errors.favoriteSkill)}
                                fullWidth
                                helperText={touched.favoriteSkill && errors.favoriteSkill}
                                label="Favorite skill"
                                name="favoriteSkill"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.favoriteSkill}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <TextField
                                error={Boolean(touched.phoneNum && errors.phoneNum)}
                                fullWidth
                                helperText={touched.phoneNum && errors.phoneNum}
                                label="Phone Number"
                                name="phoneNum"
                                onBlur={handleBlur}
                                onChange={handleChange}                               
                                value={values.phoneNum}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <TextField
                                error={Boolean(touched.trainerNum && errors.trainerNum)}
                                fullWidth
                                helperText={touched.trainerNum && errors.trainerNum}
                                label="Trainer number"
                                name="trainerNum"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.trainerNum}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <TextField
                                error={Boolean(touched.language && errors.language)}
                                fullWidth
                                helperText={touched.language && errors.language}
                                label="Language of intervention"
                                name="language"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.language}
                                variant="outlined"
                                placeholder="Separated by comma"
                            />
                        </Grid>
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <TextField
                                error={Boolean(touched.computerSkill && errors.computerSkill)}
                                fullWidth
                                helperText={touched.computerSkill && errors.computerSkill}
                                label="Computer skills"
                                name="computerSkill"
                                onBlur={handleBlur}
                                onChange={handleChange}                               
                                value={values.computerSkill}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                        item
                        md={4}
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
                                placeholder="ex: 09/11/2020"
                            />
                        </Grid>
                        <Grid
                        item
                        md={6}
                        xs={12}
                        >
                            <Typography
                                variant="h5"
                            >
                                My CV (pdf/word/ppt,2Mo max)
                            </Typography>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" color="primary">
                                Upload
                                </Button>
                            </label>
                        </Grid>
                        <Grid
                        item
                        md={6}
                        xs={12}
                        >
                            <Typography
                                variant="h5"
                            >
                                My URSSAF certificate (pdf/jpg/png,2Mo max)
                            </Typography>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" color="primary">
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                    </AccordionDetails>
                </Accordion>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography className={classes.heading}>My experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid
                        container
                        spacing={4}
                    >
                        {experience ? addExperience(values,handleBlur,handleChange, errors, touched) : null}
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <Button variant="contained" onClick={handleClickExperience}>
                                Add experience
                            </Button>
                        </Grid>
                    </Grid>
                    </AccordionDetails>
                </Accordion>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography className={classes.heading}>My Diploma and certification</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={4}
                        >
                            {certification ? addCertification(values,handleBlur,handleChange, errors, touched) : null}
                            <Grid
                            item
                            md={4}
                            xs={12}
                            >
                                <Button variant="contained" onClick={handleClickCertification}>
                                    Add certification
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
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
                Save
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Trainer.propTypes = {
  className: PropTypes.string,
};

export default Trainer;
