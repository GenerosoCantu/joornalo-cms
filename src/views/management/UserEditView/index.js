import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
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
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState();

  const getUser = useCallback(() => {
    axios
      .get(`http://localhost:4000/users/${userid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
