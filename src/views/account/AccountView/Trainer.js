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
import computerSkill from './Helpers/ComputerSkill';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentExp from './Components/ComponentExp';
import ComponentCert from './Components/ComponentCert';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none',
  },
}));
const Trainer = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [key, setKey] = React.useState(1);
  const [keyCert, setKeyCert] = React.useState(1);
  const [attestation, setAttestation] = useState();
  const [cv, setCv] = useState();
  const removeExperience = key => {
    const updateDiv = () =>
      setDivExp(divExp => {
        const myDivs = divExp.filter(element => Number(element.key) !== key);
        return myDivs;
      });
    return updateDiv;
  };
  const removeCertificate = key => {
    const updateDiv = () =>
      setDivCert(divCert => {
        const myCert = divCert.filter(element => Number(element.key) !== key);
        return myCert;
      });
    return updateDiv;
  };
  const [divCert, setDivCert]= useState([
    <ComponentCert key={0} onRemoveElement={removeCertificate(0)} />        
  ])
  const [divExp, setDivExp]= useState([
    <ComponentExp key={0} onRemoveElement={removeExperience(0)} />        
  ])
  const addExperience = e => {
    setDivExp(divExp => {
      const myExp = [...divExp];
      myExp.push(
        <ComponentExp
          key={key}
          onRemoveElement={removeExperience(key)}
        />
      );
      return myExp;
    });
    setKey(key + 1);
  };
  const addCertificate = e => {
    setDivCert(divCert => {
      const myCert = [...divCert];
      myCert.push(
        <ComponentExp
          key={keyCert}
          onRemoveElement={removeCertificate(keyCert)}
        />
      );
      return myCert;
    });
    setKeyCert(keyCert + 1);
  };
  

  const handleChangeCv = (event) => {
      setCv(event.target.files[0].name);
  }
  const handleChangeAttestation = (event) => {
      setAttestation(event.target.files[0].name);
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
                            <Autocomplete
                                getOptionLabel={(option) => option.text}
                                options={computerSkill}
                                renderInput={(params) => (
                                <TextField
                                    error={Boolean(touched.computerSkill && errors.computerSkill)}
                                    fullWidth
                                    helperText={touched.computerSkill && errors.computerSkill}
                                    label="Computer skills"
                                    name="computerSkill"
                                    onChange={handleChange}
                                    variant="outlined"
                                    {...params}
                                />
                                )}
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
                                placeholder="ex: 2020-02-02"
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
                                accept="application/*,image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                onChange={handleChangeCv}
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" color="primary">
                                Upload
                                </Button>
                                <span style={{marginLeft: "5px"}}>{cv}</span>
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
                                accept="application/*,image/*"
                                className={classes.input}
                                id="contained-button-fileAttestation"
                                multiple
                                onChange={handleChangeAttestation}
                                type="file"
                            />
                            <label htmlFor="contained-button-fileAttestation">
                                <Button variant="contained" component="span" color="primary">
                                    Upload
                                </Button>
                                <span style={{marginLeft: "5px"}}>{attestation}</span>
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
                        {divExp.map(element => element)}
                        <Grid
                        item
                        md={4}
                        xs={12}
                        >
                            <Button variant="contained" onClick={addExperience}>
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
                            {divCert.map(element => element)}
                            <Grid
                            item
                            md={4}
                            xs={12}
                            >
                                <Button variant="contained" onClick={addCertificate}>
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
