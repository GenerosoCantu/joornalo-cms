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
import SectionEditForm from './SectionEditForm';
import Header from '../../../components/Header';
import Error from '../../../components/Error';
import { getSection, createSection } from 'src/store/actions/sectionActions';
import { getCovers } from 'src/store/actions/coverActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function SectionEditView({ match }) {
  const {
    params: { sectionid },
  } = match;

  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { section } = useSelector((state) => { return state.section; });
  const { covers } = useSelector((state) => { return state.cover; });

  const pageTitle = (sectionid !== 'create') ? "Edit Section" : "Create Section";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "/app"
    },
    {
      label: "Sections",
      link: "/app/management/sections"
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (sectionid !== 'create') dispatch(getSection(sectionid))
    else dispatch(createSection());
    dispatch(getCovers());
  }, [isMountedRef]);


  return (
    <Page
      className={classes.root}
      title={pageTitle}
    >
      <Container maxWidth="lg">
        <Header breadcrumbs={breadcrumbs} headerTitle={pageTitle} />
        <Error />
        {(section || sectionid === 'create') && (
          <SectionEditForm section={section} covers={covers} />
        )}
      </Container>
    </Page>
  );
}

export default SectionEditView;
