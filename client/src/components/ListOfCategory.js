import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function ListOfCategory({ category, loading }) {
  const history = useHistory();
  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    if (id) {
      if (window.confirm("Are you sure to delete?")) {
        await axios.delete(`/api/category/${id}`);
        window.location.reload();
      }
    }
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    history.push(`/dashboard/category/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 90,
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

  category?.map((x, i) =>
    rows.push({
      id: x._id,
      name: x.name,
      image: x.image,
    })
  );

  const createCategory = () => {
    history.push("/dashboard/category/create");
  };

  return (
    <div className="product-list-component">
      <h4>List of Category</h4>
      <h3 onClick={createCategory}>Create Category +</h3>
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

export default ListOfCategory;
