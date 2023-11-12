"use client";

import styles from "./page.module.css";
import { Button, Col, Popconfirm, Row, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { deleteQuestion, getAll } from "../../api/question";
import ModalCreateQuestion from "@/components/Question/ModalCreateQuestion";
import ModalUpdateQuestion from "@/components/Question/ModalUpdateQuestion";

export interface DataType {
  suggest_answer: string;
  title: string;
  description: string;
  action: string;
  required: boolean;
  type_id: any;
  id: string;
}

const QuestionType: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listQ, setListQ] = useState([]);
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
      setListQ(res.data.data.rows);
      setTotal(res.data.data.page.total);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteQuestion(id);
    if (res && res.data) {
      message.success("Delete success");
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
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
      title: "Suggest Answer",
      dataIndex: "suggest_answer",
    },
    {
      title: "Require",
      dataIndex: "required",
      render: (text) => String(text),
    },
    {
      title: "Question Type",
      dataIndex: "type_id",
      render: (type_id) => type_id?.name,
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: "25px" }}
              onClick={() => {
                setOpenModal(true);
                setDataUpdate(record);
              }}
            >
              Update
            </Button>

            <Popconfirm
              placement="leftTop"
              title={"Confirm deletion ?"}
              description={"Are you sure you want to delete?"}
              onConfirm={() => handleDelete(record.id)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
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
            <p style={{ fontSize: "30px" }}>List Question</p>
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
            dataSource={listQ}
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

      <ModalCreateQuestion openModal={openModal} setOpenModal={setOpenModal} />
      <ModalUpdateQuestion
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default QuestionType;
