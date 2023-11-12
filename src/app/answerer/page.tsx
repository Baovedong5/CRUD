"use client";

import { Button, Col, List, Row, Table } from "antd";
import styles from "./page.module.css";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { getAll } from "@/api/answerer";
import ModalCreateAnswer from "@/components/Answerer/ModalCreateAnswerer";

interface DataType {
  name: string;
  gender: number;
  congrulation: string;
  answers: {
    answer: string;
    id: string;
  }[];
}

const Answerer: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAnswerer();
  }, [current, pageSize]);

  const fetchAnswerer = async () => {
    const query = `page=${current}&limit=${pageSize}`;

    const res = await getAll(query);

    if (res.data && res.data.data) {
      setList(res.data.data.rows);
      setTotal(res.data.data.page.total);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => (text === 0 ? "Nam" : "Nu"),
    },
    {
      title: "Congrulation",
      dataIndex: "congrulation",
    },
    {
      title: "Answers",
      dataIndex: "answers",
      render: (answers) => answers.map((answer: any) => answer.answer),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (pagination && pagination.current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize) {
      setPageSize(pagination.pageSize);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <div className={styles.title}>
            <p style={{ fontSize: "30px" }}> List Answerer</p>
            <Button
              type="primary"
              size="large"
              onClick={() => setOpenModal(true)}
            >
              Add
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={list}
            rowKey="_id"
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
            }}
          />
        </Col>
        <ModalCreateAnswer openModal={openModal} setOpenModal={setOpenModal} />
      </Row>
    </>
  );
};

export default Answerer;
