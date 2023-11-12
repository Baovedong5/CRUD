"use client";

import { Button, Col, Row, Table } from "antd";
import styles from "./page.module.css";
import { ColumnsType, TableProps } from "antd/es/table";
import ModalCreateQT from "@/components/QuestionType/ModalCreateQT";
import { useEffect, useState } from "react";
import { getAll } from "@/api/questionType";

interface DataType {
  name: string;
  title: string;
  description: string;
  action: string;
}

const QuestionType: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [listQT, setListQT] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchQT();
  }, [current, pageSize]);

  const fetchQT = async () => {
    const query = `page=${current}&limit=${pageSize}`;

    const res = await getAll(query);

    if (res.data && res.data.data) {
      setListQT(res.data.data.rows);
      setTotal(res.data.data.page.total);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: "25px" }}>
              Update
            </Button>
            <Button type="primary">Delete</Button>
          </>
        );
      },
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
            <p style={{ fontSize: "30px" }}>List Question Type </p>
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
            dataSource={listQT}
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
      </Row>

      <ModalCreateQT openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default QuestionType;
