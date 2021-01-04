import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Markdown from 'react-markdown/with-html';
import {
  Box,
  Chip,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  markdown: {
    fontFamily: theme.typography.fontFamily,
    '& p': {
      marginBottom: theme.spacing(2)
    }
  }
}));

const Brief = ({ className, session, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              Session Name
            </Typography>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              {session.title}
            </Typography>
            <Box mt={3}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                Tags
              </Typography>
              <Box mt={1}>
                {session.tags.map((tag) => (
                  <Chip
                    key={tag}
                    variant="outlined"
                    label={tag}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
          >
            Description
          </Typography>
          <Markdown
            source={session.description}
            className={classes.markdown}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

Brief.propTypes = {
  className: PropTypes.string,
  session: PropTypes.object.isRequired
};

export default Brief;
