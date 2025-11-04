import RedNoticeDetail from "../ui/home/detail/detail";

export default async function Page({
  params,
}: {
  params: { noticeID: string };
}) {
  const { noticeID } = await params;

  return <RedNoticeDetail noticeID={noticeID} />;
}
