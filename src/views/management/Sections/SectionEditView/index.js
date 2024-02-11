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
import SectionEditForm from './SectionEditForm';
import Header from '../../../../components/Header';
import Error from '../../../../components/Error';
import { getSection, newSection } from 'src/store/actions/sectionActions';
import { getCovers } from 'src/store/actions/coverActions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function SectionEditView() {
  let { sectionid, tenant } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { section } = useSelector((state) => { return state.section; });
  const { covers } = useSelector((state) => { return state.cover; });

  const pageTitle = (sectionid !== 'create') ? "Edit Section" : "Create Section";

  const breadcrumbs = [
    {
      label: "Dashboard",
      link: `/app/${tenant}`
    },
    {
      label: "Sections",
      link: `/app/${tenant}/management/sections`
    },
    {
      label: pageTitle
    }
  ];

  useEffect(() => {
    if (sectionid !== 'create') dispatch(getSection(sectionid))
    else dispatch(newSection());
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
        {(section || sectionid === 'create') && covers.length > 0 && (
          <SectionEditForm tenant={tenant} section={section} covers={covers} />
        )}
      </Container>
    </Page>
  );
}

export default SectionEditView;
