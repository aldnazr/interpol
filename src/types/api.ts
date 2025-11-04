interface ArrestWarrant {
  issuing_country_id: string;
  charge: string;
  charge_translation?: string;
}

interface Link {
  href: string;
}

interface Links {
  self: Link;
  images: Link;
  thumbnail: Link;
}

export interface Notice {
  date_of_birth: string;
  nationalities: string[];
  entity_id: string;
  forename: string;
  name: string;
  _links: {
    self: { href: string };
    images: { href: string };
    thumbnail: { href: string };
  };
}

export interface NoticeDetail {
  arrest_warrants?: ArrestWarrant[];
  weight?: number | null;
  forename: string;
  date_of_birth: string;
  entity_id: string;
  languages_spoken_ids?: string[] | null;
  nationalities?: string[] | null;
  height?: number | null;
  sex_id: "F" | "M";
  country_of_birth_id?: string | null;
  name: string;
  distinguishing_marks?: string | null;
  eyes_colors_id?: "BRO" | "BLA";
  hairs_id?: "BRO" | "BLA";
  place_of_birth?: string | null;
  _links: Links;
}
