import { Hidden, Drawer, Box, List } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import { useStyles } from "./useStyles";
import SideBarItem from "./SideBarItem";
import { history } from "helpers/history";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Role } from "settings/role";

interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}
const AdminSideBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { userInfo } = useSelector((state: RootState) => state.user);
  const handleListItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const classes = useStyles();
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        ></Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <Box height="100%" display="flex" flexDirection="column">
            {/* <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      ></Box> */}
            {/* <hr className="divider-line" /> */}
            <Box p={2} padding="0">
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                style={{ padding: 0 }}
              >
                {(() => {
                  switch (userInfo?.role) {
                    case 4:
                      return (
                        <ListItem
                          className="list-item"
                          button
                          selected={selectedIndex === 3}
                          onClick={(event) => handleListItemClick(event, 3)}
                        >
                          <ListItemIcon>
                            <PeopleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Dân số" />
                        </ListItem>
                      );
                    default:
                      return (
                        <>
                          <ListItem
                            className="list-item"
                            button
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                          >
                            <ListItemIcon>
                              <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thống kê" />
                          </ListItem>
                          <ListItem
                            className="list-item"
                            button
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                          >
                            <ListItemIcon>
                              <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quản lý" />
                          </ListItem>
                          <ListItem
                            className="list-item"
                            button
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                          >
                            <ListItemIcon>
                              <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Theo dõi" />
                          </ListItem>
                          <ListItem
                            className="list-item"
                            button
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)}
                          >
                            <ListItemIcon>
                              <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nhập liệu" />
                          </ListItem>
                        </>
                      );
                  }
                })()}
              </List>
            </Box>
            <Box flexGrow={1} />
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
};

export default AdminSideBar;
