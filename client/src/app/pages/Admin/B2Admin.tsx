import React, {useEffect} from "react";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import PersonForm from "components/form/PersonForm"
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { personApi } from "services/api/person";
import { userApi } from "services/api/user";
import { toastService } from "helpers/toast";

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
	let detail = data.defaultAddress.village == null ? "" : data.defaultAddress.village.name;
	let village = data.defaultAddress.village == null ? "" : data.defaultAddress.village.name;
	let ward = data.defaultAddress.ward == null ? "" : data.defaultAddress.ward.name;
	let district = data.defaultAddress.district == null ? "" : data.defaultAddress.district.name;
	let province = data.defaultAddress.province == null ? "" : data.defaultAddress.province.name;
	
	return detail + ", " + village + ", " + ward + ", " + district + ", " + province;
}

const otherAddress = (data: any) => {
	let detail = data.otherAddress.village == null ? "" : data.otherAddress.village.name;
	let village = data.otherAddress.village == null ? "" : data.otherAddress.village.name;
	let ward = data.otherAddress.ward == null ? "" : data.otherAddress.ward.name;
	let district = data.otherAddress.district == null ? "" : data.otherAddress.district.name;
	let province = data.otherAddress.province == null ? "" : data.otherAddress.province.name;
	
	return detail + ", " + village + ", " + ward + ", " + district + ", " + province;
}

const B2AdminPage = () => {
	const [formOpen, setFormOpen] = React.useState(false);
	const [alertOpen, setAlertOpen] = React.useState(false);
	
	const [disabled, setDisabled] = React.useState(false);
	const [data, setData] = React.useState([]);
	
	const tableName = "Dữ liệu đã nhập";
	
	const updateData = () => {
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
		)
	};
	
	useEffect(() => {updateData();}, [])
	
	const handleClickOpenForm = () => {
		setFormOpen(true);
	};
	

	const handleClickOpenAlert = () => {
		setAlertOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
		updateData();
	};

	const handleCloseAlert = () => {
		setAlertOpen(false);
	};
	
	const handleConfirmCompletion = () => {
		setAlertOpen(false);
	};

	return (
		<Box mx="auto" mt={3}>
			<Grid container spacing={3}>
				<Grid container xs={12}>
					<Grid item xs={3}>
						<Box p={2}>
							<Button
							variant="contained"
							color="primary"
							onClick={handleClickOpenForm}
							disabled={disabled}>
								Thêm người
							</Button>
							
							<Dialog
							open={formOpen}
							onClose={handleCloseForm}
							fullWidth={true}
							maxWidth="md">
								<DialogTitle id="simple-dialog-title">
									<Grid container xs={12}>
										<Grid item xs={2}>
											<Box p={2}>
												Nhập người
											</Box>
										</Grid>
										
										<Grid item xs={9}></Grid>
										
										<Grid item xs={1}>
											<Box p={2}>
												<IconButton aria-label="delete" onClick={handleCloseForm}>
													<CloseIcon color="primary" fontSize="small" />
												</IconButton>
											</Box>
										</Grid>
									</Grid>
								</DialogTitle>
								
								<Box mx="auto">
									<PersonForm onClick={handleCloseForm} />
								</Box>
							</Dialog>
						</Box>
					</Grid>
				</Grid>
				
				<Grid item xs={12}>
					<EnhancedStatisticalTable 
						tableName={tableName}
						rows={data}
						head={head}
						hasButtons={false}
						/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default B2AdminPage;
