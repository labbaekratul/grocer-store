import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function ListOfUsers({ users, loading }) {
  const history = useHistory();
  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    if (id) {
      if (window.confirm("Are you sure to delete?")) {
        await axios.delete(`/api/products/${id}`);
        window.location.reload();
      }
    }
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    history.push(`/dashboard/users/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 170,
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
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 170,
    },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 170,
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

  users?.map((x, i) =>
    rows.push({
      id: i + 1,
      image: x?.image,
      name: x?.name,
      email: x?.email,
      isAdmin: x?.isAdmin === false ? "NO" : "YES",
    })
  );

  return (
    <div className="product-list-component">
      <h4>List of Users</h4>
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

export default ListOfUsers;
