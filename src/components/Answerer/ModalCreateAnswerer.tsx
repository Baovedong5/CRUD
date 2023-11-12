"use client";

import { getAll } from "@/api/answer";
import { createAnswer } from "@/api/answerer";
import { Col, Divider, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";

interface Item {
  answer: string;
  question_id: {
    title: string;
    id: string;
  };
  id: string;
}

const ModalCreateAnswer = (props: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { openModal, setOpenModal } = props;
  const [submit, setSubmit] = useState(false);
  const [listAnswer, setListAnswer] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    all();
  });

  const all = async () => {
    const res = await getAll();

    if (res && res.data) {
      setListAnswer(res.data.data.rows);
    }
  };

  const onFinish = async (values: {
    name: string;
    gender: number;
    congrulation: string;
    answers: string;
  }) => {
    setSubmit(true);
    try {
      const res = await createAnswer({
        name: values.name,
        gender: values.gender,
        congrulation: values.congrulation,
        answers: values.answers,
      });
      setSubmit(true);
      if (res && res.data.data) {
        message.success("success");
        form.resetFields();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(">>>> error: ", error);
    }
  };

  return (
    <>
      <Modal
        title="Add new Answer"
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
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Name cannot be blank ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item labelCol={{ span: 24 }} label="Gender" name="gender">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Congrulation"
                name="congrulation"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item labelCol={{ span: 24 }} label="Answers" name="answers">
                <Select>
                  {listAnswer.map((item: Item) => (
                    <Option key={item.id}>{item.answer}</Option>
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
