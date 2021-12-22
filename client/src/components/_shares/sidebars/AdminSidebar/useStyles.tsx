import { makeStyles } from "@material-ui/core";
export const useStyles: any = makeStyles((theme: any) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
    borderTop: "1px solid #ede9e9",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    // border: `2px solid gray`,
    boxShadow:
      ": 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  input: {
    display: "none",
  },
}));
export const useStyleItem: any = makeStyles((theme: any) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));
