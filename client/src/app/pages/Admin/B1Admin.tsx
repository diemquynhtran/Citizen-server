import React, { useEffect, useState } from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
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

const B1AdminPage = () => {
  useRole(Role.B1);

  const [village, setVillage] = React.useState([]);
  const [genderAnalytics, setGenderAnalytics] = useState<AnalyticByGender[]>(
    []
  );
  const [ageAnalytics, setAgeAnalytics] = useState<AnalyticByAge[]>([]);
  const [districtID, setDistrictID] = React.useState("");
  const [provinceID, setProvinceID] = React.useState("");
  const [wardID, setWardID] = React.useState("");
  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("");

  useEffect(() => {
    villageApi.getByRole().then((res: any) => {
      if (res.status === 200) {
        setVillage(res.data);
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
};

export default B1AdminPage;
