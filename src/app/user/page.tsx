"use client";

import { Collapse, Input, List } from "antd";
import style from "./page.module.css";
import { useState } from "react";
import { SearchProps } from "antd/es/input";
import { getAll } from "@/api/question";
import { getAnswerPagination } from "@/api/answer";

interface DataType {
  id: string;
  title: string;
  description: string;
  suggest_answer: string;
  type_id: {
    name: string;
    title: string;
  };
  answers: {
    id: string;
    answer: string;
    answerer_id: string;
  }[];
}

const User = () => {
  const { Search } = Input;
  const { Panel } = Collapse;
  const [questions, setQuestions] = useState<DataType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<DataType | null>(
    null
  );

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onSearch1: SearchProps["onSearch"] = async (value, _e, info) => {
    let query = `page=${current}&limit=${pageSize}`;

    if (value) {
      query += `&title=${value}`;
    }

    const res = await getAll(query);

    if (res && res.data) {
      setQuestions(res.data.data.rows);
      setSelectedQuestion(null);
    }
  };

  const onQuestionClick = (question: DataType) => {
    setSelectedQuestion(question);
  };

  return (
    <>
      <div className={style.wrapper}>
        <Search
          style={{ width: "500px" }}
          placeholder="Nhap cau hoi"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch1}
        />
      </div>
      <Collapse
        accordion
        activeKey={selectedQuestion ? [selectedQuestion.id] : []}
      >
        {questions.map((item) => (
          <Panel
            key={item.id}
            header={item.title}
            style={{
              backgroundColor:
                selectedQuestion && selectedQuestion.id === item.id
                  ? "#f0f0f0"
                  : "white",
            }}
            onClick={() => onQuestionClick(item)}
          >
            {selectedQuestion == item && (
              <div>
                <h2>Câu hỏi: {item.title}</h2>
                <h3>Mô tả: {item.description}</h3>
                <h3>Đề xuất câu trả lời: {item.suggest_answer}</h3>
                <h3>Câu trả lời:</h3>
                <List
                  dataSource={item.answers}
                  renderItem={(answer) => (
                    <List.Item key={answer.id}>{answer.answer}</List.Item>
                  )}
                />
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default User;
