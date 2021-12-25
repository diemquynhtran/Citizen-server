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
	{id: 3, label:"Đã hoàn thành?"},
]

const B1AdminPage = () => {
	useRole(Role.B1);
	
	const [village, setVillage] = React.useState([]);
	
	const [data, setData] = React.useState([]);
	const [tableName, setTableName] = React.useState("");
	
	useEffect(() => {
		villageApi.getByRole().then((res: any) => {
			if (res.status === 200) {
				setVillage(res.data);
				setData(res.data.map((data: any) => ({code: data.code, name: data.name, status:data.status,})));
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
						hasButton={false}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default B1AdminPage;
