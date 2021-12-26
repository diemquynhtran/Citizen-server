import React, { useEffect } from "react";

import { useRole } from "hocs/useRole";
import { Role } from "settings/role";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { toastService } from "helpers/toast";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import Select from "react-select";

import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import EnhancedStatisticalTable from "components/_shares/EnhancedTable";
import { provinceApi } from "services/api/province";
import { userprovinceApi } from "services/api/userProvince";
import { districtApi } from "services/api/district";
import { villageApi } from "services/api/village";
import { wardApi } from "services/api/ward";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import A1AddKeyPage from "../AddKey/A1AddKey";
import A1AddAccPage from "../AddAccount/A1AddAcc";
import { userInfo } from "os";

const head = [
  { id: 1, label: "Mã tỉnh" },
  { id: 2, label: "Tên tỉnh" },
  { id: 3, label: "Tài khoản" },
  { id: 4, label: "Ngày bắt đầu" },
  { id: 5, label: "Ngày hết hạn" },
  { id: 6, label: "Trạng thái" },
];
const A1ManagePage = () => {
  useRole(Role.A1);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [village, setVillage] = React.useState([]);

  const [provinceID, setProvinceID] = React.useState("");
  const [districtID, setDistrictID] = React.useState("");
  const [wardID, setWardID] = React.useState("");

  const [provinceName, setProvinceName] = React.useState("");
  const [districtName, setDistrictName] = React.useState("");
  const [wardName, setWardName] = React.useState("");

  const [districtKey, setDistrictKey] = React.useState(0);
  const [wardKey, setWardKey] = React.useState(0);

  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("Quản lý tài khoản");

  const [inferiors, setInferiors] = useState([]);
  var ops: any = [];

  useEffect(() => {
    provinceApi.getProvinces().then((res: any) => {
      if (res.status === 200) {
        setProvince(res.data);
        for (let i = 0; i < res.data.length; i++) {
          ops.push({
            value: res.data[i].code,
            label: res.data[i].name,
          });
        }
        // setInferiors([
        //   { value: "Lạng Sơn", label: "Lạng Sơn", id: "10" },
        //   { value: "Hà Nội", label: "Hà Nội", id: "01" },
        //   { value: "Thanh Hóa", label: "Thanh Hóa", id: "28" },
        //   {
        //     value: "Thành phố Hồ Chí Minh",
        //     label: "Thành phố Hồ Chí Minh",
        //     id: "02",
        //   },
        //   { value: "Hải Phòng", label: "Hải Phòng", id: "03" },
        // ]);
        setData(
          res.data.map((data: any) => ({
            code: data.code,
            name: data.name,
            account: data.code,
            start: data.admin == null ? "" : data.admin.startTime,
            end: data.admin == null ? "" : data.admin.endTime,
            status:
              data.admin == null
                ? "Inactive"
                : data.admin.permission
                ? "Active"
                : "Inactive",
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
          setProvinceID(value.code);
          setProvinceName(value.name);

          setDistrictKey(districtKey + 1);
          setDistrict(res.data.result);

          setWardKey(wardKey + 1);
          setWard([]);

          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.status,
            }))
          );
        }
      });
    } else {
      setTableName("Toàn quốc");
      provinceApi.getProvinces().then((res: any) => {
        if (res.status === 200) {
          setProvince(res.data);
          setData(
            res.data.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.status,
            }))
          );

          setDistrictKey(districtKey + 1);
          setDistrict([]);

          setWardKey(wardKey + 1);
          setWard([]);
        }
      });
    }
  };

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
              status: data.status,
            }))
          );
        }
      });
    } else {
      districtApi.getByProvince(provinceID).then((res: any) => {
        if (res.status === 200) {
          setTableName(provinceName);
          setDistrict(res.data.result);
          setData(
            res.data.result.map((data: any) => ({
              code: data.code,
              name: data.name,
              status: data.status,
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
              status: data.status,
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
              status: data.status,
            }))
          );
        }
      });
    }
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: 10,
      display: "fixed",
      left: "95%",
    },
  }));
  const [infoprovin, setInfoprovin] = useState({
    name: "",
  });

  const [infoacc, setInfoacc] = useState({
    code: "",
    name: "",
    endTime: "",
    password: "",
    startTime: "",
  });

  const classesButton = useStyles();
  const [keyShow, setKeyShow] = useState(false);
  const [accShow, setAccShow] = useState(false);
  const handleCloseKey = () => setKeyShow(false);
  const handleCloseAcc = () => setAccShow(false);
  const onchangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
  };

  const onSubmitKey = (event: any) => {
    handleCloseKey();
    event.preventDefault();
    provinceApi.postProvinces(infoprovin).then((res: any) => {
      if (res.status === 200) {
        provinceApi.getProvinces().then((res: any) => {
          if (res.status === 200) {
            setProvince(res.data);
            setData(
              res.data.map((data: any) => ({
                code: data.code,
                name: data.name,
                account: data.code,
                start: data.admin == null ? "" : data.admin.startTime,
                end: data.admin == null ? "" : data.admin.endTime,
                status:
                  data.admin == null
                    ? "Inactive"
                    : data.admin.permission
                    ? "Active"
                    : "Inactive",
              }))
            );
          }
        });
      }
    });
  };

  const onSubmitAcc = (event: any) => {
    event.preventDefault();
    userprovinceApi.postUserProvinces(infoacc).then((res: any) => {
      if (res.status === 200) {
        handleCloseAcc();
        provinceApi.getProvinces().then((res: any) => {
          if (res.status === 200) {
            setProvince(res.data);
            setData(
              res.data.map((data: any) => ({
                code: data.code,
                name: data.name,
                account: data.code,
                start: data.admin == null ? "" : data.admin.startTime,
                end: data.admin == null ? "" : data.admin.endTime,
                status:
                  data.admin == null
                    ? "Inactive"
                    : data.admin.permission
                    ? "Active"
                    : "Inactive",
              }))
            );
          } 
        });
      }
    });
  };
  let codeNew: any = data.length + 1;
  codeNew = Number(codeNew) < 10 ? `0${codeNew}` : codeNew;

  return (
    <Box mt={5} ml={5} style={{ marginTop: 0 }}>
      <div>
        <Button
          variant="primary"
          onClick={() => setKeyShow(true)}
          style={{ margin: 10 }}
        >
          <AddIcon />
          Cấp mã
        </Button>
        <Button
          variant="primary"
          onClick={() => setAccShow(true)}
          style={{ margin: 10 }}
        >
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
            <Form style={{ margin: 10, padding: 10 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Khai báo Tỉnh/Thành phố</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập tên tỉnh/thành phố"
                  onChange={(e) =>
                    setInfoprovin({ ...infoprovin, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mã</Form.Label>
                <InputGroup.Text id="basic-addon2">{codeNew}</InputGroup.Text>
              </Form.Group>
            </Form>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseKey}>
                Hủy
              </Button>
              <Button variant="primary" onClick={onSubmitKey}>
                Hoàn thành
              </Button>
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
            <Form style={{ margin: 10, padding: 10 }}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tỉnh/Thành phố</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập tên tỉnh/thành phố"
                  onChange={(e) =>
                    setInfoacc({ ...infoacc, name: e.target.value })
                  }
                />
                {/* <Select
                  placeholder="Tên tài khoản"
                  options={inferiors}
                  // onChange={handleSelect}
                /> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mã tỉnh/thành phố</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập mã"
                  onChange={(e) => {
                    setInfoacc({ ...infoacc, code: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cấp mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {
                    setInfoacc({ ...infoacc, password: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ngày cấp</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setInfoacc({ ...infoacc, startTime: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ngày hết hạn</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setInfoacc({ ...infoacc, endTime: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAcc}>
                Hủy
              </Button>
              <Button variant="primary" onClick={onSubmitAcc}>
                Hoàn thành
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
      <Grid container>
        <Box mr={3} mt={1}>
          <Grid item>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={province}
                getOptionLabel={(element: any) => element.name}
                label="Tỉnh/Thành phố"
                onChange={onChangeProvince}
              />
            </Box>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={district}
                getOptionLabel={(element: any) => element.name}
                label="Quận/Huyện"
                onChange={onChangeDistrict}
                key={districtKey}
              />
            </Box>
            <Box mb={2}>
              <EnhancedDropdownMenu
                options={ward}
                getOptionLabel={(element: any) => element.name}
                label="Phường/Xã"
                onChange={onChangeWard}
                key={wardKey}
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
