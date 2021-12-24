import React from "react";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { spacing } from "@material-ui/system";
import { sizing } from "@material-ui/system";

import { useStyles } from "./useStyles";

interface Props {
  //className?: string;
  //onMobileNavOpen: () => void;
  //rest?: any;
  className?: string;
  options: any;
  getOptionLabel: any;
  label: string;
  onChange: any;
}

const AutocompleteDropdown: React.FC<Props> = ({
  className,
  options,
  getOptionLabel,
  label,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      className={clsx(classes.root, className)}
      disablePortal
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      onChange={onChange}
    />
  );
};

export default AutocompleteDropdown;
