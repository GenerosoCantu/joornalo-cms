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
import Header from './Header';
import Error from '../../../components/Error';
import { getUser } from 'src/store/actions/userActions';


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
  const { user } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(getUser(userid));
  }, [isMountedRef]);

  return (
    <Page
      className={classes.root}
      title="User Edit"
    >
      <Container maxWidth="lg">
        <Header />
        <Error />
        {user && (
          <Box mt={3}>
            <UserEditForm user={user} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default UserEditView;
