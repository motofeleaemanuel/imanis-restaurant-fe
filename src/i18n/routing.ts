import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'ro'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    "/":{
      en: "/",
      es: "/",
      ro: "/"
    },
    "/menu": {
      en: "/menu",
      es: "/menu",
      ro: "/meniu"
    },
    "/gallery": {
      en: "/gallery",
      es: "/galeria",
      ro: "/galerie"
  }
  },
});