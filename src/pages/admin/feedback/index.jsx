import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, Select } from "antd";
import MenuNav from "../../../components/menu-nav";
import "./style.scss";

const { Option } = Select;

const initialQuestions = [
  { id: 1, question: "Как часто обновляется ваш продукт?", answer: "", timestamp: new Date("2024-04-01") },
  { id: 2, question: "Где я могу найти документацию?", answer: "Документацию можно найти на нашем сайте.", timestamp: new Date("2024-04-02") },
  { id: 3, question: "Какие функции включены в основной пакет?", answer: "", timestamp: new Date("2024-04-03") },
];

function Feedback() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [filter, setFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const filteredQuestions = questions.filter((question) => {
    if (filter === "answered") return question.answer;
    if (filter === "unanswered") return !question.answer;
    return true;
  });

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const showModal = (question) => {
    setCurrentQuestion(question);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = (values) => {
    const newQuestions = questions.map((q) => (q.id === currentQuestion.id ? { ...q, answer: values.answer } : q));
    setQuestions(newQuestions);
    setIsModalVisible(false);
  };

  return (
    <div className="admin_feedback">
      <MenuNav />
      <Select defaultValue="all" style={{ width: 200, marginBottom: 20 }} onChange={handleFilterChange}>
        <Option value="all">Все вопросы</Option>
        <Option value="answered">Отвеченные</Option>
        <Option value="unanswered">Неотвеченные</Option>
      </Select>
      {filteredQuestions.map((question) => (
        <Card key={question.id} title={`Вопрос #${question.id}`} extra={question.answer ? "Отвечен" : "Неотвечен"} style={{ marginBottom: 16 }}>
          <p>
            {question.question}
          </p>
          {!!question.answer.length && (
          <p>
            Ответ:
              {" "}
            {question.answer}
          </p>
          )}
          {!question.answer && <Button type="primary" onClick={() => showModal(question)}>Ответить</Button>}
        </Card>
      ))}
      <Modal
        title="Ответ на вопрос"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSave}>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Пожалуйста, введите ваш ответ!" }]}
          >
            <Input.TextArea rows={4} placeholder="Введите ваш ответ здесь" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Сохранить ответ</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Feedback;
