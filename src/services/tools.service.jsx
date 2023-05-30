import { LIST_TOOLS } from "../utils/constants/api";

let listTools = [];

export async function getListTools() {
  try {
    const res = await (await fetch(LIST_TOOLS)).json();
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