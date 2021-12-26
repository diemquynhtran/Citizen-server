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

import { userdistrictApi } from "services/api/userDistrict";

import { villageApi } from "services/api/village";
import { wardApi } from "services/api/ward";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { userInfo } from "os";
import moment from "moment";

const head = [
  { id: 1, label: "Mã quận/huyện" },
  { id: 2, label: "Tên quận/huyện" },
  { id: 3, label: "Tài khoản" },
  { id: 4, label: "Ngày bắt đầu" },
  { id: 5, label: "Ngày hết hạn" },
  { id: 6, label: "Trạng thái" },
];
const A2ManagePage = () => {
  useRole(Role.A2);
  const {userInfo } = useSelector((state: RootState) => state.user);
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
  

  const [date, setDate] = React.useState([]);

  useEffect(() => {
    districtApi.getDistricts().then((res: any) => {
      if (res.status === 200) {
        setProvince(res.data);
        setData(
          res.data.map((data: any) => ({
            code: data.code,
            name: data.name,
            account: data.code,
            start: data.admin == null ? "" : moment(data.admin.startTime).format("DD/MM/YY"),
            end: data.admin == null ? "" : moment(data.admin.endTime).format("DD/MM/YY"),
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

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: 10,
      display: "fixed",
      left: "95%",
    },
  }));

  const [infodistrict, setInfodistrict] = useState({
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
    districtApi.postDistrict(infodistrict).then((res: any) => {
      if (res.status === 200) {
        districtApi.getDistricts().then((res: any) => {
          if (res.status === 200) {
            setProvince(res.data);
            setData(
              res.data.map((data: any) => ({
                code: data.code,
                name: data.name,
                account: data.code,
                start:
                data.admin == null
                  ? ""
                  : moment(data.admin.startTime).format("DD/MM/YY"),
              end:
                data.admin == null
                  ? ""
                  : moment(data.admin.endTime).format("DD/MM/YY"),
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
    userdistrictApi.postUserDistrict(infoacc).then((res: any) => {
      if (res.status === 200) {
        handleCloseAcc();
        districtApi.getDistricts().then((res: any) => {
          if (res.status === 200) {
            setProvince(res.data);
            setData(
              res.data.map((data: any) => ({
                code: data.code,
                name: data.name,
                account: data.code,
                start:
                data.admin == null
                  ? ""
                  : moment(data.admin.startTime).format("DD/MM/YY"),
              end:
                data.admin == null
                  ? ""
                  : moment(data.admin.endTime).format("DD/MM/YY"),
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
  codeNew = userInfo?.username + codeNew;

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
                <Form.Label>Khai báo quận/huyện</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập tên quận/huyện"
                  onChange={(e:any) =>
                    setInfodistrict({ ...infodistrict, name: e.target.value })
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
                  placeholder="Nhập tên quận/huyện"
                  onChange={(e:any) =>
                    setInfoacc({ ...infoacc, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mã quận/huyện</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập mã"
                  onChange={(e:any) => {
                    setInfoacc({ ...infoacc, code: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cấp mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e:any) => {
                    setInfoacc({ ...infoacc, password: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ngày cấp</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e:any) =>
                    setInfoacc({ ...infoacc, startTime: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ngày hết hạn</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e:any) =>
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

export default A2ManagePage;
