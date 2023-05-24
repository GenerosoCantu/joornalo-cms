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

function StoryEditView({ match }) {
  const {
    params: { storyId, tenant },
  } = match;

  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { story } = useSelector((state) => { return state.story; });
  const { sections } = useSelector((state) => state.section);
  // const { covers } = useSelector((state) => { return state.cover; });

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
    console.log(sections)
    if (sections) {
      setSectionOptions(
        sections.map((section) => {
          if (section.status === 'Active') {
            return { id: section.id, name: section.name, subsections: section.subsections }
          }
        })
      )
      // setSectionOptions([
      //   ...[{ id: '', name: '' }],
      //   ...sections.map((section) => {
      //     if (section.status === 'Active') {
      //       return { id: section.id, name: section.name }
      //     }
      //   })
      // ])
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
