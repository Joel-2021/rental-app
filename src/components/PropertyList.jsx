import React, { useEffect, useState, useContext, useMemo } from "react";
import Modal from "./Modal";
import AuthContext from "../Context";
import { FetchPropertyList } from "../Fetch/FetchData";
import Table from "./Table/Table";
import ExportFile from './ExportFile'
import { Container, Typography } from "@mui/material";

export default function PropertyList() {
  const { isAdded } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

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
  }, [isAdded]);
  const memoizedData = useMemo(() => properties, [properties]);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <Typography variant="h6" color='rgba(96, 96, 96)'>Your Properties</Typography>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Modal />
        <ExportFile/>
        </div>
      </div>
      <Table data={memoizedData} />
    </Container>
  );
}
