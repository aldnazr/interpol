import axios from "axios";

const API_URL = "https://ws-public.interpol.int";

export async function fetchRedNotice({
  name = "",
  forename = "",
  page = 1,
  resultPerPage = 20,
}: {
  name?: string;
  forename?: string;
  page?: number;
  resultPerPage?: number;
}) {
  try {
    const res = await axios.get(`${API_URL}/notices/v1/red`, {
      params: { name, forename, page, resultPerPage },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch red notices:", err);
    // Di aplikasi production, Anda mungkin ingin menangani error ini dengan lebih baik
    return null;
  }
}

export async function fetchDetailRedNotice({ noticeID }: { noticeID: string }) {
  try {
    const res = await axios.get(`${API_URL}/notices/v1/red/${noticeID}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch red notices:", err);
    // Di aplikasi production, Anda mungkin ingin menangani error ini dengan lebih baik
    return null;
  }
}
