import React, {useEffect} from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import BasicDropdownMenu from "components/_shares/BasicDropdownMenu";
import { provinceApi } from "services/api/province";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { villageApi } from "services/api/village";
import { personApi } from "services/api/person";
import { toastService } from "helpers/toast";

import { useStyles } from "./useStyles";

const genderData = [
	{value: 0, label: "Nam"},
	{value: 1, label: "Nữ"},
]

const scholarshipData = [
	{value: 1, label: '1/12'},
	{value: 2, label: '2/12'},
	{value: 3, label: '3/12'},
	{value: 4, label: '4/12'},
	{value: 5, label: '5/12'},
	{value: 6, label: '6/12'},
	{value: 7, label: '7/12'},
	{value: 8, label: '8/12'},
	{value: 9, label: '9/12'},
	{value: 10, label: '10/12'},
	{value: 11, label: '11/12'},
	{value: 12, label: '12/12'},
]

const defaultFormValue = {
	name: "",
	birthDay: "",
	cmnd: "",
	gender: 0,
	religion: "",
	level: 0,
	job: "",
	defaultAddress: {
		detail: "",
		village: "",
		ward: "",
		district: "",
		province: "",
	},
	otherAddress: {
		detail: "",
		village: "",
		ward: "",
		district: "",
		province: "",
	},
	hometown: {
		village: "",
		ward: "",
		district: "",
		province: "",
	},
};

const defaultHometownValue = {
	village: "",
	ward: "",
	district: "",
	province: "",
};

const defaultDefaultValue = {
	detail: "",
	village: "",
	ward: "",
	district: "",
	province: "",
};

const defaultTempValue = {
	detail: "",
	village: "",
	ward: "",
	district: "",
	province: "",
};

