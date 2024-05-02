/* eslint-disable */
import axios from "axios";
import { Test } from "../../api/api";

const createModerator = async (email, password, accessToken) => {
  const data = {
    email,
    name: email,
    password,
    password_confirm: password,
    max_establishments: 3,
  };
  try {
    const response = await Test(data, accessToken);
    console.log("Moderator created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating moderator:", error);
    throw error;
  }
};

export default createModerator;
