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
	
	const [districtKey, setDistrictKey] = React.useState(0);
	const [wardKey, setWardKey] = React.useState(0);
	
	
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
					
					setDistrictKey(districtKey + 1);
					setDistrict(res.data.result);
					
					setWardKey(wardKey + 1);
					setWard([]);
					
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		} else {
			setTableName("Toàn quốc");
			provinceApi.getProvinces().then((res: any) => {
				if (res.status === 200) {
					setProvince(res.data);
					setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
					
					setDistrictKey(districtKey + 1);
					setDistrict([]);
					
					setWardKey(wardKey + 1);
					setWard([]);
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
					
					setWardKey(wardKey + 1);
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
					
					setWardKey(wardKey + 1);
					setWard([]);
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
		<Box mx="auto" mt={3}>
			<Grid container spacing={3}>
				<Grid container xs={12}>
					<Grid item xs={4}>
						<Box p={2}>
							<EnhancedDropdownMenu
							options={province}
							getOptionLabel={(element: any) => element.name}
							label="Tỉnh/Thành phố"
							onChange={onChangeProvince}
							/>
						</Box>
					</Grid>
					
					<Grid item xs={4}>
						<Box p={2}>
							<EnhancedDropdownMenu
							options={district}
							getOptionLabel={(element: any) => element.name}
							label="Quận/Huyện"
							onChange={onChangeDistrict}
							key={districtKey}
							/>
						</Box>
					</Grid>
					
					<Grid item xs={4}>
						<Box p={2}>
							<EnhancedDropdownMenu
							options={ward}
							getOptionLabel={(element: any) => element.name}
							label="Phường/Xã"
							onChange={onChangeWard}
							key={wardKey}
							/>
						</Box>
					</Grid>
				</Grid>
				
				<Grid item xs={12}>
					<Box p={1} mx="auto">
						<EnhancedStatisticalTable 
						tableName={tableName}
						rows={data}
						head={head}
						hasButtons={false}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default A1AdminPage;
