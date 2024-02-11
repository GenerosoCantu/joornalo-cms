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
import StoryEditForm from './StoryEditForm';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import { getStory, newStory } from 'src/store/actions/storyActions';
import { getSections } from 'src/store/actions/sectionActions';
// import { getCovers } from 'src/store/actions/coverActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function StoryEditView() {
  let { storyId, tenant } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { story } = useSelector((state) => state.story);
  const { sections } = useSelector((state) => state.section);
  // const { covers } = useSelector((state) => state.cover);

  const [sectionOptions, setSectionOptions] = useState([]);

  const pageTitle = (storyId !== 'create') ? "Edit Story" : "Create Story";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: `/app/${tenant}`
    },
    {
      label: "Stories",
      link: `/app/${tenant}/stories`
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (storyId !== 'create') dispatch(getStory(storyId))
    else dispatch(newStory());
    dispatch(getSections());
    // dispatch(getCovers());
  }, [isMountedRef]);

  useEffect(() => {
    if (sections) {
      setSectionOptions(
        sections.filter((section) => section.status === 'Active').map((section) => {
          return { id: section.id, name: section.name, subsections: section.subsections }
        })
      )
    }
  }, [sections]);

  // useEffect(() => {
  //   console.log('story==>', story)
  // }, [story]);


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
        {(story || storyId === 'create') && sectionOptions && (
          <StoryEditForm tenant={tenant} story={story} sectionOptions={sectionOptions} />
        )}
      </Container>
    </Page>
  );
}

export default StoryEditView;
