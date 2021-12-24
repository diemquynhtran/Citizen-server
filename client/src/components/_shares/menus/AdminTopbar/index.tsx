import React from "react";
import clsx from "clsx";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import { Link } from "react-router-dom";
import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { useStyles } from "./useStyles";
import "./style.scss";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/UserReducer/action";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface Props {
  className?: string;
  onMobileNavOpen: () => void;
  rest?: any;
}

const AdminTopBar: React.FC<Props> = ({ className, onMobileNavOpen, rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   const [notifications] = useState([]);
  const logOut = () => {
    dispatch(UserFunction.logout());
  };
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <div className="title-logo-a">
          <Link to="/">
            <span className={"title-logo"}>
              <img
                src="https://dichvucong.moh.gov.vn/byte-dvc-theme/images/logo.png"
                alt=""
                width="45px"
                height="45px"
                style={{
                  marginLeft: "0px",
                  marginRight: "15px",
                  marginTop: "0px",
                }}
              />
              <i>CitizenV</i>
            </span>
          </Link>
        </div>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* {user?.role?.code !== RoleAdmin.RENTER && <Notifications />} */}
          <AccountCircleTwoToneIcon
            style={{ marginRight: "10px" }}
            className="admin-topbar-icon"
          />
          <h2 className="title-logo" style={{ marginTop: 5, marginLeft: 0 }}>
            {userInfo?.displayName}
          </h2>
          {/* insert userInfo.provin vào thay hà nội */}
          <IconButton color="inherit" onClick={logOut}>
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
