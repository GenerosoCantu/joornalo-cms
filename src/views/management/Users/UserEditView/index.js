import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  FormHelperText
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import UserEditForm from './UserEditForm';
import Header from '../../../../components/Header';
import Error from '../../../../components/Error';
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

function UserEditView() {
  let { userid, tenant } = useParams();
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
      link: `/app/${tenant}`
    },
    {
      label: "Users",
      link: `/app/${tenant}/management/users`
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
          <UserEditForm tenant={tenant} user={user} sections={sections} modules={modules} />
        )}
      </Container>
    </Page>
  );
}

export default UserEditView;
