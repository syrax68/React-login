import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

const statusOptions = ['Canceled', 'Completed', 'Rejected'];

const useStyles = makeStyles(() => ({
  root: {}
}));

const DemandInfo = ({ className, demand, ...rest }) => {
  const classes = useStyles();
  const [status, setStatus] = useState(statusOptions[0]);

  const handleChange = (event) => {
    event.persist();
    setStatus(event.target.value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Demand info" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              Contact
            </TableCell>
            <TableCell>
              <Link
                component={RouterLink}
                to="/app/management/contacts/1"
              >
                {demand.contact.name}
              </Link>
              <div>{demand.contact.address1}</div>
              <div>{demand.contact.city}</div>
              <div>{demand.contact.country}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              #
              {demand.id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Number
            </TableCell>
            <TableCell>
              {demand.number}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              {moment(demand.createdAt).format('DD/MM/YYYY HH:MM')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Promotion Code
            </TableCell>
            <TableCell>
              {demand.coupon ? demand.coupon : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Total Amount
            </TableCell>
            <TableCell>
              {numeral(demand.totalAmount).format(`${demand.currency}0,0.00`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Status
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                name="option"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={status}
                variant="outlined"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </TextField>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardActions>
        <Button startIcon={<ReceiptIcon />}>
          Resend invoice
        </Button>
      </CardActions>
    </Card>
  );
};

DemandInfo.propTypes = {
  className: PropTypes.string,
  demand: PropTypes.object.isRequired
};

export default DemandInfo;
