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

const scholarshipData = [
	{value: 1, label: '1/12'},
	{value: 2, label: '2/12'},
	{value: 3, label: '3/12'},
	{value: 4, label: '4/12'},
	{value: 5, label: '5/12'},
	{value: 6, label: '6/12'},
	{value: 7, label: '7/12'},
	{value: 8, label: '8/12'},
	{value: 9, label: '9/12'},
	{value: 10, label: '10/12'},
	{value: 11, label: '11/12'},
	{value: 12, label: '12/12'},
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

		
		<TextField id="standard-basic" label="Tôn giáo" />
		
		<BasicDropdownMenu
		label="Học vấn"
		data={scholarshipData}/>
		
	</form>
  );
};

export default PersonForm;
