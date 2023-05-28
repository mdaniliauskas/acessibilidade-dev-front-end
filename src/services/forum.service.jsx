import { LIST_TOPICS } from "../utils/constants/api";

let listTopics = [];

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
