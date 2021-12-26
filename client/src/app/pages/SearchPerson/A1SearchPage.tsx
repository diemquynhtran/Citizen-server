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

const A1SearchPage = () => {
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
	const [villageKey, setVillageKey] = React.useState(0);
	
	return (
		<Box>
			<Grid container spacing={3}>
				<Grid container xs={12}>

				</Grid>
				
				<Grid container xs={12}>
					<Grid item xs={6}>
					
					</Grid>
					
					<Grid item xs={4}>
					
					</Grid>
					
					<Grid item xs={2}>
					
					</Grid>
				</Grid>
				
				<Grid container xs={12}>
					
				</Grid>
			</Grid>
		</Box>
	);
};

export default A1SearchPage;
