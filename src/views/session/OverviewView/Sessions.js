import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import SessionCard from 'src/components/SessionCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const Sessions = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [sessions, setSessions] = useState([]);

  const getSessions = useCallback(async () => {
    try {
      const response = await axios.get('/api/sessions/overview/sessions');

      if (isMountedRef.current) {
        setSessions(response.data.sessions);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography
          className={classes.title}
          variant="h5"
          color="textPrimary"
        >
          Active Sessions
        </Typography>
        <Button
          component={RouterLink}
          to="/app/sessions/browse"
          endIcon={<KeyboardArrowRightIcon />}
        >
          See all
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
      >
        {sessions.map((session) => (
          <Grid
            item
            key={session.id}
            md={4}
            sm={6}
            xs={12}
          >
            <SessionCard session={session} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Sessions.propTypes = {
  className: PropTypes.string
};

export default Sessions;
