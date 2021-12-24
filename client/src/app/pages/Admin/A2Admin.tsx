import React, {useEffect} from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { villageApi } from "services/api/village";

const head = [
	{id: 1, label:"Mã"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Đã hoàn thành?"},
]

const A2AdminPage = () => {
  useRole(Role.A2);
  
	const [district, setDistrict] = React.useState([]);
	const [ward, setWard] = React.useState([]);
	const [village, setVillage] = React.useState([]);
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("");
	
	useEffect(() => {
		districtApi.getByRole().then((res: any) => {
			if (res.status === 200) {
				setDistrict(res.data);
				setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
			}
		})
	}, []);
	
	const onChangeDistrict = (event: unknown, value: any) => {
		if (value != null) {
			setTableName(value.name);
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setWard(res.data.result);
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
					setVillage(res.data.result);
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

export default A2AdminPage;
