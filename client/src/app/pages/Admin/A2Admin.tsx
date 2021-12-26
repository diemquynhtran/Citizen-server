import React, { useEffect, useState } from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { villageApi } from "services/api/village";
import { AnalyticByAge, AnalyticByGender } from "models/person";
import { personApi } from "services/api/person";
import CircleChart from "components/_shares/Chart/CircleChart";
import ColumnChart from "components/_shares/Chart/ColumnChart";
import { toastService } from "helpers/toast";

const head = [
  { id: 1, label: "Mã" },
  { id: 2, label: "Tên" },
  { id: 3, label: "Tình trạng Điều tra" },
];

const A2AdminPage = () => {
  useRole(Role.A2);


  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [village, setVillage] = React.useState([]);


  const [districtID, setDistrictID] = React.useState("");
  const [provinceID, setProvinceID] = React.useState("");

  const [wardID, setWardID] = React.useState("");
  const [genderAnalytics, setGenderAnalytics] = useState<AnalyticByGender[]>(
    []
  );
  const [ageAnalytics, setAgeAnalytics] = useState<AnalyticByAge[]>([]);

  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("");

  const [districtName, setDistrictName] = React.useState("");
  const [wardName, setWardName] = React.useState("");

  const [wardKey, setWardKey] = React.useState(0);

  useEffect(() => {
    districtApi.getByRole().then((res: any) => {
      if (res.status === 200) {
        setDistrict(res.data);
        setData(
          res.data.map((data: any) => ({
            code: data.code,
            name: data.name,
            status: data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",
          }))
        );
      }
    });
  }, []);
  useEffect(() => {
    personApi
      .analyticByGender(wardID || districtID || provinceID)
      .then((res) => {
        if (res.data.status === 200) {
          setGenderAnalytics(res.data.result);
        } else {
          setGenderAnalytics([]);
          return toastService.error(res.data.messenger);
        }
      });
    personApi.analyticByAge(wardID || districtID || provinceID).then((res) => {
      if (res.data.status === 200) {
        setAgeAnalytics(res.data.result);
      } else {
        setAgeAnalytics([]);
        return toastService.error(res.data.messenger);
      }
    });
  }, [provinceID, districtID, wardID]);

  const onChangeDistrict = (event: unknown, value: any) => {
    if (value != null) {
      setTableName(value.name);
      wardApi.getByDistrict(value.code).then((res: any) => {
        if (res.status === 200) {
          setDistrictID(value.code);
          setDistrictName(value.name);

          setWardKey(wardKey + 1);
          setWard(res.data.result);

          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",
            }))
          );
        }
      });
    } else {
      districtApi.getByRole().then((res: any) => {
        if (res.status === 200) {
          //setTableName(provinceName);
          console.log(res);
          setDistrict(res.data);

          setData(
            res.data.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",
            }))
          );

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

          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",
            }))
          );
        }
      });
    } else {
      wardApi.getByDistrict(districtID).then((res: any) => {
        if (res.status === 200) {
          setTableName(districtName);
          setWard(res.data.result);
          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",
            }))
          );
        }
      });
    }
  };

  return (
    <Box mx="auto" mt={3}>
      <Grid container spacing={3}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Box p={2}>
              <EnhancedDropdownMenu
                options={district}
                getOptionLabel={(element: any) => element.name}
                label="Quận/Huyện"
                onChange={onChangeDistrict}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
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
      <Grid container>
        <Grid item xs={4}>
          <CircleChart
            labels={genderAnalytics.map((i) => i.label)}
            values={genderAnalytics.map((i) => i.count)}
          />
        </Grid>
        <Grid item xs={8}>
          <ColumnChart
            labels={ageAnalytics.map((i) => i.label)}
            values={ageAnalytics.map((i) => i.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
=======
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",})));
					
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
					
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",})));
				}
			});
		} else {
			wardApi.getByDistrict(districtID).then((res: any) => {
				if (res.status === 200) {
					setTableName(districtName);
					setWard(res.data.result);
					setData(res.data.result.map((data: any) => ({code: data.code, name: data.name, status:data.state ? "Đã Hoàn thành" : "Chưa Hoàn thành",})));
				}
			});
		}
	};
  
  
	return (
		<Box mx="auto" mt={3}>
			<Grid container spacing={3}>
				<Grid container xs={12}>					
					<Grid item xs={6}>
						<Box p={2}>
							<EnhancedDropdownMenu
							options={district}
							getOptionLabel={(element: any) => element.name}
							label="Quận/Huyện"
							onChange={onChangeDistrict}
							/>
						</Box>
					</Grid>
					
					<Grid item xs={6}>
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
>>>>>>> ba660a633ad88a2e389074b56657c3769eb9ce2c
};

export default A2AdminPage;
