"use client";

import { createQuestion } from "@/api/question";
import { all } from "@/api/questionType";
import { Col, Divider, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Item } from "./ModalUpdateQuestion";

const ModalCreateQuestion = (props: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { openModal, setOpenModal } = props;
  const [submit, setSubmit] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    options();
  }, []);

  const options = async () => {
    const res = await all();

    if (res && res.data) {
      setListQuestion(res.data.data.rows);
    }
  };

  const onFinish = async (values: {
    title: string;
    description: string;
    suggest_answer: string;
    required: string;
    type_id: string;
  }) => {
    setSubmit(true);
    try {
      const res = await createQuestion({
        title: values.title,
        description: values.description,
        suggest_answer: values.suggest_answer,
        required: values.required,
        type_id: values.type_id,
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
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Title cannot be blank ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Suggest Answer"
                name="suggestAnswer"
                rules={[
                  {
                    required: true,
                    message: "Suggest answer cannot be blank ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Description"
                name="description"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Require"
                name="required"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Question Type"
                name="type_id"
              >
                <Select>
                  {listQuestion.map((item: Item) => (
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

export default ModalCreateQuestion;
