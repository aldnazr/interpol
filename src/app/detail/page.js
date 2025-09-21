/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  Scale,
  Eye,
  Palette,
  Languages,
  Flag,
  ExternalLink,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import Image from "next/image";

const countryNames = {
  DE: "Germany",
  GER: "German",
};

const colorNames = {
  BRO: "Brown",
  BLA: "Black",
};

const sexNames = {
  F: "Female",
  M: "Male",
};

export default function InterpolNoticeDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const typeNotice = searchParams.get("type");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoSrc, setPhotoSrc] = useState();

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://ws-public.interpol.int/notices/v1/red/${id}/images`
      );
      const data = await res.json();
      const images = data._embedded.images;
      const lastIndex = images.length - 1;
      const href = images[lastIndex]._links.self.href;
      setPhotoSrc(href);
    }
    load();
  }, [id]);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(
          `https://ws-public.interpol.int/notices/v1/${typeNotice}/${id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data || [];
        setData(items);
      } catch (err) {
        console.error("Fetch Interpol Red Notices failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id, typeNotice]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (data.length) {
    return <h1 className="text-lg p-2">No detail notices found.</h1>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatHeight = (height) => {
    return height
      ? `${height}m (${Math.round(height * 3.28084)}ft ${Math.round(
          ((height * 3.28084) % 1) * 12
        )}in)`
      : "N/A";
  };

  return (
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
            <p className="text-muted-foreground">Entity ID: {id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Badge variant="destructive" className="text-sm">
            WANTED
          </Badge>
          <Badge variant="outline">
            {countryNames[data.nationalities?.[0]] || data.nationalities?.[0]}
          </Badge>
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
                    {data.forename} {data.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Sex
                  </label>
                  <p className="text-lg">
                    {sexNames[data.sex_id] || data.sex_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </label>
                  <p className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(data.date_of_birth)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Place of Birth
                  </label>
                  <p className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {data.place_of_birth ?? "Unknown"}
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
                    {data.nationalities?.map((nat) => (
                      <Badge key={nat} variant="secondary">
                        {countryNames[nat] || nat}
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
                    {data.languages_spoken_ids?.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {countryNames[lang] || lang}
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
                    {formatHeight(data.height)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Weight
                  </label>
                  <p className="text-lg font-semibold">
                    {data.weight ?? "N/A "}kg
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Eye Color
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="h-4 w-4" />
                    {data.eyes_colors_id
                      ? data.eyes_colors_id.map((color) => (
                          <Badge key={color} variant="outline">
                            {colorNames[color] || color}
                          </Badge>
                        ))
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Hair Color
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Palette className="h-4 w-4" />
                    {data.hairs_id
                      ? data.hairs_id.map((hair) => (
                          <Badge key={hair} variant="outline">
                            {colorNames[hair] || hair}
                          </Badge>
                        ))
                      : "N/A"}
                  </div>
                </div>
              </div>

              {data.distinguishing_marks && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Distinguishing Marks
                    </label>
                    <p className="text-lg mt-1">{data.distinguishing_marks}</p>
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
              {data.arrest_warrants?.map((warrant, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">
                      Issuing Country:{" "}
                      {countryNames[warrant.issuing_country_id] ||
                        warrant.issuing_country_id}
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
                    className="rounded-lg object-cover"
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
                  {new Date().getFullYear() -
                    new Date(data.date_of_birth).getFullYear()}{" "}
                  years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Gender</span>
                <span className="text-sm font-medium">
                  {sexNames[data.sex_id]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Height</span>
                <span className="text-sm font-medium">{data.height}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weight</span>
                <span className="text-sm font-medium">{data.weight}kg</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data._links?.self && (
                <a
                  href={data._links.self.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  INTERPOL Notice
                </a>
              )}
              {data._links?.images && (
                <a
                  href={photoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Images
                </a>
              )}
            </CardContent>
          </Card>

          {/* Warning Notice */}
          <Card className="border-warning bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning-foreground mb-1">
                    Important Notice
                  </p>
                  <p className="text-warning-foreground/80 leading-relaxed">
                    This information is provided by INTERPOL for law enforcement
                    purposes only. If you have information about this
                    individual, contact your local authorities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
