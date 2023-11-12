import { Descriptions, Drawer } from "antd";

export interface value {
  answer: string;
  question: {
    title: string;
    id: string;
  };
  answerer: {
    name: string;
    id: string;
  };
}

const ViewDetail = (props: {
  openViewDetal: boolean;
  setOpenViewDetail: (value: boolean) => void;
  setDataViewDetail: (value: value) => void;
  dataDetail: value;
}) => {
  const { openViewDetal, setOpenViewDetail, dataDetail, setDataViewDetail } =
    props;
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail({
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
  };
  return (
    <>
      <Drawer
        title="View Detail Answer"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetal}
      >
        <Descriptions title="Detail Answer" bordered column={2}>
          <Descriptions.Item label="Answer">
            {dataDetail?.answer}
          </Descriptions.Item>
          <Descriptions.Item label="Question">
            {dataDetail?.answer}
          </Descriptions.Item>
          <Descriptions.Item label="Answerer">
            {dataDetail?.answerer?.name}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default ViewDetail;
