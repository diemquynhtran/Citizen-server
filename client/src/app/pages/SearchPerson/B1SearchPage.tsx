import React, {useEffect} from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import BasicDropdownMenu from "components/_shares/BasicDropdownMenu";
import { provinceApi } from "services/api/province";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { villageApi } from "services/api/village";
import { personApi } from "services/api/person";

const searchBy = [
	{value: 1, label: "Tên"},
	{value: 2, label: "CMND"},
]

const head = [
	{id: 1, label:"Số CMND/CCCD"},
	{id: 2, label:"Tên"},
	{id: 3, label:"Ngày sinh"},
	{id: 4, label:"Giới tính"},
	{id: 5, label:"Tôn giáo"},
	{id: 6, label:"Học vấn"},
	{id: 7, label:"Nghề nghiệp"},
	{id: 8, label:"Quê quán"},
	{id: 9, label:"Đ/c Thường trú"},
	{id: 10, label:"Đ/c Tạm trú"},
];

const hometownAddress = (data: any) => {
	let village = data.hometown.village == null ? "" : data.hometown.village.name;
	let ward = data.hometown.ward == null ? "" : data.hometown.ward.name;
	let district = data.hometown.district == null ? "" : data.hometown.district.name;
	let province = data.hometown.province == null ? "" : data.hometown.province.name;
	
	return village + ", " + ward + ", " + district + ", " + province;
}

const defaultAddress = (data: any) => {
	let detail = data.defaultAddress.detail == null ? "" : data.defaultAddress.detail;
	let village = data.defaultAddress.village == null ? "" : data.defaultAddress.village.name;
	let ward = data.defaultAddress.ward == null ? "" : data.defaultAddress.ward.name;
	let district = data.defaultAddress.district == null ? "" : data.defaultAddress.district.name;
	let province = data.defaultAddress.province == null ? "" : data.defaultAddress.province.name;
	
	return detail + ", " + village + ", " + ward + ", " + district + ", " + province;
}

const otherAddress = (data: any) => {
	let detail = data.otherAddress.detail == null ? "" : data.otherAddress.detail;
	let village = data.otherAddress.village == null ? "" : data.otherAddress.village.name;
	let ward = data.otherAddress.ward == null ? "" : data.otherAddress.ward.name;
	let district = data.otherAddress.district == null ? "" : data.otherAddress.district.name;
	let province = data.otherAddress.province == null ? "" : data.otherAddress.province.name;
	
	return detail + ", " + village + ", " + ward + ", " + district + ", " + province;
}

var searchByName = true;

