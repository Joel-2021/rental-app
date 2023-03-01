import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import "./Table.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  ErrorOutlineOutlined,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Search,
  TaskAlt,
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
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const search_ref = useRef();

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);
console.log(filteredData)
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterData = (search) => {
    const filter = props.data?.filter((data) => {
      return (
        data.property_name.toLowerCase().includes(search.toLowerCase()) ||
        data.tenant_name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone_number.includes(search)
      );
    });
    return filter;
  };

  return (
    <>
      <TextField
        type="string"
        inputRef={search_ref}
        placeholder="Search Property Name or Tenant Name or Phone Number"
        style={{ width: "100%", margin: "0 0 10px 0" }}
        onChange={() => {
          setFilteredData(filterData(search_ref.current.value));
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} style={{ overflow: "auto" }}>
        <Table size={window.innerWidth < 400 ? "small" : ""}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(96, 96, 96)",
                  fontWeight: "600",
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell align="right">Property Name</TableCell>
              <TableCell align="right">BHK</TableCell>
              <TableCell align="right">Tenant Name</TableCell>
              <TableCell align="right">Rent</TableCell>
              <TableCell align="right">Rent Date</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Rent Status</TableCell>
              <TableCell align="right">View Proof</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            ).map((data) => (
              <TableRow
                key={data.id}
                onClick={() => navigate(`/home/${data.id}`)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#E4E8F3",
                  },
                }}
              >
                <TableCell component="th" scope="row" style={{ width: 10 }}>
                  {data.id}
                </TableCell>
                <TableCell
                  style={{ width: { xs: "10px", lg: "160px" } }}
                  align="right"
                >
                  {data.property_name}
                </TableCell>
                <TableCell style={{ width: 10 }} align="right">
                  {data.bhk}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                 {data.is_tenant_active && data.tenant_name } 
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                {data.is_tenant_active && data.rent } 
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  {data.is_tenant_active && data.rent_date } 
                </TableCell>
                <TableCell style={{ width: 160}} align="right">
                {data.is_tenant_active && data.phone_number } 
                </TableCell>
                <TableCell style={{ width: 160}} align="right">
                  {data.is_tenant_active && (data.is_paid ? <TaskAlt/> :<ErrorOutlineOutlined/>)}
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  {data.is_tenant_active &&
                  <a target="_blank" rel="noreferrer" href={data.adhar_pic}>
                    click
                  </a>
                  }
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Box>
      </TableContainer>
    </>
  );
}
