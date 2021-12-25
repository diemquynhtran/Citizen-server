import React, { useEffect } from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { provinceApi } from "services/api/province";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import A1AddKeyPage from "../AddKey/A1AddKey";
import A1AddAccPage from "../AddAccount/A1AddAcc";

const head = [
  { id: 1, label: "Mã tỉnh" },
  { id: 2, label: "Tên tỉnh" },
  { id: 3, label: "Tài khoản" },
  { id: 4, label: "Trạng thái" },
];

const A1ManagePage = () => {
  useRole(Role.A1);

  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [village, setVillage] = React.useState([]);

  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("Quản lý tài khoản");

  useEffect(() => {
    provinceApi.getProvinces().then((res: any) => {
      if (res.status === 200) {
        setProvince(res.data);
        setData(
          res.data.map((data: any) => ({
            code: data.code,
            name: data.name,
            account: data.code,
          }))
        );
      }
    });
  }, []);

  const onChangeProvince = (event: unknown, value: any) => {
    if (value != null) {
      setTableName(value.name);
      districtApi.getByProvince(value.code).then((res: any) => {
        if (res.status === 200) {
          setDistrict(res.data.result);
          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.status,
            }))
          );
        }
      });
    }
  };

  const onChangeDistrict = (event: unknown, value: any) => {
    if (value != null) {
      setTableName(value.name);
      wardApi.getByDistrict(value.code).then((res: any) => {
        if (res.status === 200) {
          setWard(res.data.result);
          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.status,
            }))
          );
        }
      });
    }
  };

  const onChange = (event: unknown) => {};
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: 10,
      display: "fixed",
      left: "95%",
    },
  }));
  const classesButton = useStyles();
  const [keyShow, setKeyShow] = useState(false);
  const [accShow, setAccShow] = useState(false);
  const handleCloseKey = () => setKeyShow(false);
  const handleCloseAcc = () => setAccShow(false);

  return (
    <Box mt={5} ml={5} style={{ marginTop: 0 }}>
      <div>
        <Button variant="primary" onClick={() => setKeyShow(true)} style={{ margin: 10 }}>
          <AddIcon />
          Cấp mã
        </Button>
        <Button variant="primary" onClick={() => setAccShow(true)} style={{ margin: 10 }}>
          <AddIcon />
          Cấp tài khoản
        </Button>
        <Modal
          show={keyShow}
          onHide={() => setKeyShow(false)}
          animation={false}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Cấp mã</Modal.Title>
          </Modal.Header>
          <div className="login-form">
            <A1AddKeyPage />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseKey}>
                Hủy
              </Button>
              <Button variant="primary">Hoàn thành</Button>
            </Modal.Footer>
          </div>
        </Modal>            
        
        <Modal
          show={accShow}
          onHide={() => setAccShow(false)}
          animation={false}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Cấp tài khoản</Modal.Title>
          </Modal.Header>
          <div className="login-form">
            <A1AddAccPage />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAcc}>
                Hủy
              </Button>
              <Button variant="primary">Hoàn thành</Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div> 
      <Grid container>
        <Box mr={3} mt={1}>
          <Grid item>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={data}
                getOptionLabel={(element: any) => element.name}
                label="Tỉnh/Thành phố"
                onChange={onChange}
              />
            </Box>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={data}
                getOptionLabel={(element: any) => element.name}
                label="Quận/Huyện"
                onChange={onChange}
              />
            </Box>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={data}
                getOptionLabel={(element: any) => element.name}
                label="Phường/Xã"
                onChange={onChange}
              />
            </Box>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={data}
                getOptionLabel={(element: any) => element.name}
                label="Thôn/Làng"
                onChange={onChange}
              />
            </Box>
          </Grid>
        </Box>
        <Grid item>
          <EnhancedStatisticalTable
            rows={data}
            head={head}
            tableName={tableName}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default A1ManagePage;
