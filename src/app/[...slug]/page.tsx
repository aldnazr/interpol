import { NoticeTypes } from "@/app/lib/data";
import NoticeDetailPage from "@/app/ui/detail/detail";

interface Props {
  params: { slug: string[] };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const noticeType = slug[0] as NoticeTypes;
  const noticeID = slug[1];

  return <NoticeDetailPage noticeType={noticeType} noticeID={noticeID} />;
}
