"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NoticeDetail } from "@/types/api";
import { Separator } from "@radix-ui/react-separator";
import {
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  Flag,
  Languages,
  Eye,
  Palette,
  Scale,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDetailRedNotice } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NoticeDetailSkeleton from "./detail-skeleton";

export default function RedNoticeDetail({ noticeID }: { noticeID: string }) {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoSrc, setPhotoSrc] = useState(null);

  const colorNames = {
    BRO: "Brown",
    BLA: "Black",
  } as const;

  const sexNames = {
    F: "Female",
    M: "Male",
  } as const;

  const formatDate = (dateString = "") => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatHeight = (height = 0) => {
    return height
      ? `${height}m (${Math.round(height * 3.28084)}ft ${Math.round(
          ((height * 3.28084) % 1) * 12
        )}in)`
      : "N/A";
  };

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDetailRedNotice({ noticeID });
      setNotice(data);
      console.log(data);
    } catch (error) {
      setError("Failed to fetch notice details.");
    } finally {
      setIsLoading(false);
    }
  };

  async function loadImages() {
    const res = await fetch(
      `https://ws-public.interpol.int/notices/v1/red/${noticeID}/images`
    );
    const data = await res.json();
    const images = data._embedded.images;
    const lastIndex = images.length - 1;
    const href = images[lastIndex]?._links?.self?.href;
    if (href) setPhotoSrc(href);
  }

  useEffect(() => {
    if (noticeID) {
      fetchDetail();
      loadImages();
    }
  }, [noticeID]);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {isLoading && <NoticeDetailSkeleton />}
      {!isLoading && !error && (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-balance">
                  INTERPOL Red Notice
                </h1>
                <p className="text-muted-foreground">Entity ID: {noticeID}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Badge variant="destructive" className="text-sm">
                WANTED
              </Badge>
              <Badge variant="outline">{notice?.nationalities?.[0]}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold">
                        {notice?.forename} {notice?.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Sex
                      </label>
                      <p className="text-lg">
                        {notice?.sex_id ? sexNames[notice?.sex_id] : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Date of Birth
                      </label>
                      <p className="text-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(notice?.date_of_birth)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Place of Birth
                      </label>
                      <p className="text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {notice?.place_of_birth ?? "Unknown"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Nationality
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Flag className="h-4 w-4" />
                        {notice?.nationalities?.map((nat) => (
                          <Badge key={nat} variant="secondary">
                            {nat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Languages
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Languages className="h-4 w-4" />
                        {notice?.languages_spoken_ids?.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {
                              // countryNames[lang] ||
                              lang
                            }
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Physical Characteristics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Height
                      </label>
                      <p className="text-lg font-semibold">
                        {formatHeight(notice?.height ?? 0)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Weight
                      </label>
                      <p className="text-lg font-semibold">
                        {notice?.weight ?? "N/A "}kg
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Eye Color
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Eye className="h-4 w-4" />
                        {notice?.eyes_colors_id ? (
                          <Badge variant="outline">
                            {colorNames[notice.eyes_colors_id]}
                          </Badge>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Hair Color
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Palette className="h-4 w-4" />
                        {notice?.hairs_id ? (
                          <Badge variant="outline">
                            {colorNames[notice.hairs_id]}
                          </Badge>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                  </div>

                  {notice?.distinguishing_marks && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Distinguishing Marks
                        </label>
                        <p className="text-lg mt-1">
                          {notice?.distinguishing_marks}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Criminal Charges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Criminal Charges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notice?.arrest_warrants?.map((warrant, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">
                          Issuing Country: {warrant.issuing_country_id}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Charges
                        </label>
                        <p className="text-sm leading-relaxed mt-1 p-3 bg-muted rounded-lg">
                          {warrant.charge}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        width={300}
                        height={400}
                        alt="photo"
                        className="w-auto h-auto rounded-lg object-cover"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <User className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Photo Available</p>
                        <p className="text-xs">via INTERPOL</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Age</span>
                    <span className="text-sm font-medium">
                      {notice?.date_of_birth
                        ? `${
                            new Date().getFullYear() -
                            new Date(notice.date_of_birth).getFullYear()
                          } years`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Gender
                    </span>
                    <span className="text-sm font-medium">
                      {notice?.sex_id ? sexNames[notice?.sex_id] : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Height
                    </span>
                    <span className="text-sm font-medium">
                      {notice?.height}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Weight
                    </span>
                    <span className="text-sm font-medium">
                      {notice?.weight ?? "N/A "}kg
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>External Resources</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-start space-y-2">
                  {notice?._links?.self && (
                    <Button variant={"outline"}>
                      <a
                        href={notice?._links.self.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <ExternalLink className="size-4" />
                        INTERPOL Notice
                      </a>
                    </Button>
                  )}
                  {notice?._links?.images && (
                    <Button variant={"outline"}>
                      <a
                        href={notice?._links.images.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <ExternalLink className="size-4" />
                        View Images
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Warning Notice */}
              <Card className="bg-red-700">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="text-sm">
                      <p className="flex flex-row items-center gap-2 font-medium mb-1 text-white">
                        <AlertTriangle className="size-4" />
                        Important Notice
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        This information is provided by INTERPOL for law
                        enforcement purposes only. If you have information about
                        this individual, contact your local authorities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
