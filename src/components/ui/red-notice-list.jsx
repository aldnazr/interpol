/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
"use client";

import { countryMap } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { User } from "lucide-react";

export default function RedNoticesList() {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch(
          "https://ws-public.interpol.int/notices/v1/red?resultPerPage=100"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data._embedded.notices || [];
        setNotices(items);
      } catch (err) {
        console.error("Fetch Interpol Red Notices failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);

  function getFlagsImage(country, style = "flat", size = "64") {
    return `https://flagsapi.com/${country}/${style}/${size}.png`;
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!notices.length) {
    return <p>No red notices found.</p>;
  }

  return (
    <div>
      <ul className="gap-3 grid grid-cols-3">
        {notices.map((notice) => (
          <li
            onClick={() =>
              router.push(
                `/detail?id=${notice.entity_id.replace("/", "-")}&type=red`
              )
            }
            key={notice.entity_id}
          >
            <Card className={"hover:cursor-pointer hover:bg-gray-800"}>
              <CardContent className="flex space-x-4">
                {notice._links?.thumbnail?.href ? (
                  <Image
                    className="rounded"
                    src={notice._links.thumbnail.href}
                    alt="thumbnail"
                    width={100}
                    height={0}
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-600 flex items-center justify-center text-xs text-white rounded">
                    N/A
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="flex font-semibold">
                    <User className="h-5 w-5" />
                    {notice.name}
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={getFlagsImage(notice.nationalities)}
                      alt="flag"
                      width={24}
                      height={16}
                      className="mr-2"
                    />
                    <Badge>{countryMap[notice.nationalities] ?? "N/A"}</Badge>
                  </div>
                  <p className="text-sm">Forename: {notice.forename}</p>
                  <p className="text-sm">
                    Issued:{" "}
                    {new Date(
                      notice.issueDate ?? notice.date ?? Date.now()
                    ).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-1">
                    <p>Age:</p>
                    <p>
                      {notice.date_of_birth
                        ? (() => {
                            const dob = new Date(notice.date_of_birth);
                            const today = new Date();
                            if (isNaN(dob)) return notice.date_of_birth;
                            let age = today.getFullYear() - dob.getFullYear();
                            const m = today.getMonth() - dob.getMonth();
                            if (
                              m < 0 ||
                              (m === 0 && today.getDate() < dob.getDate())
                            ) {
                              age--;
                            }
                            return `${age} yr${age !== 1 ? "s" : ""}`;
                          })()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
