import api from "@/lib/api";

import {
  AIChatHistoryResponse,
  AIChatResponse,
  AIChatVoiceResponse,
  GetAIChatHistoryParams,
  SendAIMessagePayload,
} from "@/types";

// Send text message to AI
export const sendAIMessage = async (
  payload: SendAIMessagePayload,
): Promise<AIChatResponse> => {
  try {
    const res = await api.post("/ai/chat", payload);

    return res.data;
  } catch (error: any) {
    console.log(error.response?.data);

    throw error;
  }
};

// Send voice message to AI
export const sendAIVoiceMessage = async (
  audioFile: File,
): Promise<AIChatVoiceResponse> => {
  const formData = new FormData();

  formData.append("audio", audioFile);

  const res = await api.post("/ai/chat/voice", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get AI chat history
export const getAIChatHistory = async (
  params?: GetAIChatHistoryParams,
): Promise<AIChatHistoryResponse> => {
  const res = await api.get("/ai/chat/history", {
    params,
  });

  return res.data;
};