const PersonForm = () => {
	const classes = useStyles();
	
	const [formValue, setFormValue] = React.useState(defaultFormValue);
	const [hometownValue, setHometownValue] = React.useState(defaultHometownValue);
	const [defaultValue, setDefaultValue] = React.useState(defaultDefaultValue);
	const [tempValue, setTempValue] = React.useState(defaultTempValue);
	//Default addr
	const [provinceDefault, setProvinceDefault] = React.useState([]);
	const [districtDefault, setDistrictDefault] = React.useState([]);
	const [wardDefault, setWardDefault] = React.useState([]);
	const [villageDefault, setVillageDefault] = React.useState([]);
	
	const [provinceDefaultID, setProvinceDefaultID] = React.useState("");
	const [districtDefaultID, setDistrictDefaultID] = React.useState("");
	const [wardDefaultID, setWardDefaultID] = React.useState("");
	
	const [districtDefaultKey, setDistrictDefaultKey] = React.useState(0);
	const [wardDefaultKey, setWardDefaultKey] = React.useState(0);
	const [villageDefaultKey, setVillageDefaultKey] = React.useState(0);
	
	//temp addr
	const [provinceTemp, setProvinceTemp] = React.useState([]);
	const [districtTemp, setDistrictTemp] = React.useState([]);
	const [wardTemp, setWardTemp] = React.useState([]);
	const [villageTemp, setVillageTemp] = React.useState([]);
	
	const [provinceTempID, setProvinceTempID] = React.useState("");
	const [districtTempID, setDistrictTempID] = React.useState("");
	const [wardTempID, setWardTempID] = React.useState("");
	
	const [districtTempKey, setDistrictTempKey] = React.useState(0);
	const [wardTempKey, setWardTempKey] = React.useState(0);
	const [villageTempKey, setVillageTempKey] = React.useState(0);
	
	//hometown
	const [provinceHome, setProvinceHome] = React.useState([]);
	const [districtHome, setDistrictHome] = React.useState([]);
	const [wardHome, setWardHome] = React.useState([]);
	const [villageHome, setVillageHome] = React.useState([]);
	
	const [provinceHomeID, setProvinceHomeID] = React.useState("");
	const [districtHomeID, setDistrictHomeID] = React.useState("");
	const [wardHomeID, setWardHomeID] = React.useState("");
	
	const [districtHomeKey, setDistrictHomeKey] = React.useState(0);
	const [wardHomeKey, setWardHomeKey] = React.useState(0);
	const [villageHomeKey, setVillageHomeKey] = React.useState(0);

	useEffect(() => {
		provinceApi.getProvinces().then((res: any) => {
			if (res.status === 200) {
				setProvinceDefault(res.data);
				setProvinceTemp(res.data);
				setProvinceHome(res.data);
			}
		})
	}, []);
	
	const onChangeProvinceDefault = (event: unknown, value: any) => {
		if (value != null) {
			districtApi.getByProvince(value.code).then((res: any) => {
				if (res.status === 200) {
					setProvinceDefaultID(value.code);
					
					setDefaultValue({
						...defaultValue,
						province: value.code,
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
					
					setDistrictDefaultKey(districtDefaultKey + 1);
					setDistrictDefault(res.data.result);
					
					setWardDefaultKey(wardDefaultKey + 1);
					setWardDefault([]);
					
					setVillageDefaultKey(wardDefaultKey + 1);
					setVillageDefault([]);
				}
			});
		} else {
			provinceApi.getProvinces().then((res: any) => {
				if (res.status === 200) {
					setProvinceDefault(res.data);
					
					setDefaultValue({
						...defaultValue,
						province: "",
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
					
					setDistrictDefaultKey(districtDefaultKey + 1);
					setDistrictDefault([]);
					
					setWardDefaultKey(wardDefaultKey + 1);
					setWardDefault([]);
				}
			})
		}
	};
	
	const onChangeDistrictDefault = (event: unknown, value: any) => {
		if (value != null) {
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setDistrictDefaultID(value.code);
					
					setDefaultValue({
						...defaultValue,
						district: value.code,
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
					
					setWardDefaultKey(wardDefaultKey + 1);
					setWardDefault(res.data.result);
					
					setVillageDefaultKey(wardDefaultKey + 1);
					setVillageDefault([]);
				}
			});
		} else {
			districtApi.getByProvince(provinceDefaultID).then((res: any) => {
				if (res.status === 200) {
					setDistrictDefault(res.data.result);
					
					setDefaultValue({
						...defaultValue,
						district: "",
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
					
					setWardDefaultKey(wardDefaultKey + 1);
					setWardDefault([]);
					
					setVillageDefaultKey(wardDefaultKey + 1);
					setVillageDefault([]);
				}
			});
		}
	};
	
	const onChangeWardDefault = (event: unknown, value: any) => {
		if (value != null) {
			villageApi.getByWard(value.code).then((res: any) => {
				if (res.status === 200) {
					setWardDefaultID(value.code);
					
					setDefaultValue({
						...defaultValue,
						ward: value.code,
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
					
					setVillageDefaultKey(wardDefaultKey + 1);
					setVillageDefault(res.data.result);
				}
			});
		} else {
			wardApi.getByDistrict(districtDefaultID).then((res: any) => {
				if (res.status === 200) {
					setWardDefault(res.data.result);
					
					setDefaultValue({
						...defaultValue,
						ward: "",
					});
					
					setFormValue({
						...formValue,
						defaultAddress: defaultValue,
					});
				}
			});
		}
	};
	
	const onChangeVillageDefault = (event: unknown, value: any) => {
		if (value != null) {
			setDefaultValue({
				...defaultValue,
				village: value.code,
			});
			
			setFormValue({
				...formValue,
				defaultAddress: defaultValue,
			});
		} else {
			setDefaultValue({
				...defaultValue,
				village: "",
			});
			
			setFormValue({
				...formValue,
				defaultAddress: defaultValue,
			});
		}
	};

	const onChangeProvinceTemp = (event: unknown, value: any) => {
		if (value != null) {
			districtApi.getByProvince(value.code).then((res: any) => {
				if (res.status === 200) {
					setProvinceTempID(value.code);
					
					setTempValue({
						...tempValue,
						province: value.code,
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
					
					setDistrictTempKey(districtTempKey + 1);
					setDistrictTemp(res.data.result);
					
					setWardTempKey(wardTempKey + 1);
					setWardTemp([]);
					
					setVillageTempKey(wardTempKey + 1);
					setVillageTemp([]);
				}
			});
		} else {
			provinceApi.getProvinces().then((res: any) => {
				if (res.status === 200) {
					setProvinceTemp(res.data);
					
					setTempValue({
						...tempValue,
						province: "",
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
					
					setDistrictTempKey(districtTempKey + 1);
					setDistrictTemp([]);
					
					setWardTempKey(wardTempKey + 1);
					setWardTemp([]);
				}
			})
		}
	};
	
	const onChangeDistrictTemp = (event: unknown, value: any) => {
		if (value != null) {
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setDistrictTempID(value.code);
					
					setTempValue({
						...tempValue,
						district: value.code,
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
					
					setWardTempKey(wardTempKey + 1);
					setWardTemp(res.data.result);
					
					setVillageTempKey(wardTempKey + 1);
					setVillageTemp([]);
				}
			});
		} else {
			districtApi.getByProvince(provinceTempID).then((res: any) => {
				if (res.status === 200) {
					setDistrictTemp(res.data.result);
					
					setTempValue({
						...tempValue,
						district: "",
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
					
					setWardTempKey(wardTempKey + 1);
					setWardTemp([]);
					
					setVillageTempKey(wardTempKey + 1);
					setVillageTemp([]);
				}
			});
		}
	};
	
	const onChangeWardTemp = (event: unknown, value: any) => {
		if (value != null) {
			villageApi.getByWard(value.code).then((res: any) => {
				if (res.status === 200) {
					setWardTempID(value.code);
					
					setTempValue({
						...tempValue,
						ward: value.code,
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
					
					setVillageTempKey(wardTempKey + 1);
					setVillageTemp(res.data.result);
				}
			});
		} else {
			wardApi.getByDistrict(districtTempID).then((res: any) => {
				if (res.status === 200) {
					setWardTemp(res.data.result);
					
					setTempValue({
						...tempValue,
						ward: "",
					});
					
					setFormValue({
						...formValue,
						otherAddress: tempValue,
					});
				}
			});
		}
	};
	
	const onChangeVillageTemp = (event: unknown, value: any) => {
		if (value != null) {
			setTempValue({
				...tempValue,
				village: value.code,
			});
			
			setFormValue({
				...formValue,
				otherAddress: tempValue,
			});
		} else {
			setTempValue({
				...tempValue,
				village: "",
			});
			
			setFormValue({
				...formValue,
				otherAddress: tempValue,
			});
		}
	};
		
	const onChangeProvinceHome = (event: unknown, value: any) => {
		if (value != null) {
			districtApi.getByProvince(value.code).then((res: any) => {
				if (res.status === 200) {
					setProvinceHomeID(value.code);
					
					setHometownValue({
						...hometownValue,
						province: value.code,
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
					
					setDistrictHomeKey(districtHomeKey + 1);
					setDistrictHome(res.data.result);
					
					setWardHomeKey(wardHomeKey + 1);
					setWardHome([]);
					
					setVillageHomeKey(wardHomeKey + 1);
					setVillageHome([]);
				}
			});
		} else {
			provinceApi.getProvinces().then((res: any) => {
				if (res.status === 200) {
					setProvinceHome(res.data);
					
					setHometownValue({
						...hometownValue,
						province: "",
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
					
					setDistrictHomeKey(districtHomeKey + 1);
					setDistrictHome([]);
					
					setWardHomeKey(wardHomeKey + 1);
					setWardHome([]);
				}
			})
		}
	};
	
	const onChangeDistrictHome = (event: unknown, value: any) => {
		if (value != null) {
			wardApi.getByDistrict(value.code).then((res: any) => {
				if (res.status === 200) {
					setDistrictHomeID(value.code);
					
					setHometownValue({
						...hometownValue,
						district: value.code,
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
					
					setWardHomeKey(wardHomeKey + 1);
					setWardHome(res.data.result);
					
					setVillageHomeKey(wardHomeKey + 1);
					setVillageHome([]);
				}
			});
		} else {
			districtApi.getByProvince(provinceHomeID).then((res: any) => {
				if (res.status === 200) {
					setDistrictHome(res.data.result);
					
					setHometownValue({
						...hometownValue,
						district: "",
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
					
					setWardHomeKey(wardHomeKey + 1);
					setWardHome([]);
					
					setVillageHomeKey(wardHomeKey + 1);
					setVillageHome([]);
				}
			});
		}
	};
	
	const onChangeWardHome = (event: unknown, value: any) => {
		if (value != null) {
			villageApi.getByWard(value.code).then((res: any) => {
				if (res.status === 200) {
					setWardHomeID(value.code);
					
					setHometownValue({
						...hometownValue,
						ward: value.code,
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
					
					setVillageHomeKey(wardHomeKey + 1);
					setVillageHome(res.data.result);
				}
			});
		} else {
			wardApi.getByDistrict(districtHomeID).then((res: any) => {
				if (res.status === 200) {
					setWardHome(res.data.result);
					
					setHometownValue({
						...hometownValue,
						ward: "",
					});
					
					setFormValue({
						...formValue,
						hometown: hometownValue,
					});
				}
			});
		}
	};
	
	const onChangeVillageHome = (event: unknown, value: any) => {
		if (value != null) {
			setHometownValue({
				...hometownValue,
				village: value.code,
			});
			
			setFormValue({
				...formValue,
				hometown: hometownValue,
			});
		} else {
			setHometownValue({
				...hometownValue,
				village: "",
			});
			
			setFormValue({
				...formValue,
				hometown: hometownValue,
			});
		}
	};

	const onChangeNameField = (e: any) => {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			name: value,
		});
	};
	
	const onChangeUIDField = (e: any) => {
		const { cmnd, value } = e.target;
		setFormValue({
			...formValue,
			cmnd: value,
		});
	};
	
	const onChangeBirthdayField = (e: any) => {
		const { birthDay, value } = e.target;
		setFormValue({
			...formValue,
			birthDay: value,
		});
	};
	
	const onChangeGenderField = (event: unknown, value: any) => {
		setFormValue({
			...formValue,
			gender: value.props.value,
		});
	};
	
	const onChangeReligionField = (e: any) => {
		const { religion, value } = e.target;
		setFormValue({
			...formValue,
			religion: value,
		});
	};
	
	const onChangeScholarshipField = (event: unknown, value: any) => {
		setFormValue({
			...formValue,
			level: value.props.value,
		});
	};
	
	const onChangeJobField = (e: any) => {
		const { job, value } = e.target;
		setFormValue({
			...formValue,
			job: value,
		});
	};
	
	const onChangeDefaultDetail = (e: any) => {
		const { detail, value } = e.target;
		
		setDefaultValue({
			...defaultValue,
			detail: value,
		});
		
		setFormValue({
			...formValue,
			defaultAddress: defaultValue,
		});
	};
	
	const onChangeTempDetail = (e: any) => {
		const { detail, value } = e.target;
		
		setTempValue({
			...tempValue,
			detail: value,
		});
		
		setFormValue({
			...formValue,
			otherAddress: tempValue,
		});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		//console.log(formValue);
		
		personApi.createPerson(formValue).then((res: any) => {
			console.log(res);
			if (res.status === 200) {
				
				if (res.data.status === 200) {
					toastService.success("Nhập liệu thành công");
				} else {
					toastService.error("Vui lòng kiểm tra lại file nhập liệu");
				}
			}
		})
	}

	return (
		<form onSubmit={handleSubmit} className={classes.root}>
			<Box m={3}>
				<Grid container spacing={3}>
					<Grid container xs={12}>
						<Box p={2}><h5>Thông tin cá nhân</h5></Box>
					</Grid>
				
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField
								id="standard-basic"
								label="Họ và tên"
								onChange={onChangeNameField} />
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField
								id="standard-basic"
								label="Số CMND/CCCD"
								onChange={onChangeUIDField}/>
							</Box>
						</Grid>
					</Grid>
				
					<Grid container xs={12}>
						<Grid item xs={4}>
							<Box p={2}>
								<TextField
								id="date"
								label="Ngày sinh"
								type="date"
								InputLabelProps={{
								  shrink: true,
								}}
								onChange={onChangeBirthdayField}
								/>
							</Box>
						</Grid>
					
						<Grid item xs={4}>
							<Box p={2}>
								<BasicDropdownMenu
								label="Giới tính"
								data={genderData}
								onChange={onChangeGenderField}/>
							</Box>
						</Grid>
					
						<Grid item xs={4}>
							<Box p={2}>
								<BasicDropdownMenu
								label="Học vấn"
								data={scholarshipData}
								onChange={onChangeScholarshipField}/>
							</Box>
						</Grid>
					</Grid>
				
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField
								id="standard-basic"
								label="Tôn giáo"
								onChange={onChangeReligionField}/>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField
								id="standard-basic"
								label="Nghề nghiệp"
								onChange={onChangeJobField}/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Box p={2}><h5>Quê quán</h5></Box>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={provinceHome}
								getOptionLabel={(element: any) => element.name}
								label="Tỉnh/Thành phố"
								onChange={onChangeProvinceHome}
								isStandard={true}
								/>
							</Box>
						</Grid>

						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={districtHome}
								getOptionLabel={(element: any) => element.name}
								label="Quận/Huyện"
								onChange={onChangeDistrictHome}
								key={districtHomeKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={wardHome}
								getOptionLabel={(element: any) => element.name}
								label="Phường/Xã"
								onChange={onChangeWardHome}
								key={wardHomeKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
						
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={villageHome}
								getOptionLabel={(element: any) => element.name}
								label="Thôn/Làng/Bản"
								onChange={onChangeVillageHome}
								key={villageHomeKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Box p={2}><h5>Địa chỉ thường trú</h5></Box>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={provinceDefault}
								getOptionLabel={(element: any) => element.name}
								label="Tỉnh/Thành phố"
								onChange={onChangeProvinceDefault}
								isStandard={true}
								/>
							</Box>
						</Grid>
						
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={districtDefault}
								getOptionLabel={(element: any) => element.name}
								label="Quận/Huyện"
								onChange={onChangeDistrictDefault}
								key={districtDefaultKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={wardDefault}
								getOptionLabel={(element: any) => element.name}
								label="Phường/Xã"
								onChange={onChangeWardDefault}
								key={wardDefaultKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
						
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={villageDefault}
								getOptionLabel={(element: any) => element.name}
								label="Thôn/Làng/Bản"
								onChange={onChangeVillageDefault}
								key={villageDefaultKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Box p={2}>
							<TextField
							id="standard-basic"
							label="Số nhà, Đường, Phố"
							onChange={onChangeDefaultDetail}/>
						</Box>
					</Grid>
					
					<Grid container xs={12}>
						<Box p={2}><h5>Địa chỉ tạm trú</h5></Box>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={provinceTemp}
								getOptionLabel={(element: any) => element.name}
								label="Tỉnh/Thành phố"
								onChange={onChangeProvinceTemp}
								isStandard={true}
								/>
							</Box>
						</Grid>
						
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={districtTemp}
								getOptionLabel={(element: any) => element.name}
								label="Quận/Huyện"
								onChange={onChangeDistrictTemp}
								key={districtTempKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={wardTemp}
								getOptionLabel={(element: any) => element.name}
								label="Phường/Xã"
								onChange={onChangeWardTemp}
								key={wardTempKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
						
						<Grid item xs={6}>
							<Box p={2}>
								<EnhancedDropdownMenu
								options={villageTemp}
								getOptionLabel={(element: any) => element.name}
								label="Thôn/Làng/Bản"
								onChange={onChangeVillageTemp}
								key={villageTempKey}
								isStandard={true}
								/>
							</Box>
						</Grid>
					</Grid>
					
					<Grid container xs={12}>
						<Box p={2}>
							<TextField
							id="standard-basic"
							label="Số nhà, Đường, Phố"
							onChange={onChangeTempDetail} />
						</Box>
					</Grid>
					
					<Grid container xs={12}>
						<Grid item xs={10}></Grid>
						
						<Grid item xs={2}>
							<Box p={2}>
								<Button variant="contained" color="primary" type="submit">
									Nhập
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</form>
	);
};

export default PersonForm;
