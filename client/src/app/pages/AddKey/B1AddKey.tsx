import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRole } from "hocs/useRole";
import { Role } from "settings/role";
import EnhancedDropdownMenu from "components/_shares/EnhancedDropdownMenu";
import { villageApi } from "services/api/village";
import { districtApi } from "services/api/district";
import { wardApi } from "services/api/ward";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { authApi } from "services/api/auth";
const B1AddKeyPage: React.FC = () => {
  useRole(Role.B1);

  const [village, setVillage] = React.useState([]);
  const [ward, setWard] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [tableName, setTableName] = React.useState("Toàn quốc");
  const [postvillage, setPostvillage] = React.useState([]);

  useEffect(() => {
    villageApi.getVillages().then((res: any) => {
      if (res.status === 200) {
        setVillage(res.data);
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

  let codeNew: any = data.length + 1;
  codeNew = Number(codeNew) < 10 ? `0${codeNew}` : codeNew;

  return (
    <>
      <Form style={{ margin: 10, padding: 10 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Khai báo Xã/</Form.Label>
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

export default B1AddKeyPage;
