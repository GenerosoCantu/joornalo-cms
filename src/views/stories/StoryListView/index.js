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
import { getStories, newStory } from 'src/store/actions/storyActions';
import { getSections } from 'src/store/actions/sectionActions';
import StoryDeleteModal from '../StoryDeleteModal';


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

function StoryListView({ match }) {
  const {
    params: { tenant },
  } = match;

  const { t, i18n } = useTranslation(['translation', 'stories']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stories, metadata } = useSelector((state) => state.story);
  const { sections } = useSelector((state) => state.section);

  const [modal, setModal] = useState({
    stories: null,
    open: false
  });

  const [storyQuery, setStoryQuery] = useState(storyQuery ? storyQuery : {
    page: 0,
    limit: 10,
    section: "All",
    status: "All",
    sort: "date|-1",
    date: null
  });

  const breadcrumbs = [
    {
      label: t('Dashboard'),
      link: `/app/${tenant}`
    },
    {
      label: t('Stories')
    }
  ];

  const history = useHistory();
  const handleNewStory = () => {
    dispatch(newStory());
    history.push(`/app/${tenant}/stories/create`);
  }

  useEffect(() => {
    dispatch(getSections());
  }, [dispatch]);

  if (!stories) {
    return null;
  }

  const resetModal = () => {
    setModal({
      stories: null,
      open: false
    });
  };

  const handleModalClose = () => {
    resetModal();
  };

  const handleStoryDelete = () => {
    console.log('handleStoryDelete.......')
    dispatch(getStories(storyQuery));
    resetModal();
  };

  const handleStoryDeleteClick = (story) => {
    setModal({
      open: true,
      story
    });
  };

  const updateSearch = (newStoryQuery) => {
    setStoryQuery(newStoryQuery)
    dispatch(getStories(newStoryQuery));
  }

  return (
    <Page
      className={classes.root}
      title={t('stories:story-list')}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle={t('stories:Stories')} />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              onClick={handleNewStory}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <PlusCircleIcon />
              </SvgIcon>
              {t('stories:new-story')}
            </Button>
          </Grid>
        </Grid>

        <Error />
        {stories && (
          <Box mt={3}>
            <Results tenant={tenant} stories={stories} metadata={metadata} sections={sections} onStoryDelete={handleStoryDeleteClick} newQuery={updateSearch} />
          </Box>
        )}

        <StoryDeleteModal
          story={modal.story}
          onCancel={handleModalClose}
          onDelete={handleStoryDelete}
          open={modal.open}
        />
      </Container>
    </Page>
  );
}

export default StoryListView;
