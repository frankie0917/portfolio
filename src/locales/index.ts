import { cn } from "./cn";
import { en } from "./en";

export const resources = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
};

export type Translation = {
  nav: {
    intro: string;
    about: string;
    tech: string;
    projects: string;
    contact: string;
  };
  introduction: {
    greeting: string;
    name: string;
    im_a: string;
    developer: string;
  };
};
