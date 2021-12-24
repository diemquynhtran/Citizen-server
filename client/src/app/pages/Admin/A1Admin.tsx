import React, {useEffect} from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { provinceApi } from "services/api/province";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";


const head = [
	{id: 1, label:"Mã"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Đã hoàn thành?"},
]

const A1StatPage = () => {
	useRole(Role.A1);
	
	const [province, setProvince] = React.useState([]);
	const [district, setDistrict] = React.useState([]);
	const [ward, setWard] = React.useState([]);
	const [village, setVillage] = React.useState([]);
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("Toàn quốc");
	
	useEffect(() => {
		provinceApi.getProvinces().then((res: any) => {
			if (res.status === 200) {
				setProvince(res.data);
				console.log(res.data);
				setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
			}
		})
	}, []);
	
	const onChangeProvince = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			districtApi.getByProvince(value.code).then((res: any) => {
				if (res.status === 200) {
					setDistrict(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		}
	};
	
	const onChangeDistrict = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setWard(res.data.result);
					console.log(res.data);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		}
	};
	
	const onChange = (event: unknown) => {};
	
	return (
		<Box mt={5} ml={5}>
			<Grid container>
			<Box mr={3} mt={1}>
			<Grid item>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={province}
					getOptionLabel={(element: any) => element.name}
					label="Tỉnh/Thành phố"
					onChange={onChangeProvince}
					/>
				</Box>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={district}
					getOptionLabel={(element: any) => element.name}
					label="Quận/Huyện"
					onChange={onChangeDistrict}
					/>
				</Box>
				<Box mb={2}>
					<EnhancedDropdownMenu
					options={ward}
					getOptionLabel={(element: any) => element.name}
					label="Phường/Xã"
					onChange={onChange}
					/>
				</Box>
				<Box mb={2}>	
					<EnhancedDropdownMenu
					options={village}
					getOptionLabel={(element: any) => element.name}
					label="Thôn/Làng"
					onChange={onChange}
					/>
				</Box>
				</Grid>
				</Box>
				<Grid item>
				<EnhancedStatisticalTable 
				tableName={tableName}
				rows={data}
				head={head}
				/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default A1StatPage;
