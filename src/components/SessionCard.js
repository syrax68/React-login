import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Users as UsersIcon } from 'react-feather';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  membersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

const SessionCard = ({ className, session, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(session.isLiked);
  const [likesCount, setLikesCount] = useState(session.likesCount);

  const handleLike = () => {
    setLiked(true);
    setLikesCount((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikesCount((prevLikes) => prevLikes - 1);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={3}>
        <CardMedia
          className={classes.image}
          image={session.image}
        />
        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Avatar
            alt="Author"
            src={session.author.avatar}
          >
            {getInitials(session.author.name)}
          </Avatar>
          <Box ml={2}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="#"
              variant="h5"
            >
              {session.title}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              by
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="#"
                variant="h6"
              >
                {session.author.name}
              </Link>
              {' '}
              | Updated
              {' '}
              {moment(session.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {session.caption}
        </Typography>
      </Box>
      <Box
        py={2}
        px={3}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {numeral(session.budget).format(`${session.currency}0,0.00`)}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Budget
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {session.location}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Location
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {session.type}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Type
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton
              className={classes.likedButton}
              onClick={handleUnlike}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {likesCount}
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.membersIcon}
        >
          <UsersIcon />
        </SvgIcon>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {session.membersCount}
        </Typography>
        <Box flexGrow={1} />
        <Rating
          value={session.rating}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  );
};

SessionCard.propTypes = {
  className: PropTypes.string,
  session: PropTypes.object.isRequired
};

export default SessionCard;
