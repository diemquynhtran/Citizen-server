import React from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { provinceApi } from "services/api/province";

const test_data =
[
	{
		name: 'Hà Nội',
		surveyed: 110000,
		progress: 0.5,
	},
	{
		name: 'Hồ Chí Minh',
		surveyed: 220000,
		progress: 0.9,
	},
]

const test_head = [
	{id: 1, label:"Tên"},
	{id: 2, label:"Số dân"},
	{id: 3, label:"Tiến độ"},
]

const B1ManagePage = () => {
	useRole(Role.B1);
	
	const getProvince = () => {
		provinceApi.getProvinces().then((res: any) => {
			if(res.status === 200) {
				return res.data;
			}
		})
	};
	
	//const provinceList = getProvince();
	const [cityID, setCityID] = React.useState(0);
	const [districtID, setDistrictID] = React.useState(0);
	const [data, setData] = React.useState(test_data);
	
	const onChange = (event: unknown) => {
		provinceApi.getProvinces().then((res: any) => {
			if(res.status === 200) {
				console.log(res.data);
			}
		}
	)};
	
	return (
		<Box mt={5} ml={5}>
			<Grid container>
			<Box mr={3} mt={1}>
			<Grid item>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={test_data}
					getOptionLabel={(element: any) => element.name}
					label="Tỉnh/Thành phố"
					onChange={onChange}
					/>
				</Box>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={test_data}
					getOptionLabel={(element: any) => element.name}
					label="Quận/Huyện"
					onChange={onChange}
					/>
				</Box>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={test_data}
					getOptionLabel={(element: any) => element.name}
					label="Phường/Xã"
					onChange={onChange}
					/>
				</Box>
				<Box mb={2}>	
					<EnhancedDropdownMenu
					options={test_data}
					getOptionLabel={(element: any) => element.name}
					label="Thôn/Làng"
					onChange={onChange}
					/>
				</Box>
				</Grid>
				</Box>
				<Grid item>
				<EnhancedStatisticalTable 
				tableName="Hello World"
				rows={test_data}
				head={test_head}
				/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default B1ManagePage;
