import { Hidden, Drawer, Box, List } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import { useStyles } from "./useStyles";
interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}
const AdminSideBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      ></Box>
      {/* <hr className="divider-line" /> */}
      <Box p={2}>
        <List>
          {/* {adminRoutes.map((item) => {
            return (
              <SideBarItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            );
          })} */}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default AdminSideBar;
