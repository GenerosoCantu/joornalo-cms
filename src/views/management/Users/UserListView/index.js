import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

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
  SvgIcon
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather';
import Page from 'src/components/Page';
import Header from '../../../../components/Header';
import Error from '../../../../components/Error';
import Results from './Results';
import { getUsers, newUser } from 'src/store/actions/userActions';
import UserDeleteModal from './UserDeleteModal';


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
  let { tenant } = useParams();
  const { t, i18n } = useTranslation(['translation', 'users']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [modal, setModal] = useState({
    user: null,
    open: false
  });

  const breadcrumbs = [
    {
      label: t('Dashboard'),
      link: `/app/${tenant}`
    },
    {
      label: t('Users')
    }
  ];

  const navigate = useNavigate();
  const handleNewUser = () => navigate(`/app/${tenant}/management/users/create`);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(newUser());
  }, [dispatch]);

  if (!users) {
    return null;
  }

  const resetModal = () => {
    setModal({
      user: null,
      open: false
    });
  };

  const handleModalClose = () => {
    resetModal();
  };

  const handleUserDelete = () => {
    dispatch(getUsers());
    resetModal();
  };

  const handleUserDeleteClick = (user) => {
    setModal({
      open: true,
      user
    });
  };

  return (
    <Page
      className={classes.root}
      title={t('users:user-list')}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle={t('users:all-users')} />
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
              {t('users:new-user')}
            </Button>
          </Grid>
        </Grid>

        <Error />
        {users && (
          <Box mt={3}>
            <Results tenant={tenant} users={users} onUserDelete={handleUserDeleteClick} />
          </Box>
        )}

        <UserDeleteModal
          user={modal.user}
          onCancel={handleModalClose}
          onDelete={handleUserDelete}
          open={modal.open}
        />
      </Container>
    </Page>
  );
}

export default UserListView;
