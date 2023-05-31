import { LIST_TOPICS, TOPIC_DETAILS } from "../utils/constants/api";

export async function getListTopics() {
  try {
    const res = await (await fetch(LIST_TOPICS)).json();
    if (!res.success) throw new Error(res.message);
    return {
      success: true,
      data: res.message,
    };
  } catch (e) {
    return {
      success: false,
      data: e.message,
    };
  }
}

export async function getTopicDetails(idTopic) {
  try {
    const res = await (await fetch(TOPIC_DETAILS + "/" + idTopic)).json();
    if (!res.success) throw new Error(res.message);
    return {
      success: true,
      data: res.message,
    };
  } catch (e) {
    return {
      success: false,
      data: e.message,
    };
  }
}
