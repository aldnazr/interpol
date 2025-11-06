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
    return res.data;
  } catch (err) {
    console.error("Failed to fetch notices:", err);
    // Di aplikasi production, Anda mungkin ingin menangani error ini dengan lebih baik
    return null;
  }
}

export async function fetchDetailImage({
  noticeType,
  noticeID,
}: {
  noticeType: NoticeTypes;
  noticeID: string;
}) {
  try {
    const res = await axios.get(
      `https://ws-public.interpol.int/notices/v1/${noticeType}/${
        noticeType === "un" ? "persons" : ""
      }/${noticeID}/images`
    );
    const data = await res.data;
    const images = data._embedded.images;
    const lastIndex = images.length - 1;
    return images[lastIndex]?._links?.self?.href || null;
  } catch (err) {
    console.error("Failed to fetch notices:", err);
    // Di aplikasi production, Anda mungkin ingin menangani error ini dengan lebih baik
    return null;
  }
}

export async function fetchCountryData(code: string) {
  if (!code) return null;
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    return res.data[0];
  } catch (err) {
    console.error(`Failed to fetch country data for ${code}:`, err);
    // Return null or a default object if the country is not found or API fails
    return null;
  }
}
