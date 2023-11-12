"use client";

import { createAnswer } from "@/api/answer";
import { getAllPagination } from "@/api/answerer";
import { all } from "@/api/question";
import { Col, Divider, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  title: string;
}

const ModalCreateAnswer = (props: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { openModal, setOpenModal } = props;
  const [submit, setSubmit] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listAnswerer, setListAnswer] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    fetchQuestion();
    fetchAnswer();
  }, []);

  const fetchQuestion = async () => {
    const res = await all();

    if (res && res.data) {
      setListQuestion(res.data.data.rows);
    }
  };

  const fetchAnswer = async () => {
    const res = await getAllPagination();

    if (res && res.data) {
      setListAnswer(res.data.data.rows);
    }
  };

  const onFinish = async (values: {
    answer: string;
    question_id: string;
    answerer_id: string;
  }) => {
    const { answer, question_id, answerer_id } = values;
    setSubmit(true);
    const res = await createAnswer({ answer, question_id, answerer_id });
    setSubmit(false);

    if (res && res.data) {
      message.success("Success");
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal
        title="Add new Question"
        open={openModal}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModal(false)}
        okText={"Add"}
        cancelText={"Cancel"}
        maskClosable={false}
        centered={true}
        confirmLoading={submit}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={[20, 10]}>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Answer"
                name="answer"
                rules={[
                  {
                    required: true,
                    message: "Answer cannot be blank ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Question"
                name="question_id"
                rules={[
                  {
                    required: true,
                    message: "Question cannot be blank ",
                  },
                ]}
              >
                <Select>
                  {listQuestion.map((item: Item) => (
                    <Option key={item.id}>{item.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Answerer"
                name="answerer_id"
                rules={[
                  {
                    required: true,
                    message: "Answerer cannot be blank ",
                  },
                ]}
              >
                <Select>
                  {listAnswerer.map((item: Item) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateAnswer;
