import { LIST_TOPICS } from "../utils/constants/api";


export async function getListTopics() {
  try {
    const res = await fetch(LIST_TOPICS);
    const listTopics = await res.json();
    return {
      success: true,
      data: listTopics
    }
  } catch (e) {
    return {
      success: false,
      data: e.message
    }
  };
}