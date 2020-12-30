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
  Grid,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import ComponentOrg from './Components/ComponentOrg';

const useStyles = makeStyles(() => ({
  root: {}
}));
const Organisations = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [key, setKey] = React.useState(1);

  const removeOrganisation = key => {
    const updateDiv = () =>
      setDivOrg(divOrg => {
        const myDivs = divOrg.filter(element => Number(element.key) !== key);
        return myDivs;
      });
    return updateDiv;
  };
  const [divOrg, setDivOrg]= useState([
    <ComponentOrg key={0} onRemoveElement={removeOrganisation(0)} />        
  ])
  const addOrganisation = e => {
    setDivOrg(divOrg => {
      const myOrg = [...divOrg];
      myOrg.push(
        <ComponentOrg
          key={key}
          onRemoveElement={removeOrganisation(key)}
        />
      );
      return myOrg;
    });
    setKey(key + 1);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
      }}
      validationSchema={Yup.object().shape({
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
            {divOrg.map(element => element)}
            <CardContent>
              <Grid
                item
                md={12}
                xs={12}
              >
                <Button variant="contained" onClick={addOrganisation}>
                    Add Organisation
                </Button>
              </Grid>
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
