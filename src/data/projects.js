// src/data/projects.js
// KUMPULKAN SEMUA ARRAY GAMBAR DI SINI (satu sumber untuk Projects & Works)

export const astranauts = [
  new URL("../assets/astranauts/astranauts-1.webp", import.meta.url).href,
  new URL("../assets/astranauts/astranauts-2.webp", import.meta.url).href,
  new URL("../assets/astranauts/astranauts-3.webp", import.meta.url).href,
  new URL("../assets/astranauts/astranauts-4.webp", import.meta.url).href,
  new URL("../assets/astranauts/astranauts-5.webp", import.meta.url).href,
];

export const marathon = [
  new URL("../assets/astra-marathon/marathon-1.webp", import.meta.url).href,
  new URL("../assets/astra-marathon/marathon-2.webp", import.meta.url).href,
  new URL("../assets/astra-marathon/marathon-3.webp", import.meta.url).href,
  new URL("../assets/astra-marathon/marathon-4.webp", import.meta.url).href,
  new URL("../assets/astra-marathon/marathon-5.webp", import.meta.url).href,
  new URL("../assets/astra-marathon/marathon-6.webp", import.meta.url).href,
];

export const booth = [
  new URL("../assets/astra-booth/astra-booth-1.webp", import.meta.url).href,
  new URL("../assets/astra-booth/astra-booth-2.webp", import.meta.url).href,
  new URL("../assets/astra-booth/astra-booth-3.webp", import.meta.url).href,
  new URL("../assets/astra-booth/astra-booth-4.webp", import.meta.url).href,
  new URL("../assets/astra-booth/astra-booth-5.webp", import.meta.url).href,
  new URL("../assets/astra-booth/astra-booth-6.webp", import.meta.url).href,
];

export const beyondtech = [
  new URL("../assets/beyondtech/beyondtech-1.webp", import.meta.url).href,
  new URL("../assets/beyondtech/beyondtech-2.webp", import.meta.url).href,
  new URL("../assets/beyondtech/beyondtech-3.webp", import.meta.url).href,
  new URL("../assets/beyondtech/beyondtech-4.webp", import.meta.url).href,
  new URL("../assets/beyondtech/beyondtech-5.webp", import.meta.url).href,
];

export const AWM = [
  new URL("../assets/AWM/awm-1.webp", import.meta.url).href,
  new URL("../assets/AWM/awm-2.webp", import.meta.url).href,
  new URL("../assets/AWM/awm-3.webp", import.meta.url).href,
  new URL("../assets/AWM/awm-4.webp", import.meta.url).href,
  new URL("../assets/AWM/awm-5.webp", import.meta.url).href,
];

export const SIA = [
  new URL("../assets/SIA/SIA-1.webp", import.meta.url).href,
  new URL("../assets/SIA/SIA-2.webp", import.meta.url).href,
  new URL("../assets/SIA/SIA-3.webp", import.meta.url).href,
  new URL("../assets/SIA/SIA-4.webp", import.meta.url).href,
  new URL("../assets/SIA/SIA-5.webp", import.meta.url).href,
  new URL("../assets/SIA/SIA-6.webp", import.meta.url).href,
];


export const AN = [
  new URL("../assets/aprreciation-night/an-1.webp", import.meta.url) .href,
  new URL("../assets/aprreciation-night/an-2.webp", import.meta.url) .href,
  new URL("../assets/aprreciation-night/an-3.webp", import.meta.url) .href,
  new URL("../assets/aprreciation-night/an-4.webp", import.meta.url) .href,
  new URL("../assets/aprreciation-night/an-5.webp", import.meta.url) .href,
];

export const ASC = [
  new URL("../assets/ASC/ASC-1.webp", import.meta.url) .href,
  new URL("../assets/ASC/ASC-2.webp", import.meta.url) .href,
  new URL("../assets/ASC/ASC-3.webp", import.meta.url) .href,
  new URL("../assets/ASC/ASC-4.webp", import.meta.url) .href,
];

// Tambahkan properti "date" untuk sorting (YYYY-MM-DD)
export const PROJECTS = [
  {
    id: 1,
    title: "Astranauts 2024",
    description: "Awarding",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: astranauts,
    date: "2024-11-10",
  },
  {
    id: 2,
    title: "Astra Half Marathon 2024",
    description: "Event",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: marathon,
    date: "2024-10-06",
  },
  {
    id: 3,
    title: "Astra Like Fest 2",
    description: "Activation",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: booth,
    date: "2024-09-14",
  },
  {
    id: 4,
    title: "BeyondTech App Launching",
    description: "Event",
    client: "Client: BeyondTech",
    event: "Event By: AIF Creative",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: beyondtech,
    date: "2024-08-21",
  },
  {
    id: 5,
    title: "Asean Weekend Market 2023",
    description: "Event",
    client: "Client: Kadin",
    event: "Event By: DWKOM",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: AWM,
    date: "2023-12-02",
  },
  {
    id: 6,
    title: "14th Satu Indonesia Awards",
    description: "Event",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: SIA,
    date: "2023-11-10",
  },

  {
    id: 7,
    title: "Appreciation Night - Suparno Djasmin",
    description: "Event",
    client: "Client: Astra",
    event: "Event By: AIF Creative",
    images: AN,
    date: "2025-05-07",
  },

  {
    id: 8,
    title: "Astra Security Competition 2025",
    description: "Event",
    client: "Client: Astra",
    event: "Event By: AIF Creative",
    images: ASC,
    date: "2025-07-11"
  },
];
