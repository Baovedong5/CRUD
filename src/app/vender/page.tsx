"use client";

import { getVender } from "@/api/guest";
import { Collapse } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState } from "react";

interface DataType {
  name: string;
  phone: string;
  identity_number: string;
  email: string;
  id: string;
  sku: string;
  vender: string;
}

const Vender = () => {
  const [result, setResult] = useState<DataType[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { Panel } = Collapse;

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    let query = `page=${current}&limit=${pageSize}`;
    const headers = {
      "x-none-vender": value,
    };

    const res = await getVender(query, headers);

    if (res && res.data) {
      setResult(res.data.data.rows);
    }
  };

  return (
    <>
      <Search
        style={{ width: "500px" }}
        placeholder="Nhap vender"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Collapse>
        {result.map((item) => (
          <Panel header={item.name} key={item.id}>
            <p>ID: {item.id}</p>
            <p>Vender: {item.vender}</p>
            <p>Số điện thoại: {item.phone}</p>
            <p>Email: {item.email}</p>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Vender;
