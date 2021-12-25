import React, {useEffect} from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { wardApi } from "services/api/ward";
import { villageApi } from "services/api/village";

const head = [
	{id: 1, label:"Mã"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Đã hoàn thành?"},
]

const A3AdminPage = () => {
	useRole(Role.A3);
	
	const [ward, setWard] = React.useState([]);
	const [village, setVillage] = React.useState([]);
	
	const [wardID, setWardID] = React.useState("");
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("");
	
	const [wardName, setWardName] = React.useState("");
	
	useEffect(() => {
		wardApi.getByRole().then((res: any) => {
			if (res.status === 200) {
				setWard(res.data);
				setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
			}
		})
	}, []);
	
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
			wardApi.getByRole().then((res: any) => {
				if (res.status === 200) {
					setWard(res.data);
					setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
				}
			});
		}
	};
	
	return (
		<Box mx="auto" mt={3}>
			<Grid container spacing={3}>
				<Grid item xs={12}>					
					<Box p={2}>
						<EnhancedDropdownMenu
						options={ward}
						getOptionLabel={(element: any) => element.name}
						label="Phường/Xã"
						onChange={onChangeWard}
						/>
					</Box>
				</Grid>
				
				<Grid item xs={12}>
					<Box p={1} mx="auto">
						<EnhancedStatisticalTable 
						tableName={tableName}
						rows={data}
						head={head}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default A3AdminPage;
