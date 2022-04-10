import { Card } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-10">
            <div className="container">
              <div className="row dashboard-home">
                <div className="col-3">
                  <Card className="dash-card">
                    <div>
                      <h6>Total User : 20</h6>
                    </div>
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="dash-card">
                    <div>
                      <h6>Total Product : 20</h6>
                    </div>
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="dash-card">
                    <div>
                      <h6>Total Store : 20</h6>
                    </div>
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="dash-card">
                    <div>
                      <h6>Total Order : 20</h6>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
