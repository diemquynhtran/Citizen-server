import { hexToRgb, makeStyles } from "@material-ui/core";
export const useStyles: any = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ede9e9",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb("#000000") + ", 0.26)",
    top: "100%",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: "white",
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    lineHeight: "1.42857143",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    zIndex: 1300,
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
    },
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "unset !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
        padding: "0px !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: "#ffffff !important",
          margin: "10px 15px 0!important",
          padding: "10px 15px !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none",
          },
        },
      },
    },
  },
  paper: {
    maxHeight: "500px",
    overflowY: "scroll",
  },
}));
