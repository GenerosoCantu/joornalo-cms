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
import FrontEditForm from './FrontEditForm';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import { getFront, newFront } from 'src/store/actions/frontActions';
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

function FrontEditView() {
  let { frontId, tenant } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { front } = useSelector((state) => state.front);
  const { sections } = useSelector((state) => state.section);
  // const { covers } = useSelector((state) => { return state.cover; });

  const [sectionOptions, setSectionOptions] = useState([]);

  const pageTitle = (frontId !== 'create') ? "Edit Front" : "Create Front";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: `/app/${tenant}`
    },
    {
      label: "Fronts",
      link: `/app/${tenant}/fronts`
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (frontId !== 'create') dispatch(getFront(frontId))
    else dispatch(newFront());
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

  useEffect(() => {
    console.log(front)
  }, [front]);


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
        {(front || frontId === 'create') && sectionOptions && (
          <FrontEditForm tenant={tenant} front={front} sectionOptions={sectionOptions} />
        )}
      </Container>
    </Page>
  );
}

export default FrontEditView;
