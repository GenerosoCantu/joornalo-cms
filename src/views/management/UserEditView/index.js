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
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import UserEditForm from './UserEditForm';
import Header from './Header';
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
  const { user } = useSelector((state) => state.user);

  // const isMountedRef = useIsMountedRef();
  // const [user, setUser] = useState();

  // const getUser = useCallback(() => {
  //   axios
  //     .get(`http://localhost:4000/users/${userid}`)
  //     .then((response) => {
  //       if (isMountedRef.current) {
  //         setUser(response.data);
  //       }
  //     });
  // }, [isMountedRef]);

  useEffect(() => {
    dispatch(getUser(userid));
  }, [dispatch]);

  // useEffect(() => {
  //   getUser();
  // }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="User Edit"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <UserEditForm user={user} />
        </Box>
      </Container>
    </Page>
  );
}

export default UserEditView;
