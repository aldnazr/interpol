import axios from "axios";

const api = axios.create({ baseURL: "https://ws-public.interpol.int" });

export type NoticeTypes = "red" | "yellow" | "un";

export async function fetchNotice(
  noticeType: NoticeTypes,
  {
    name = "",
    forename = "",
    page = 1,
    resultPerPage = 20,
  }: {
    name?: string;
    forename?: string;
    page?: number;
    resultPerPage?: number;
  }
) {
  try {
    const res = await api.get(`/notices/v1/${noticeType}`, {
      params: { name, forename, page, resultPerPage },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch notices:", err);
    return null;
  }
}

export async function fetchNoticeDetail({
  noticeType,
  noticeID,
}: {
  noticeType: NoticeTypes;
  noticeID: string;
}) {
  try {
    const res = await api.get(
      `/notices/v1/${noticeType}/${
        noticeType === "un" ? "persons" : ""
      }/${noticeID}`
    );
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch notices:", err);
    // Di aplikasi production, Anda mungkin ingin menangani error ini dengan lebih baik
    return null;
  }
}
