import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon, 
} from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import BulkOperations from './BulkOperations';

const getStatusLabel = (paymentStatus) => {
  const map = {
    canceled: {
      text: 'Canceled',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    },
    rejected: {
      text: 'Rejected',
      color: 'error'
    }
  };

  const { text, color } = map[paymentStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyPagination = (demands, page, limit) => {
  return demands.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const Results = ({ className, demands, ...rest }) => {
  const classes = useStyles();
  const [selectedDemands, setSelectedDemands] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleSelectAllDemands = (event) => {
    setSelectedDemands(event.target.checked
      ? demands.map((demand) => demand.id)
      : []);
  };

  const handleSelectOneDemand = (event, demandId) => {
    if (!selectedDemands.includes(demandId)) {
      setSelectedDemands((prevSelected) => [...prevSelected, demandId]);
    } else {
      setSelectedDemands((prevSelected) => prevSelected.filter((id) => id !== demandId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedDemands = applyPagination(demands, page, limit);
  const enableBulkOperations = selectedDemands.length > 0;
  const selectedSomeDemands = selectedDemands.length > 0 && selectedDemands.length < demands.length;
  const selectedAllDemands = selectedDemands.length === demands.length;

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {demands.length}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(demands.length / limit)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Demands"
        />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={1150}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAllDemands}
                      indeterminate={selectedSomeDemands}
                      onChange={handleSelectAllDemands}
                    />
                  </TableCell>
                  <TableCell>
                    Number
                  </TableCell>
                  <TableCell>
                    Contact
                  </TableCell>
                  <TableCell>
                    Method
                  </TableCell>
                  <TableCell>
                    Total
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDemands.map((demand) => {
                  const isDemandsSelected = selectedDemands.includes(demand.id);

                  return (
                    <TableRow
                      key={demand.id}
                      selected={selectedDemands.indexOf(demand.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isDemandsSelected}
                          onChange={(event) => handleSelectOneDemand(event, demand.id)}
                          value={isDemandsSelected}
                        />
                      </TableCell>
                      <TableCell>
                        {demand.number}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {moment(demand.createdAt).format('DD MMM YYYY | hh:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {demand.contact.name}
                      </TableCell>
                      <TableCell>
                        {demand.paymentMethod}
                      </TableCell>
                      <TableCell>
                        {numeral(demand.totalAmount).format(`${demand.currency}0,0.00`)}
                      </TableCell>
                      <TableCell>
                        {getStatusLabel(demand.status)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          component={RouterLink}
                          to="/app/management/demands/1"
                        >
                          <SvgIcon fontSize="small">
                            <EditIcon />
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
        <TablePagination
          component="div"
          count={demands.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <BulkOperations
        open={enableBulkOperations}
        selected={selectedDemands}
      />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  demands: PropTypes.array.isRequired
};

Results.defaultProps = {
  demands: []
};

export default Results;
