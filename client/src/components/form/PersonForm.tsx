import React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import BasicDropdownMenu from "components/_shares/BasicDropdownMenu";

const genderData = [
	{value: 0, label: "Nam"},
	{value: 1, label: "Nữ"},
]

const PersonForm = () => {
  return (
	<form>
		<TextField id="standard-basic" label="Họ và tên" />
		
		<TextField
        id="date"
        label="Ngày sinh"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        />
		
		<BasicDropdownMenu
		label="Giới tính"
		data={genderData}/>

		
		<TextField id="standard-basic" label="Religion" />
		
		<InputLabel id="age">Trình độ học vấn</InputLabel>
		<Select
		labelId="level"
		onChange={(value) => console.log(value)}
		>
			<MenuItem value={0}>Nam</MenuItem>
			<MenuItem value={1}>Nữ</MenuItem>
		</Select>
		
	</form>
  );
};

export default PersonForm;
