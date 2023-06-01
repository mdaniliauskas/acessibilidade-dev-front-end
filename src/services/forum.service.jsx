import {
  CLOSE_TOPIC,
  LIST_TOPICS,
  NEWREPLY,
  TOPIC_DETAILS,
  UPDATE_VOTES,
} from "../utils/constants/api";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
};

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

export async function getTopicDetails(topicId) {
  try {
    const res = await (await fetch(TOPIC_DETAILS + "/" + topicId)).json();
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

export async function closeTopic(topicId) {
  try {
    const res = await (
      await fetch(CLOSE_TOPIC + "/" + topicId, {
        method: "PUT",
        body: JSON.stringify({
          status: true,
        }),
        headers,
      })
    ).json();
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

export async function voteTopic(topicId, vote) {
  try {
    const res = await (
      await fetch(UPDATE_VOTES + "/" + topicId + "/votes", {
        method: "PUT",
        body: JSON.stringify({
          votes: vote,
        }),
        headers,
      })
    ).json();
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
