import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, breadcrumbs, headerTitle, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb) => {

          if (breadcrumb.link) {
            return (
              <Link
                variant="body1"
                color="inherit"
                to={breadcrumb.link}
                component={RouterLink}
              >
                {breadcrumb.label}
              </Link>
            );
          } else {
            return (
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {breadcrumb.label}
              </Typography>
            )
          }
        })}
      </Breadcrumbs>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        {headerTitle}
      </Typography>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
