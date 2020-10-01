import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Box,
  Container,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import UserEditForm from './UserEditForm';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import { getUser, newUser } from 'src/store/actions/userActions';
import { getSections } from 'src/store/actions/sectionActions';
import { getModules } from 'src/store/actions/moduleActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function UserEditView({ match }) {
  const {
    params: { userid },
  } = match;

  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { user } = useSelector((state) => { return state.user; });
  const { sections } = useSelector((state) => { return state.section; });
  const { modules } = useSelector((state) => { return state.module; });

  const pageTitle = (userid !== 'create') ? "Edit User" : "Create User";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "/app"
    },
    {
      label: "Users",
      link: "/app/management/users"
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (userid !== 'create') dispatch(getUser(userid))
    else dispatch(newUser());
    dispatch(getSections());
    dispatch(getModules());
  }, [isMountedRef]);

  return (
    <Page
      className={classes.root}
      title={pageTitle}
    >
      <Container maxWidth="lg">
        <Header breadcrumbs={breadcrumbs} headerTitle={pageTitle} />
        <Error />
        {(user || userid === 'create') && sections.length > 0 && modules.length > 0 && (
          <UserEditForm user={user} sections={sections} modules={modules} />
        )}
      </Container>
    </Page>
  );
}

export default UserEditView;
