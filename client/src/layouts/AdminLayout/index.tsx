import AdminTopBar from "components/_shares/menus/AdminTopbar";
import AdminSidebar from "components/_shares/sidebars/AdminSidebar";
import React, { useState } from "react";
import { useStyles } from "./useStyle";
import "./style.scss";

const AdminLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  // useAuthorize();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div id="admin-layout">
      <div className={classes.root}>
        <div className="admin-page">
          <AdminTopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <AdminSidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          {/* nav-bar-admin */}
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <div className="admin-wrap"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
