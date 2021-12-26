import React from "react";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from '@material-ui/core/Paper';
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
  value?: any;
  onChange: any;
  isStandard?: boolean;
  inputValue?: string;
  onInputChange?: any;
}

const AutocompleteDropdown: React.FC<Props> = ({
  className,
  options,
  getOptionLabel,
  label,
  value,
  onChange,
  isStandard,
  inputValue,
  onInputChange,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      className={clsx(classes.root, className)}
      disablePortal
	  inputValue={inputValue}
	  onInputChange={onInputChange}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={isStandard ? "standard" : "outlined"} />
      )}
	  value={value}
      onChange={onChange}
    />
  );
};

export default AutocompleteDropdown;
