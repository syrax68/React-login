import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import ContactInfo from './ContactInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions';
import UserRight from './UserRight';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = ({
  contact,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ContactInfo contact={contact} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Invoices contact={contact} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Emails />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <OtherActions />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <UserRight user={user} />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  contact: PropTypes.object.isRequired
};

export default Details;
