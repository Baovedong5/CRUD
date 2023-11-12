"use client";

import { updateQuestion } from "@/api/question";
import { all } from "@/api/questionType";
import { Col, Divider, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";

export interface Item {
  suggest_answer: string;
  title: string;
  description: string;
  id: string;
  required: boolean;
  type_id: string;
  name: string;
}

const ModalUpdateQuestion = (props: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  dataUpdate: {};
  setDataUpdate: (value: string) => void;
}) => {
  const { openModal, setOpenModal, dataUpdate, setDataUpdate } = props;
  const [submit, setSubmit] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    options();
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const options = async () => {
    const res = await all();

    if (res && res.data) {
      setListQuestion(res.data.data.rows);
    }
  };

  const onFinish = async (values: {
    id: string;
    title: string;
    suggest_answer: string;
    description: string;
    required: boolean;
    type_id: string;
  }) => {
    const { id, title, suggest_answer, description, required, type_id } =
      values;
    setSubmit(true);
    const res = await updateQuestion(id, {
      title,
      suggest_answer,
      description,
      required,
      type_id,
    });
    setSubmit(false);
    if (res && res.data) {
      message.success("Update success");
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal
        title="Add new Questio"
        open={openModal}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModal(false);
          setDataUpdate("");
        }}
        okText={"Update"}
        cancelText={"Cancel"}
        maskClosable={false}
        centered={true}
        confirmLoading={submit}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={[20, 10]}>
            <Col span={24}>
              <Form.Item labelCol={{ span: 24 }} label="Id" name="id" hidden>
                <Input />
              </Form.Item>
            </Col>

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
                name="suggest_answer"
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

export default ModalUpdateQuestion;
