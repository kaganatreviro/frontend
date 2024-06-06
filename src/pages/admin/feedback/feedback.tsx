/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Skeleton, Button, message, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faComments, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../helpers/hooks/hook";
import EstablishmentSwitcher from "../../../components/establishment/switcher/Switcher";
import { fetchFeedbacks } from "../../../store/actions/admin/feedback/feedbacksSlice";
import { fetchAnswers, } from "../../../store/actions/admin/feedback/answersSlice";
import { createFeedback, updateAnswer, deleteAnswer, deleteFeedback } from "../../../components/api/api";
import './style.scss'

const Feedback: React.FC = () => {
  const dispatch = useAppDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<number | null>(null);
  const [deletingAnswerkId, setDeletingAnswerId] = useState<number | null>(null);
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeletingFeedbackId(null);
    setDeletingAnswerId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingFeedbackId !== null && deletingAnswerkId != null) {
      try {
        await deleteAnswer(deletingAnswerkId);
        if (currentEstablishment) {
          dispatch(fetchFeedbacks(currentEstablishment.id))
            .then(() => {
              dispatch(fetchAnswers(deletingFeedbackId));
            })
            .catch((error) => console.error("Error fetching feedbacks:", error));
        }
        message.success("Answer deleted successfully!");
      } catch (error) {
        console.error("Error deleting Answer:", error);
        message.error("Failed to delete Answer.");
      }
      setDeleteModalVisible(false);
      setDeletingFeedbackId(null);
    }
  };

  const feedbacks = useSelector((state: RootState) => state.feedback.feedbacks);
  const answers = useSelector((state: RootState) => state.answers.answers);
  const currentEstablishment = useSelector((state: RootState) => state.establishments.currentEstablishment);

  const [loading, setLoading] = useState(true);
  const [replyFeedbackId, setReplyFeedbackId] = useState<number | null>(null);
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const [commentsVisible, setCommentsVisible] = useState<{ [key: number]: boolean }>({});
  const [loadingComments, setLoadingComments] = useState<{ [key: number]: boolean }>({});
  const [newFeedbackText, setNewFeedbackText] = useState("");
  const [newText, setNewText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const currentEstablishmentName = currentEstablishment?.name || null;
  const [isAdmin, setIsAdmin] = useState<boolean>(true)

  useEffect(() => {
    if(window.location.hash == "#/feedback"){
      setIsAdmin(false);
    }
    if (currentEstablishment) {
      setLoading(true);
      dispatch(fetchFeedbacks(currentEstablishment.id))
        .then(() => setLoading(false))
        .catch((error) => console.error("Error fetching feedbacks:", error));
    }
  }, [currentEstablishment, dispatch]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', options);
  };

  const handleReplyClick = (id: number) => {
    setReplyFeedbackId(id === replyFeedbackId ? null : id);
  };

  const handleEditComment = (id: number) => {
    setEditingCommentId(id);
  };

  const handleUpdateComment = async (id: number, feedbackId: number) => {
    if (!newText.trim()) {
      setEditingCommentId(null)
      return;
    }
    try {
      const formData = new FormData();
      formData.append("feedback", feedbackId.toString());
      formData.append("text", newText);
      await updateAnswer(id, formData);
      if (currentEstablishment) {
        dispatch(fetchFeedbacks(currentEstablishment.id))
          .then(() => {
            dispatch(fetchAnswers(feedbackId));
          })
          .catch((error) => console.error("Error fetching answers:", error));
      }
      message.success("Answer updated successfully!");
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error updating Answer:", error);
      message.error("Failed to update Answer.");
    }
  };

  const handleDeleteComment = async (id: number, feedbackId: number) => {
    setDeleteModalVisible(true);
    setDeletingFeedbackId(feedbackId);
    setDeletingAnswerId(id);
  };

  const handleCommentClick = (id: number) => {
    setOpenCommentId(id);
    if (!commentsVisible[id]) {
      setLoadingComments((prevState) => ({
        ...prevState,
        [id]: true,
      }));
      dispatch(fetchAnswers(id))
        .then(() => {
          setLoadingComments((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        })
        .catch((error) => {
          console.error("Error fetching answers:", error);
          setLoadingComments((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        });
    }
    setCommentsVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setCommentsVisible((prevState) => {
      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach((key) => {
        if (parseInt(key) !== id) {
          updatedState[parseInt(key)] = false;
        }
      });
      return updatedState;
    });
  };

  const handleNewFeedbackSubmit = async (id: number) => {
    if (!newFeedbackText.trim()) {
      message.error("Feedback text cannot be empty");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("feedback", id.toString());
      formData.append("text", newFeedbackText);
      const response = await createFeedback(formData);
      console.log("Response:", response);
      message.success("Feedback submitted successfully!");
      setReplyFeedbackId(null);

      if (currentEstablishment) {
        dispatch(fetchFeedbacks(currentEstablishment.id))
          .then(() => {
            dispatch(fetchAnswers(id));
          })
          .catch((error) => console.error("Error fetching feedbacks:", error));
      }
      setNewFeedbackText("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      message.error("Failed to submit feedback.");
    }
  };

  return (
    <div className="flex flex-1">
      <div className="bg-[#f4f4f4] flex-1 flex flex-col p-12">
        {!isAdmin ? (<EstablishmentSwitcher title="Feedback" />) : (<div className="font-medium text-4xl mb-8">Feedback</div>)}

        {loading ? (
          <Skeleton active />
        ) : feedbacks && feedbacks.length > 0 ? (
          <div>
            <div className="text-3xl mb-6 text-start"> {currentEstablishmentName}</div>
            {feedbacks.map((feedback) => (
              <div key={feedback.id}>
                <div className="mb-4 p-4 bg-white shadow flex flex-col rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="font-bold">{feedback.display_user} ● </div>
                      <div className="font-bold text-gray-400 ml-1">{feedback.user}</div>
                    </div>
                    <div className="mt-2 text-gray-500">{formatDate(feedback.created_at)}</div>
                  </div>
                  <div className="mt-2">{feedback.text}</div>
                  <div className="flex self-end mt-2">
                    <button
                      className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 self-end mt-2 pr-3"
                      onClick={() => handleCommentClick(feedback.id)}
                    >
                      <FontAwesomeIcon icon={faComments} />
                      <div>{commentsVisible[feedback.id] ? "Hide" : `${feedback.answers }`}</div>
                    </button>
                    <button
                      className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                      onClick={() => handleReplyClick(feedback.id)}
                    >
                      <FontAwesomeIcon icon={faReply} />
                      <div>Reply</div>
                    </button>
                  </div>
                </div>
                {replyFeedbackId === feedback.id && (
                  <div className="mb-4 ml-12 p-4 bg-white shadow flex gap-4 items-center rounded-lg">
                    <Input.TextArea
                      rows={2}
                      placeholder="Write your feedback here..."
                      value={newFeedbackText}
                      onChange={(e) => setNewFeedbackText(e.target.value)}
                    />
                    <button
                      className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                      onClick={() => handleNewFeedbackSubmit(feedback.id)}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {commentsVisible[feedback.id] && (
                  <div className="mb-4 ml-6 gap-10 flex flex-col rounded-lg">
                    {loadingComments[feedback.id] ? (
                      <div className="flex items-center justify-center ml-6 py-4 shadow bg-white  rounded-lg">
                        <FontAwesomeIcon icon={faSpinner} spin={true} />
                        <span className="ml-2 ">Loading comments...</span>
                      </div>
                    ) : (
                      <div>
                        {openCommentId === feedback.id ? (
                          <div className="flex gap-4 flex-col">
                            {answers.filter(answer => answer.feedback === feedback.id).length > 0 ? (
                              answers.filter(answer => answer.feedback === feedback.id).map((answer) => (
                                <div key={answer.id} className=" p-4 ml-6 bg-white shadow flex flex-col rounded-lg">
                                  <div className="mb-2 flex justify-between items-center">
                                    <div className="font-bold">{answer.user_role === 'partner' ? `${currentEstablishmentName} - Establishment` : answer.user_role === 'admin' ? 'Admin' : answer.user}</div>
                                    <div className="text-gray-500">{formatDate(answer.created_at)}</div>
                                  </div>
                                  {editingCommentId === answer.id ? (
                                    <div className="flex justify-between items-center gap-4">
                                      <Input.TextArea
                                        rows={2}
                                        defaultValue={answer.text}
                                        onChange={(e) => setNewText(e.target.value)}
                                      />
                                      <div className="flex gap-2">
                                        <button className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 pr-3"
                                          onClick={() => handleUpdateComment(answer.id, feedback.id)}
                                        >
                                          Update
                                        </button>
                                        <button className="bg-[#b1b1b1] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 pr-3" onClick={() => setEditingCommentId(null)}>Cancel</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex justify-between">
                                      <div>{answer.text}</div>
                                      { isAdmin && answer.user_role === 'admin' ? (
                                        <div className="flex gap-2">
                                          <button className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                                            onClick={() => handleEditComment(answer.id)}>Edit</button>
                                          <button className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                                            onClick={() => handleDeleteComment(answer.id, feedback.id)}>Delete</button>
                                        </div>
                                      ): !isAdmin && answer.user_role === 'partner' && currentEstablishment?.name==answer.display_user  ? ((
                                        <div className="flex gap-2">
                                          <button className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                                            onClick={() => handleEditComment(answer.id)}>Edit</button>
                                          <button className="mr-2 bg-[#dd7d1d] text-white py-1 px-4 rounded-full hover:bg-[#D56A00] flex items-center gap-2 mt-2 pr-3"
                                            onClick={() => handleDeleteComment(answer.id, feedback.id)}>Delete</button>
                                        </div>
                                      )):("")}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="p-4 ml-6 bg-white shadow flex flex-col rounded-lg items-center">No comments yet</div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <FontAwesomeIcon icon={faSpinner} spin={true} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-3xl flex flex-1 items-center justify-center">No feedbacks for this establishment</div>
        )}
      </div>
      <Modal
        title="Delete Feedback"
        visible={deleteModalVisible}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        centered={true}
        width={300}
        okText="Yes"
        cancelText="No"
      >
        <p className="text-lg my-10 text-center">
          Are you sure you want to delete this feedback?
        </p>
      </Modal>
    </div>
  );
};

export default Feedback;