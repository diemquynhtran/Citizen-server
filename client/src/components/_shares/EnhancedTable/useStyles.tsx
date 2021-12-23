import { hexToRgb, makeStyles, Theme } from "@material-ui/core";
export const useStylesToolbar: any = makeStyles((theme: Theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
	title: {
      flex: '1 1 100%',
    },
}));

export const useStylesTable = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 700,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);