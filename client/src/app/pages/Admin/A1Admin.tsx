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
import { villageApi } from "services/api/village";


const head = [
	{id: 1, label:"Mã"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Đã hoàn thành?"},
]

const A1AdminPage = () => {
	useRole(Role.A1);
	
	const [province, setProvince] = React.useState([]);
	const [district, setDistrict] = React.useState([]);
	const [ward, setWard] = React.useState([]);
	const [village, setVillage] = React.useState([]);
	
	const [provinceID, setProvinceID] = React.useState("");
	const [districtID, setDistrictID] = React.useState("");
	const [wardID, setWardID] = React.useState("");
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("Toàn quốc");
	
	const [provinceName, setProvinceName] = React.useState("");
	const [districtName, setDistrictName] = React.useState("");
	const [wardName, setWardName] = React.useState("");
	
	
	useEffect(() => {
		provinceApi.getProvinces().then((res: any) => {
			if (res.status === 200) {
				setProvince(res.data);
				setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
			}
		})
	}, []);
	
	const onChangeProvince = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			districtApi.getByProvince(value.code).then((res: any) => {
				if (res.status === 200) {
					setProvinceID(value.code);
					setProvinceName(value.name);
					setDistrict(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		} else {
			setTableName("Toàn quốc");
			provinceApi.getProvinces().then((res: any) => {
				if (res.status === 200) {
					setProvince(res.data);
					setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			})
		}
	};
	
	const onChangeDistrict = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setDistrictID(value.code);
					setDistrictName(value.name);
					setWard(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		} else {
			districtApi.getByProvince(provinceID).then((res: any) => {
				if (res.status === 200) {
					setTableName(provinceName);
					setDistrict(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		}
	};
	
	const onChangeWard = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			villageApi.getByWard(value.code).then((res: any) => {
				if (res.status === 200) {
					setWardID(value.code);
					setWardName(value.name);
					setVillage(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		} else {
			wardApi.getByDistrict(districtID).then((res: any) => {
				if (res.status === 200) {
					setTableName(districtName);
					setWard(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		}
	};
	
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
					onChange={onChangeWard}
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

export default A1AdminPage;
