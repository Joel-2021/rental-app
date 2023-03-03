import React, { useEffect, useState, useContext, useMemo } from "react";
import Modal from "./Modal";
import AuthContext from "../Context";
import { FetchPropertyList, fetchExcel } from "../Fetch/FetchData";
import Table from "./Table/Table";
import ImportFile from "./ImportFile";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { GetApp, Close, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function PropertyList() {
  const { isAdded,isDeleted } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await FetchPropertyList();
        setProperties(properties);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProperties();
  }, [isAdded,isDeleted]);

  function handleExport() {
    fetchExcel();
  }

  const memoizedData = useMemo(() => properties, [properties]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <Typography variant="h6" color="rgba(96, 96, 96)">
          Your Properties
        </Typography>
        {isMobile ? (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
              <IconButton onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <Close /> : <Menu />}
              </IconButton>
            </div>
            <Box
              sx={{
                display: { xs: !showMenu && "none", lg: "flex" },
                gap: "10px",
                flexDirection: { xs: "row", lg: "column",md:'column',sm:'column' },
              }}
            >
              <Modal />
              <ImportFile />
              <Button
                startIcon={<GetApp />}
                onClick={handleExport}
                sx={{
                  color: "#537FE7",
                  "&:hover": {
                    backgroundColor: "#537FE7",
                    color: "white",
                  },
                  width: { xs: "80px", lg: "150px" },
                  height: { xs: "30px", lg: "40px" },
                  fontSize: { xs: "10px", lg: "13px" },
                }}
              >
                Export
              </Button>
            </Box>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Modal />
            <ImportFile />
            <Button
              startIcon={<GetApp />}
              onClick={handleExport}
              sx={{
                color: "#537FE7",
                "&:hover": {
                  backgroundColor: "#537FE7",
                  color: "white",
                },
                width: { xs: "80px", lg: "150px" },
                height: { xs: "30px", lg: "40px" },
                fontSize: { xs: "10px", lg: "13px" },
              }}
            >
              Export
            </Button>
          </Box>
        )}
      </div>
      <Table data={memoizedData} />
    </Container>
  );
}
