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
import { getNews, newNews } from 'src/store/actions/newsActions';
import { getSections } from 'src/store/actions/sectionActions';

// import NewsDeleteModal from './NewsDeleteModal';


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

function NewsListView() {
  const { t, i18n } = useTranslation(['translation', 'news']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { news, metadata } = useSelector((state) => state.news);
  const { sections } = useSelector((state) => state.section);

  const [modal, setModal] = useState({
    news: null,
    open: false
  });

  const breadcrumbs = [
    {
      label: t('Dashboard'),
      link: "/app"
    },
    {
      label: t('News')
    }
  ];

  const history = useHistory();
  const handleNewNews = () => history.push('/app/management/news/create');

  useEffect(() => {
    dispatch(getNews({
      page: 0,
      limit: 10,
      section: "All",
      status: "All",
      sort: "date|-1",
      date: null
    }));
    dispatch(getSections());
  }, [dispatch]);

  if (!news) {
    return null;
  }

  const resetModal = () => {
    setModal({
      news: null,
      open: false
    });
  };

  const handleModalClose = () => {
    resetModal();
  };

  const handleNewsDelete = () => {
    dispatch(getNews());
    resetModal();
  };

  const handleNewsDeleteClick = (news) => {
    setModal({
      open: true,
      news
    });
  };

  const updateSearch = (newsQuery) => {
    dispatch(getNews(newsQuery));
  }

  return (
    <Page
      className={classes.root}
      title={t('news:news-list')}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>
            <Header breadcrumbs={breadcrumbs} headerTitle={t('news:News')} />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              onClick={handleNewNews}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <PlusCircleIcon />
              </SvgIcon>
              {t('news:new-news')}
            </Button>
          </Grid>
        </Grid>

        <Error />
        {news && (
          <Box mt={3}>
            <Results news={news} metadata={metadata} sections={sections} onNewsDelete={handleNewsDeleteClick} newQuery={updateSearch} />
          </Box>
        )}
        {/* 
        <NewsDeleteModal
          news={modal.news}
          onCancel={handleModalClose}
          onDelete={handleNewsDelete}
          open={modal.open}
        /> */}
      </Container>
    </Page>
  );
}

export default NewsListView;
