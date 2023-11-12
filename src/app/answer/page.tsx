"use client";

import styles from "./page.module.css";
import { Button, Col, Popconfirm, Row, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { deleteQuestion, getAnswerPagination } from "@/api/answer";
import ModalCreateAnswer from "@/components/Answer/ModalCreateAnswer";
import ModalUpdateAnswer from "@/components/Answer/ModalUpdateAnswer";
import ViewDetail from "@/components/Answer/ViewDetail";
import { value } from "@/components/Answer/ViewDetail";

export interface DataType {
  answer: string;
  question_id: {
    id: string;
    title: string;
  };
  answerer_id: {
    name: string;
    id: string;
  };
  id: string;
}

const Answer: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listAnswer, setListAnswer] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [dataViewDetail, setDataViewDetail] = useState<value>({
    answer: "",
    question: {
      id: "",
      title: "",
    },
    answerer: {
      id: "",
      name: "",
    },
  });

  const [openViewDetal, setOpenViewDetail] = useState(false);

  useEffect(() => {
    fetchAnswer();
  }, [current, pageSize]);

  const fetchAnswer = async () => {
    const query = `page=${current}&limit=${pageSize}`;

    const res = await getAnswerPagination(query);

    if (res.data && res.data.data) {
      setListAnswer(res.data.data.rows);
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
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenViewDetail(true);
              setDataViewDetail(record);
            }}
          >
            {record.id}
          </a>
        );
      },
    },
    {
      title: "Question",
      dataIndex: "question_id",
      render: (question_id) => question_id?.title,
    },
    {
      title: "Answerer",
      dataIndex: "answerer_id",
      render: (answerer_id) => answerer_id?.name,
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
            dataSource={listAnswer}
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
        <ModalUpdateAnswer
          openModal={openModal}
          setOpenModal={setOpenModal}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />

        <ViewDetail
          openViewDetal={openViewDetal}
          setOpenViewDetail={setOpenViewDetail}
          setDataViewDetail={setDataViewDetail}
          dataDetail={dataViewDetail}
        />
      </Row>
    </>
  );
};

export default Answer;
