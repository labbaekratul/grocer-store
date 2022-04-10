import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function ListOfOrders({ orders, loading }) {
  const history = useHistory();
  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    if (id) {
      if (window.confirm("Are you sure to delete?")) {
        await axios.delete(`/api/orders/${id}`);
        window.location.reload();
      }
    }
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    history.push(`/dashboard/orders/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "customer",
      headerName: "Customer  Name",
      width: 140,
      editable: true,
    },
    {
      field: "store",
      headerName: "Stores",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 150,
    },
    {
      field: "category",
      headerName: "Caterogy",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 150,
    },
    {
      field: "total",
      headerName: "Total Price",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 130,
    },
    {
      field: "isPaid",
      headerName: "IsPaid",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 130,
    },
    {
      field: "items",
      headerName: "Items",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 200,
    },
    {
      field: "purchasedAt",
      headerName: "Purchased ",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 130,
    },
    {
      field: "deleverydAt",
      headerName: "DeleverydAt",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 130,
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

  orders?.map((x, i) =>
    rows.push({
      id: x._id,
      customer: x?.shippingAddress?.fullName,
      total: x?.totalPrice,
      store: x?.orderItems?.map((y) => y?.store),
      category: x?.orderItems?.map((y) => y?.category),
      isPaid: x?.isPaid === false ? "Not Paid" : "Paid",
      items: x?.orderItems?.map((y) => y?.name),
      purchasedAt: x.createdAt.substring(0, 10),
      deleverydAt: "Not Decided",
    })
  );

  return (
    <div className="product-list-component">
      <h4>List of Orders</h4>
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

export default ListOfOrders;
