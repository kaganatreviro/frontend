/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Input, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faComments,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../../components/common/Navigation";

const initialQuestions = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    answer: "",
  },
  {
    id: 3,
    name: "John Doe",
    email: "johndoe@gmail.com",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    answer: "",
  },
  {
    id: 4,
    name: "John Doe",
    email: "johndoe@gmail.com",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    answer: "",
  },
];

const { Meta } = Card;

function Feedback() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [replyingQuestionId, setReplyingQuestionId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setQuestions(initialQuestions);
      setLoading(false);
    }, 2000);
  }, []);
  const handleSave = (values, questionId) => {
    const newQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answer: values.answer } : q
    );
    setQuestions(newQuestions);
    setReplyingQuestionId(null);
    setExpandedAnswers((prevExpanded) => ({
      ...Object.keys(prevExpanded).reduce((acc, key) => {
        if (key === questionId.toString()) {
          return acc;
        }
        return { ...acc, [key]: false };
      }, {}),
      [questionId]: true,
    }));
  };

  const handleReplyButtonClick = (questionId) => {
    setReplyingQuestionId(questionId);
    setExpandedAnswers((prevExpanded) => ({
      ...Object.keys(prevExpanded).reduce((acc, key) => {
        if (key === questionId.toString()) {
          return acc;
        }
        return { ...acc, [key]: false };
      }, {}),
      [questionId]: true,
    }));
  };

  const toggleAnswer = (questionId) => {
    setExpandedAnswers((prevExpanded) => {
      const newExpanded = { ...prevExpanded };
      if (replyingQuestionId !== null) {
        newExpanded[replyingQuestionId] = false;
        setReplyingQuestionId(null);
      }
      Object.keys(newExpanded).forEach((key) => {
        if (key !== questionId.toString()) {
          newExpanded[key] = false;
        }
      });
      newExpanded[questionId] = !prevExpanded[questionId];
      return newExpanded;
    });
  };

  const deleteComment = (questionId) => {
    const newQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(newQuestions);
  };

  const deleteAnswer = (questionId) => {
    const newQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answer: "" } : q
    );
    setQuestions(newQuestions);
  };

  return (
    <div className="flex ">
      <Navigation />
      <div className="bg-[#f4f4f4] flex-1 p-12">
        <div className="font-medium text-4xl mb-8 ml-6">Feedback</div>
        {loading ? (
          <Card bordered={false} className="w-full">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <Card style={{ border: "none" }}>
                <div className="flex flex-col">
                  <Card.Meta
                    title={`${question.name} ● ${question.email}`}
                    style={{ marginBottom: 5 }}
                  />
                  <div>{question.question}</div>
                  <div className="flex self-end">
                    {question.answer && (
                      <button
                        onClick={() => toggleAnswer(question.id)}
                        className="mr-2 bg-[#F34749] text-white py-1 px-4 rounded-full hover:bg-[#e24649] flex self-end mt-2 pr-3"
                      >
                        <FontAwesomeIcon
                          icon={faComments}
                          className={"self-center mr-2 w-4 h-4"}
                        />
                        <div className="text-[16px]">Comments</div>
                      </button>
                    )}
                    {!question.answer && (
                      <button
                        className="mr-2 bg-[#F34749] text-white py-1 px-4 rounded-full hover:bg-[#e24649] flex  self-end mt-2 pr-3"
                        onClick={() => handleReplyButtonClick(question.id)}
                      >
                        <FontAwesomeIcon
                          icon={faReply}
                          className={"self-center mr-2 w-4 h-4"}
                        />
                        <div className="text-[16px]">Reply</div>
                      </button>
                    )}

                    <button
                      className=" py-1 px-4 rounded-full hover:bg-[#f4f4f4] flex text-[#464646] self-end pr-3"
                      onClick={() => deleteComment(question.id)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={"self-center mr-2 w-4 h-4"}
                      />
                      <div className="text-[16px]">Delete</div>
                    </button>
                  </div>
                </div>
              </Card>
              {replyingQuestionId === question.id && (
                <div className="bg-white p-4 mt-2 flex flex-col">
                  <Form
                    onFinish={(values) => handleSave(values, question.id)}
                    style={{ marginTop: 10 }}
                  >
                    <Form.Item
                      name="answer"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your answer",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Enter your answer here"
                      />
                    </Form.Item>
                    <Form.Item>
                      <button
                        className="bg-[#F34749] px-4 py-1 text-[16px] text-white rounded-full hover:bg-[#e24649]"
                        htmlType="submit"
                      >
                        Send
                      </button>
                      <button
                        className="rounded-full  px-4 py-1 text-[16px] border-1 border-l-fuchsia-100 hover:bg-[#f4f4f4]"
                        style={{ marginLeft: 8 }}
                        onClick={() => setReplyingQuestionId(null)}
                      >
                        Cancel
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              )}
              {question.answer && expandedAnswers[question.id] && (
                <Card
                  style={{
                    marginLeft: 32,
                    border: "none",
                    marginTop: 4,
                  }}
                >
                  <div className="flex flex-col">
                    <Meta title={"Admin"} style={{ marginBottom: 5 }} />
                    <div>{question.answer}</div>
                    <button
                      className="bg-[#f4f4f4] py-1 px-4 rounded-full hover:bg-[#ebebeb] flex text-[#464646] self-end pr-3"
                      onClick={() => deleteAnswer(question.id)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={"self-center mr-2 w-4 h-4"}
                      />
                      <div className="text-[16px]">Delete</div>
                    </button>
                  </div>
                </Card>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedback;
