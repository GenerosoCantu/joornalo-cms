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
import StoryEditForm from './StoryEditForm';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import { getStory, newStory } from 'src/store/actions/storyActions';
// import { getCovers } from 'src/store/actions/coverActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function StoryEditView({ match }) {
  const {
    params: { storyId },
  } = match;

  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { story } = useSelector((state) => { return state.story; });
  // const { covers } = useSelector((state) => { return state.cover; });

  const pageTitle = (storyId !== 'create') ? "Edit Story" : "Create Story";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "/app"
    },
    {
      label: "Stories",
      link: "/app/stories"
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (storyId !== 'create') dispatch(getStory(storyId))
    else dispatch(newStory());
    // dispatch(getCovers());
  }, [isMountedRef]);

  useEffect(() => {
    console.log(story)
  }, [story]);


  return (
    <Page
      className={classes.root}
      title={pageTitle}
    >
      {/* <Container maxWidth="lg">
       */}
      <Container maxWidth={false}>
        <Header breadcrumbs={breadcrumbs} headerTitle={pageTitle} />
        <Error />
        {(story || storyId === 'create') && (
          <StoryEditForm story={story} />
        )}
      </Container>
    </Page>
  );
}

export default StoryEditView;
