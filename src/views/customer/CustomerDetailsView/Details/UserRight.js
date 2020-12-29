import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import wait from 'src/utils/wait';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography,
  Grid,
  Switch,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  updateButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary,
    '&:hover': {
      backgroundColor: theme.palette.secondary
    }
  }
}));

const UserRight = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
    enableReinitialize
    initialValues={{
        trainer: user.trainer || false,
        administrateur: user.administrateur || false,
        salesman: user.salesman || false,
        submit: null
    }}
    validationSchema={Yup.object().shape({
        trainer: Yup.bool(),
        administrateur: Yup.bool(),
        salesman: Yup.bool()
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
        enqueueSnackbar('Customer updated', {
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
      handleBlur,
      handleChange,
      handleSubmit,
      values
    }) => (
        <form onSubmit={handleSubmit}>
            <Card
            className={clsx(classes.root, className)}
            {...rest}
            >
                <CardHeader title="User Rights" />
                <Divider />
                <CardContent>
                    <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    >
                        <Grid
                            item
                            md={6}
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
                            Trainer
                            </Typography>
                            <Switch
                            checked={values.trainer}
                            edge="start"
                            name="trainer"
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
                            Administrateur
                            </Typography>
                            <Switch
                            checked={values.administrateur}
                            edge="start"
                            name="administrateur"
                            onChange={handleChange}
                            />
                        </Grid>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={classes.updateButton}
                    >
                    Update Account
                    </Button>
                </CardContent>
            </Card>
        </form>
    )}
    </Formik>
  );
};

UserRight.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserRight;
