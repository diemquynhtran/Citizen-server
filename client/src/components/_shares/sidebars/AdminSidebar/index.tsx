import { Hidden, Drawer, Box, List } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./style.scss";
import { useStyles } from "./useStyles";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}
const AdminSideBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { userInfo } = useSelector((state: RootState) => state.user);

  let userrole = userInfo?.role;
  var role = "";
  if (userrole === 0) {
    role = "A1";
  } else if (userrole === 1) {
    role = "A2";
  } else if (userrole === 2) {
    role = "A3";
  } else if (userrole === 3) {
    role = "B1";
  }

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
            <Box p={2} padding="0">
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                style={{ padding: 0 }}
              >
                {(() => {
                  switch (userInfo?.role) {
                    case 3:
                      return (
                        <>
                          <Link
                            to={"/admin/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 1}
                              onClick={(event) => handleListItemClick(event, 1)}
                              onBlur={(event) => handleListItemClick(event, 1)}
                            >
                              <ListItemIcon>
                                <EqualizerIcon />
                              </ListItemIcon>
                              <ListItemText primary="Thống kê" />
                            </ListItem>
                          </Link>

                          <Link
                            to={"/manage/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 2}
                              onClick={(event) => handleListItemClick(event, 2)}
                              onBlur={(event) => handleListItemClick(event, 2)}
                            >
                              <ListItemIcon>
                                <LibraryBooksIcon />
                              </ListItemIcon>
                              <ListItemText primary="Quản lý" />
                            </ListItem>
                          </Link>

                          <Link
                            to={"/searchperson/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 3}
                              onClick={(event) => handleListItemClick(event, 3)}
                              onBlur={(event) => handleListItemClick(event, 3)}
                            >
                              <ListItemIcon>
                                <PeopleIcon />
                              </ListItemIcon>
                              <ListItemText primary="Theo dõi" />
                            </ListItem>
                          </Link>

                          <Link
                            to="/addperson"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 4}
                              onClick={(event) => handleListItemClick(event, 4)}
                            >
                              <ListItemIcon>
                                <EditIcon />
                              </ListItemIcon>
                              <ListItemText primary="Nhập liệu" />
                            </ListItem>
                          </Link>
                        </>
                      );
                    case 4:
                      return (
                        <Link
                          to="admin/b2"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <ListItem
                            className="list-item"
                            button
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 1)}
                          >
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nhập liệu" />
                          </ListItem>
                        </Link>
                      );
                    default:
                      return (
                        <>
                          <Link
                            to={"/admin/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 1}
                              onClick={(event) => handleListItemClick(event, 1)}
                              onBlur={(event) => handleListItemClick(event, 1)}
                            >
                              <ListItemIcon>
                                <EqualizerIcon />
                              </ListItemIcon>
                              <ListItemText primary="Thống kê" />
                            </ListItem>
                          </Link>

                          <Link
                            to={"/manage/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 2}
                              onClick={(event) => handleListItemClick(event, 2)}
                              onBlur={(event) => handleListItemClick(event, 2)}
                            >
                              <ListItemIcon>
                                <LibraryBooksIcon />
                              </ListItemIcon>
                              <ListItemText primary="Quản lý" />
                            </ListItem>
                          </Link>

                          <Link
                            to={"/searchperson/" + role}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItem
                              className="list-item"
                              button
                              selected={selectedIndex === 3}
                              onClick={(event) => handleListItemClick(event, 3)}
                              onBlur={(event) => handleListItemClick(event, 3)}
                            >
                              <ListItemIcon>
                                <PeopleIcon />
                              </ListItemIcon>
                              <ListItemText primary="Theo dõi" />
                            </ListItem>
                          </Link>
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
