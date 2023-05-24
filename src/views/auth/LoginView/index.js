import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  },
  backButton: {
    marginLeft: theme.spacing(2)
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundColor: colors.grey[600],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    right: theme.spacing(3),
    height: 64,
    width: 64
  },
  media: {
    background: colors.grey[100],
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  logo: {
    position: 'relative',
    top: '-14rem',
    left: '3.5rem'
  }
}));

function LoginView({ match }) {
  const {
    params: { tenant },
  } = match;

  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push(`/app/${tenant}`);
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="md">
        <Box
          mb={8}
          display="flex"
          alignItems="center"
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Button
            component={RouterLink}
            to="/"
            className={classes.backButton}
          >
            Back to home
          </Button>
        </Box>
        <Card className={classes.card}>

          <CardContent className={classes.media}>
            <img className={classes.logo} src="./static/joornalo_logo.png" alt="Joornalo" height="80" width="293"></img>
          </CardContent>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Sign in
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Sign in on the internal platform
            </Typography>
            <Box mt={3}>
              <LoginForm tenant={tenant} onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
          </CardContent>

        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
