import React from "react";
import clsx from "clsx";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { useStyles } from "./useStyles";
import "./style.scss";
interface Props {
  className?: string;
  onMobileNavOpen: () => void;
  rest?: any;
}
const AdminTopBar: React.FC<Props> = ({ className, onMobileNavOpen, rest }) => {
  const classes = useStyles();
  //   const [notifications] = useState([]);
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <div className="title-logo-a">
          <Link to="/">
            <span className={"title-logo"}>Quản lý</span>
          </Link>
        </div>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* {user?.role?.code !== RoleAdmin.RENTER && <Notifications />} */}
          <IconButton color="inherit">
            <InputIcon className="admin-topbar-icon" />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            className="admin-topbar-icon"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopBar;
