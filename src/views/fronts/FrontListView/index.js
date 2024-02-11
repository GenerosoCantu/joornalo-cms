import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
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
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import Results from './Results';
import { getFronts, newFront } from 'src/store/actions/frontActions';
import { getSections } from 'src/store/actions/sectionActions';

// import FrontDeleteModal from './FrontDeleteModal';


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

function FrontListView() {
  let { tenant } = useParams();
  const { t, i18n } = useTranslation(['translation', 'fronts']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fronts, metadata } = useSelector((state) => state.front);
  const { sections } = useSelector((state) => state.section);

  const [modal, setModal] = useState({
    fronts: null,
    open: false
  });

  const breadcrumbs = [
    {
      label: t('Dashboard'),
      link: `/app/${tenant}`
    },
    {
      label: t('Fronts')
    }
  ];

  const navigate = useNavigate();
  const handleNewFront = () => navigate(`/app/${tenant}/management/fronts/create`);

  useEffect(() => {
    dispatch(getFronts({
      page: 0,
      limit: 10,
      section: "All",
      status: "All",
      sort: "date|-1",
      date: null
    }));
    dispatch(getSections());
  }, [dispatch]);

  if (!fronts) {
    return null;
  }

  const resetModal = () => {
    setModal({
      fronts: null,
      open: false
    });
  };

  const handleModalClose = () => {
    resetModal();
  };

  const handleFrontDelete = () => {
    dispatch(getFronts());
    resetModal();
  };

  const handleFrontDeleteClick = (front) => {
    setModal({
      open: true,
      front
    });
  };

  const updateSearch = (frontQuery) => {
    dispatch(getFronts(frontQuery));
  }

  return (
    <Page
      className={classes.root}
      title={t('fronts:front-list')}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle={t('fronts:Fronts')} />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              onClick={handleNewFront}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <PlusCircleIcon />
              </SvgIcon>
              {t('fronts:new-front')}
            </Button>
          </Grid>
        </Grid>

        <Error />
        {fronts && (
          <Box mt={3}>
            <Results tenant={tenant} fronts={fronts} metadata={metadata} sections={sections} onFrontDelete={handleFrontDeleteClick} newQuery={updateSearch} />
          </Box>
        )}
        {/* 
        <FrontDeleteModal
          front={modal.front}
          onCancel={handleModalClose}
          onDelete={handleFrontDelete}
          open={modal.open}
        /> */}
      </Container>
    </Page>
  );
}

export default FrontListView;
