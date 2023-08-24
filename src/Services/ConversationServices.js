import { CONVERSATION_API } from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

export const createConversationService = async (body) => axiosHelper.post(CONVERSATION_API, body);

export const updateConversationService = async (conversationId, message) => {
  const body = {
    message,
  };

  return axiosHelper.put(`${CONVERSATION_API}/${conversationId}`, body);
};
