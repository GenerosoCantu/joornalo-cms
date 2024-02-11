import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Link,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
        {breadcrumbs.map((breadcrumb, index) => {

          if (breadcrumb.link) {
            return (
              <Link
                key={index.toString()}
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
                key={index.toString()}
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
