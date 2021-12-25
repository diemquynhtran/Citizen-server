import * as React from "react";
import PropTypes from "prop-types";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { useStylesToolbar } from "./useStyles";

interface Props {
  tableName: string;
}

const TableToolbar: React.FC<Props> = ({ tableName }) => {
  const classes = useStylesToolbar();
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title}>
        <h2>{tableName}</h2>
      </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
