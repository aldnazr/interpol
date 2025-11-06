import { fetchCountryData } from "@/app/lib/data";
import { useQuery } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Nationality({ code }: { code: string }) {
  const { data } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountryData(code),
    enabled: !!code,
  });
  const countryName = data?.name?.common || code;
  return countryName;
}
