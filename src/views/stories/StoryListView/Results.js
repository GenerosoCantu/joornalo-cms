/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Search as SearchIcon,
  Trash as TrashIcon
} from 'react-feather';
import { Status } from 'src/constants';
import { saveStoryQuery } from 'src/store/actions/storyActions';


const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({
  className,
  tenant,
  stories,
  metadata,
  sections,
  onStoryDelete,
  newQuery,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'stories']);

  const sortOptions = [
    {
      value: 'date|-1',
      label: t('stories:date-newest-first')
    },
    {
      value: 'date|1',
      label: t('stories:date-oldest-first')
    }
  ];

  const dispatch = useDispatch();

  const [newSearch, setNewSearch] = useState(true)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('date|-1')
  const [section, setSection] = useState('All')
  const [status, setStatus] = useState('All')
  const [date, setDate] = useState(null)

  const { storyQuery } = useSelector((state) => state.story);

  useEffect(() => {
    const search = {
      page,
      limit,
      sort,
      section,
      status,
      date
    }
    if (newSearch && storyQuery) {
      setPage(storyQuery.page)
      setLimit(storyQuery.limit)
      setSort(storyQuery.sort)
      setSection(storyQuery.section)
      setStatus(storyQuery.status)
      setDate(storyQuery.date)
      newQuery(storyQuery)
    } else {
      if (JSON.stringify(search) !== JSON.stringify(storyQuery)) {
        newQuery(search)
        dispatch(saveStoryQuery(search))
      }
    }
    setNewSearch(false)
  }, [page, limit, sort, section, status, date]);

  const handleDateChange = (date) => {
    setDate(date && date?._isValid ? date?._d : null)
  };

  const handleSortChange = (event) => {
    event.persist()
    setSort(event.target.value)
    setPage(0)
  };

  const handleSectionChange = (event) => {
    event.persist()
    setSection(event.target.value)
    setPage(0)
  };

  const handleStatusChange = (event) => {
    event.persist()
    setStatus(event.target.value)
    setPage(0)
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
    setPage(0)
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Divider />

      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <KeyboardDatePicker
          className={classes.datePicker}
          label="Date"
          format="MM/DD/YYYY"
          name="date"
          inputVariant="outlined"
          value={date}
          autoOk={true}
          disableFuture={true}
          disableToolbar={true}
          variant="dialog"
          clearable={true}
          clearLabel={t('translation:Clear')}
          showTodayButton={true}
          todayLabel={t('translation:Today')}
          onChange={handleDateChange}
        />

        <Box flexGrow={1} />

        <TextField
          label="Sections"
          name="sections"
          onChange={handleSectionChange}
          select
          SelectProps={{ native: true }}
          value={section}
          variant="outlined"
        >
          <option
            key="All"
            value="All"
          >
            {t('All')}
          </option>
          {sections.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.name}
            </option>
          ))}
        </TextField>

        <Box flexGrow={1} />

        <TextField
          label="Status"
          name="status"
          onChange={handleStatusChange}
          select
          SelectProps={{ native: true }}
          value={status}
          variant="outlined"
        >
          <option
            key="All"
            value="All"
          >
            {t('All')}
          </option>
          {Status.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.name}
            </option>
          ))}
        </TextField>

        <Box flexGrow={7} />

        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>

      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {t('translation:Date')}
                </TableCell>
                <TableCell>
                  {t('translation:Title')}
                </TableCell>
                <TableCell>
                  {t('translation:Section')}
                </TableCell>
                <TableCell>
                  {t('translation:Status')}
                </TableCell>
                <TableCell align="right">
                  {t('translation:Actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stories.map((story) => {
                return (
                  <TableRow
                    hover
                    key={story._id}
                  >
                    <TableCell>
                      {moment(story.date).format('DD/MMM/YY')}
                    </TableCell>
                    <TableCell>
                      {story.title}
                    </TableCell>
                    <TableCell>
                      {story.section}
                    </TableCell>
                    <TableCell>
                      {story.status}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/app/${tenant}/stories/${story._id}`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => onStoryDelete(story)}
                      >
                        <SvgIcon fontSize="small">
                          <TrashIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {metadata?.totalItems && (
        <TablePagination
          component="div"
          count={metadata.totalItems}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  stories: PropTypes.array,
  metadata: PropTypes.object,
  onStoryDelete: PropTypes.func,
  newQuery: PropTypes.func
};

Results.defaultProps = {
  stories: [],
  metadata: {},
  onStoryDelete: () => { },
  newQuery: () => { }
};

export default Results;
