import React, {useEffect} from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { villageApi } from "services/api/village";

const head = [
	{id: 1, label:"Mã"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Tình trạng Điều tra"},
]

const B1AdminPage = () => {
	useRole(Role.B1);
	
	const [village, setVillage] = React.useState([]);
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("");
	
	useEffect(() => {
		villageApi.getByRole().then((res: any) => {
			console.log(res);
			if (res.status === 200) {
				setVillage(res.data.result);
				setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",})));
			}
		})
	}, []);
	
	return (
		<Box mx="auto" mt={3}>
			<Grid container spacing={3}>
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

export default B1AdminPage;
