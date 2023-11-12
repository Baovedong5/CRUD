"use client";

import { createQT } from "@/api/questionType";
import { Col, Divider, Form, Input, Modal, Row, message } from "antd";
import { useState } from "react";

const ModalCreateQT = (props: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { openModal, setOpenModal } = props;
  const [submit, setSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: {
    name: string;
    title: string;
    description: string;
  }) => {
    setSubmit(true);
    try {
      const res = await createQT({
        name: values.name,
        title: values.title,
        description: values.description,
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
        title="Add new Question Type"
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
                label="Description"
                name="description"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateQT;
