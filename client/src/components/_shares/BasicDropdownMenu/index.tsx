import React from "react";
import clsx from "clsx";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { useStyles } from "./useStyles";

interface Props {
	label: string,
	onChange?: any,
	data: any,
}

const BasicDropdown: React.FC<Props> = ({ label, onChange, data }) => {
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
			  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			  width: 250,
			},
		},
	};
	
	const classes = useStyles();
	return (
		<FormControl>
			<InputLabel id="a">{label}</InputLabel>
			<Select
			labelId="a"
			onChange={onChange}
			MenuProps={MenuProps}
			>
				{ data.map((option: any) => (<MenuItem value={option.value}>{option.label}</MenuItem>)) }
			</Select>
		</FormControl>
	);
};

export default BasicDropdown;
