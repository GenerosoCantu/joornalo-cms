import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  SvgIcon
} from '@material-ui/core';
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather';
import Page from 'src/components/Page';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import Results from './Results';
import { getUsers, newUser } from 'src/store/actions/userActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function UserListView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "/app"
    },
    {
      label: "Users"
    }
  ];

  const history = useHistory();
  const handleNewUser = () => history.push('/app/management/users/create');

  useEffect(() => {
    dispatch(getUsers());
    dispatch(newUser());
  }, [dispatch]);

  if (!users) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="User List"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle="All Users" />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              onClick={handleNewUser}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <PlusCircleIcon />
              </SvgIcon>
              New User
            </Button>
          </Grid>
        </Grid>

        <Error />
        {users && (
          <Box mt={3}>
            <Results users={users} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default UserListView;
