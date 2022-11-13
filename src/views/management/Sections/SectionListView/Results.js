/* eslint-disable max-len */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import getInitials from 'src/utils/getInitials';
import { StatusTypes } from 'src/constants';


function applyFilters(sections, query, status) {
  return sections.filter((section) => {
    let matches = true;
    if (query) {
      const properties = ['name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (section[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    if (status && status !== 'All' && section.status !== status) {
      matches = false;
    }

    return matches;
  });
}

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
  sections,
  onSectionDelete,
  ...rest
}) {
  const classes = useStyles();
  const { t, i18n } = useTranslation(['translation', 'sections']);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    event.persist();
    setStatus(event.target.value);
  };

  const filteredSections = applyFilters(sections, query, status);

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
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder={t('sections:search-sections')}
          value={query}
          variant="outlined"
        />
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
          {StatusTypes.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.name}
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
                  {t('translation:Name')}
                </TableCell>
                <TableCell>
                  {t('translation:Email')}
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
              {filteredSections.map((section) => {
                return (
                  <TableRow
                    hover
                    key={section.id}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/app/management/sections/${section.id}`}
                            variant="h6"
                          >
                            {section.name}
                          </Link>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {section.email}
                    </TableCell>
                    <TableCell>
                      {section.status}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/sections/${section.id}`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => onSectionDelete(section)}
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
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.array,
  onSectionDelete: PropTypes.func
};

Results.defaultProps = {
  sections: [],
  onSectionDelete: () => { }
};

export default Results;