const B1SearchPage = () => {
	useRole(Role.B1);
	
	const [province, setProvince] = React.useState([]);
	const [district, setDistrict] = React.useState([]);
	const [ward, setWard] = React.useState([]);
	const [village, setVillage] = React.useState([]);
	
	const [isSearching, setIsSearching] = React.useState(false);
	
	const [provinceID, setProvinceID] = React.useState("");
	const [districtID, setDistrictID] = React.useState("");
	const [wardID, setWardID] = React.useState("");
	
	const [data, setData] = React.useState([]);
	const [searchData, setSearchData] = React.useState([]);
	const [tableName, setTableName] = React.useState("Toàn quốc");
	
	const [provinceName, setProvinceName] = React.useState("");
	const [districtName, setDistrictName] = React.useState("");
	const [wardName, setWardName] = React.useState("");
	
	const [districtKey, setDistrictKey] = React.useState(0);
	const [wardKey, setWardKey] = React.useState(0);
	const [villageKey, setVillageKey] = React.useState(0);
	
	const [searchFieldName, setSearchFieldName] = React.useState("Tên");
	
	const [searchField, setSearchField] = React.useState("");
	
	useEffect(() => {
		villageApi.getByRole().then((res: any) => {
			if (res.status === 200) {
				setProvince(res.data.result);
		}});
		
		personApi.getByRole().then((res: any) => {
			if(res.status === 200) {	
				setData(res.data.result.map((data: any) => ({
					cmnd: data.cmnd,
					name: data.name,
					birthday: data.birthDay.substring(8, 10) + "/" + data.birthDay.substring(5, 7) + "/" + data.birthDay.substring(0, 4),
					gender: data.gender === 0 ? "Nam" : "Nữ",
					religion: data.religion,
					scholarship: data.level.concat("/12"),
					job: data.job,
					hometownAddress: hometownAddress(data),
					defaultAddress: defaultAddress(data),
					otherAddress: otherAddress(data),
				})));
			}}
		);
	}, []);
		
	const onChangeVillage = (event: unknown, value: any) => {
		setIsSearching(false);
		if (value != null) {
			personApi.getByReq(value.code).then((res: any) => {
				if(res.status === 200) {	
					setData(res.data.result.map((data: any) => ({
						cmnd: data.cmnd,
						name: data.name,
						birthday: data.birthDay.substring(8, 10) + "/" + data.birthDay.substring(5, 7) + "/" + data.birthDay.substring(0, 4),
						gender: data.gender === 0 ? "Nam" : "Nữ",
						religion: data.religion,
						scholarship: data.level.concat("/12"),
						job: data.job,
						hometownAddress: hometownAddress(data),
						defaultAddress: defaultAddress(data),
						otherAddress: otherAddress(data),
					})));
				}
			})
		} else {
			personApi.getByReq(wardID).then((res: any) => {
				if(res.status === 200) {	
					setData(res.data.result.map((data: any) => ({
						cmnd: data.cmnd,
						name: data.name,
						birthday: data.birthDay.substring(8, 10) + "/" + data.birthDay.substring(5, 7) + "/" + data.birthDay.substring(0, 4),
						gender: data.gender === 0 ? "Nam" : "Nữ",
						religion: data.religion,
						scholarship: data.level.concat("/12"),
						job: data.job,
						hometownAddress: hometownAddress(data),
						defaultAddress: defaultAddress(data),
						otherAddress: otherAddress(data),
					})));
				}
			})
		}
	};
	
	const onChangeSearchField = (e: any) => {
		setSearchField(e.target.value);
		
		if (e.target.value == null) {
			setIsSearching(false);
		}
	};
	
	const onChangeSearchBy = (event: unknown, value: any) => {
		if (value.props.value == 1) {
			setSearchFieldName("Tên");
			searchByName = true;
		} else {
			setSearchFieldName("Số CCCD/CMND");
			searchByName = false;
		}
	};
	
	const search = () => {
		setIsSearching(true);
		if (searchByName && typeof data != void[]) {
			var result = data.filter((data: any) => data.name.includes(searchField));
			
			result == null ? setSearchData([]) : setSearchData(result);
		} else if (!searchByName && typeof data != void[]) {
			var result = data.filter((data: any) => data.cmnd.includes(searchField));
			
			result == null ? setSearchData([]) : setSearchData(result);
		}
	};
	
	return (
		<Box mx="auto">
			<Grid container spacing={3}>
				<Grid container xs={12}>
					<Grid item xs={12}>
						<Box p={2}>
							<EnhancedDropdownMenu
							options={village}
							getOptionLabel={(element: any) => element.name}
							label="Thôn/Làng/Bản"
							onChange={onChangeVillage}
							key={villageKey}
							/>
						</Box>
					</Grid>
				</Grid>
				
				<Grid container xs={12}>
					<Grid item xs={6}>
						<Box p={2}>
							<TextField
							id="date"
							label={searchFieldName}
							onChange={onChangeSearchField}
							onBlur={onChangeSearchField}
							/>
						</Box>
					</Grid>
					
					<Grid item xs={4}>
						<Box p={2}>
							<BasicDropdownMenu
							label="Theo"
							data={searchBy}
							onChange={onChangeSearchBy}
							onBlur={onChangeSearchBy}/>
						</Box>
					</Grid>
					
					<Grid item xs={2}>
						<Box p={2}>
							<Button variant="contained" color="primary" onClick={search}>
								Tìm
							</Button>
						</Box>
					</Grid>
				</Grid>
				
				<Grid container xs={12}>
					<Box p={2}>
						<EnhancedStatisticalTable 
						tableName={tableName}
						rows={isSearching ? searchData : data}
						head={head}
						hasButtons={false}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default B1SearchPage;
