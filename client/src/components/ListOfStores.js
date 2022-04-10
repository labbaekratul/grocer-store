import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function ListOfStores({ stores, loading }) {
  const history = useHistory();
  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    if (id) {
      if (window.confirm("Are you sure to delete?")) {
        await axios.delete(`/api/store/${id}`);
        window.location.reload();
      }
    }
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    history.push(`/dashboard/stores/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 180,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="dashboard-product-img">
            <img src={params.row.image} alt="" className="dasg-img" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      editable: true,
    },
    {
      field: "opening",
      headerName: "OpenAt",
      width: 170,
      editable: true,
    },
    {
      field: "delivering",
      headerName: "DeliveredAt",
      width: 170,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let rows = [];

  stores?.map((x) =>
    rows.push({
      id: x._id,
      image: x?.image,
      name: x?.name,
      opening: x?.openingTime,
      delivering: x?.deliveryTime,
    })
  );

  const createStore = () => {
    history.push("/dashboard/store/create");
  };

  return (
    <div className="product-list-component">
      <h4>Choose Your Stores</h4>
      <h3 onClick={createStore}>Create Store +</h3>
      {rows ? (
        <div className="product-list">
          <div style={{ width: "90%" }}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              loading={loading}
              getRowId={(rows) => rows.id}
              components={{ Toolbar: GridToolbar }}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ListOfStores;
