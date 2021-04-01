import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
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
import { getSections, createSection } from 'src/store/actions/sectionActions';
import SectionDeleteModal from './SectionDeleteModal';


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

function SectionListView() {
  const { t, i18n } = useTranslation(['translation', 'sections']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.section);
  const [modal, setModal] = useState({
    section: null,
    open: false
  });

  const breadcrumbs = [
    {
      label: t('Dashboard'),
      link: "/app"
    },
    {
      label: t('Sections')
    }
  ];

  const history = useHistory();
  const handleCreateSection = () => history.push('/app/management/sections/create');

  useEffect(() => {
    dispatch(getSections());
    dispatch(createSection());
  }, [dispatch]);

  if (!sections) {
    return null;
  }

  const resetModal = () => {
    setModal({
      section: null,
      open: false
    });
  };

  const handleModalClose = () => {
    resetModal();
  };

  const handleSectionDelete = () => {
    dispatch(getSections());
    resetModal();
  };

  const handleSectionDeleteClick = (section) => {
    setModal({
      open: true,
      section
    });
  };

  return (
    <Page
      className={classes.root}
      title={t('sections:section-list')}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle={t('sections:all-sections')} />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              onClick={handleCreateSection}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <PlusCircleIcon />
              </SvgIcon>
              {t('sections:new-section')}
            </Button>
          </Grid>
        </Grid>

        <Error />
        {sections && (
          <Box mt={3}>
            <Results sections={sections} onSectionDelete={handleSectionDeleteClick} />
          </Box>
        )}

        <SectionDeleteModal
          section={modal.section}
          onCancel={handleModalClose}
          onDelete={handleSectionDelete}
          open={modal.open}
        />
      </Container>
    </Page>
  );
}

export default SectionListView;
