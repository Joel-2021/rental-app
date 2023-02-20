import React,{useState} from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableFooter,
  TableRow,
  Paper,
  IconButton,
  TableHead,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
function TablePaginationActions(props) {
 
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function PropertyTable(props) {
    const navigate=useNavigate()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(props.data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Property Name</TableCell>
            <TableCell align="right">Tenant Name</TableCell>
            <TableCell align="right">BHK</TableCell>
            <TableCell align="right">Rent</TableCell>
            <TableCell align="right">Rent Date</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">View Proof</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? props.data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.data
          ).map((prop) => (
            <TableRow
              key={prop.id}
              onClick={() =>navigate(`/home/${prop.id}`)}
              style={{"&:hover":{
                'cursor':'pointer'
              }}}
            >
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                {prop.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {prop.property_name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {prop.tenant_name}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                {prop.bhk}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {prop.rent}
              </TableCell>
              <TableCell style={{ width: 100 }} align="right">
                {prop.rent_date}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {prop.phone_number}
              </TableCell>
              <TableCell style={{ width: 100 }} align="right">
                <a target="_blank" rel="noreferrer" href={prop.adhar_pic}>
                  click
                </a>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter style={{width:'100%'}}>
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[10, 15, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
