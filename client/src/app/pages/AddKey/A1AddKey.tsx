import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRole } from "hocs/useRole";
import { Role } from "settings/role";
import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import { provinceApi } from "services/api/province";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
const A1AddKeyPage: React.FC = () => {
  useRole(Role.A1);

  const [province, setProvince] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("Toàn quốc");

  useEffect(() => {
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
      }
    });
  }, []);

  const onChangeProvince = (event: unknown, value: any) => {
    if (value != null) {
      setTableName(value.name);
      districtApi.getByProvince(value.code).then((res: any) => {
        if (res.status === 200) {
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let codeNew:any = data.length + 1;
  codeNew = Number(codeNew) < 10 ? `0${codeNew}` : codeNew;

  return (
    <>
      <Form style={{ margin: 10, padding: 10 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Khai báo Tỉnh/Thành phố</Form.Label>
          <Form.Control
              type="name"
              placeholder="Nhập tên tỉnh/thành phố"
        />   
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mã</Form.Label>
          <InputGroup.Text id="basic-addon2">{codeNew}</InputGroup.Text>
        </Form.Group>
      </Form>
    </>
  );
};

export default A1AddKeyPage;
