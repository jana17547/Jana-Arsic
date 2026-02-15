export type Project = {
  slug: string;
  title: string;
  summary: string;
  detailedDescription: string;
  highlights: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl: string | null;
  coverImage: string;
  imageAlt: string;
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "artworks",
    title: "Artworks",
    summary:
      "Full stack web aplikacija za aukcije umetničkih dela sa jasno definisanim korisničkim ulogama i sigurnom autentifikacijom.",
    detailedDescription:
      "Artworks je platforma za online aukcije umetničkih dela gde različite uloge imaju precizno definisana prava pristupa. Implementiran je kompletan tok od registracije i autentifikacije do objave umetnina i bid procesa, uz backend validacije i rad sa relacijskom bazom.",
    highlights: [
      "Role-based pristup za artist, collector i admin korisnike.",
      "Upload i upravljanje umetninama sa pregledom detalja i istorije ponuda.",
      "JWT autentifikacija i autorizacija API zahteva.",
      "Prisma ORM sloj nad PostgreSQL bazom za stabilan rad sa podacima.",
    ],
    technologies: ["React", "Node.js", "Express", "Prisma ORM", "PostgreSQL", "JWT"],
    githubUrl: "https://github.com/jana17547/Artworks",
    demoUrl: null,
    coverImage: "/projects/artworks/cover.png",
    imageAlt: "Artworks platforma za aukcije umetničkih dela",
    screenshots: [
      "/projects/artworks/cover.png",
      "/projects/artworks/12.png",
      "/projects/artworks/13.png",
      "/projects/artworks/14.png",
      "/projects/artworks/15.png",
    ],
  },
  {
    slug: "dentalpremium",
    title: "DentalPremium (u razvoju)",
    summary:
      "Sistem za stomatološku praksu sa fokusom na organizaciju rada ordinacije i pregled kliničkih podataka.",
    detailedDescription:
      "DentalPremium je full stack sistem u razvoju koji pokriva ključne procese stomatološke ordinacije: zakazivanje termina, upravljanje pacijentima i prikaz kliničkih informacija. Fokus projekta je na pouzdanoj poslovnoj logici, sigurnoj autentifikaciji i preglednom dashboard interfejsu.",
    highlights: [
      "Dashboard za pregled ključnih podataka o terminima i pacijentima.",
      "Upravljanje terminima i kartonima pacijenata kroz centralizovan sistem.",
      "Interaktivni odontogram za evidenciju stomatološkog stanja.",
      "ASP.NET Identity i JWT autentifikacija za kontrolu pristupa.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "ASP.NET Core",
      "Entity Framework Core",
      "MySQL",
      "ASP.NET Identity",
      "JWT",
    ],
    githubUrl: "https://github.com/jana17547/DentalPremium",
    demoUrl: null,
    coverImage: "/projects/dentalpremium/cover.png",
    imageAlt: "DentalPremium sistem za stomatološku praksu",
    screenshots: [
      "/projects/dentalpremium/cover.png",
      "/projects/dentalpremium/3.jpeg",
      "/projects/dentalpremium/4.jpeg",
      "/projects/dentalpremium/5.jpeg",
      "/projects/dentalpremium/6.jpeg",
      "/projects/dentalpremium/7.jpeg",
    ],
  },
  {
    slug: "tasks-plus-plus",
    title: "Tasks++",
    summary:
      "Task manager aplikacija sa dinamičkim prikazom podataka bez reload-a i jasnim workflow-om za prioritizaciju zadataka.",
    detailedDescription:
      "Tasks++ je aplikacija za organizaciju zadataka sa fokusom na brze interakcije i preglednost stanja. HTMX pristup je korišćen za dinamično osvežavanje sadržaja bez punog reload-a stranice, uz backend logiku za statusne tokove i filtriranje.",
    highlights: [
      "CRUD tok za zadatke sa validacijom i jasnim statusnim promenama.",
      "Filteri po statusu i prioritetu radi brže organizacije rada.",
      "Dinamički prikaz podataka bez full page reload-a korišćenjem HTMX-a.",
      "Strukturisan backend kroz Laravel i MySQL model podataka.",
    ],
    technologies: ["Laravel", "PHP", "HTMX", "MySQL", "HTML", "CSS"],
    githubUrl: "https://github.com/jana17547/tasks-htmx-laravel",
    demoUrl: null,
    coverImage: "/projects/tasksapp/cover.png",
    imageAlt: "Tasks++ task manager aplikacija",
    screenshots: [
      "/projects/tasksapp/cover.png",
      "/projects/tasksapp/task2.png",
      "/projects/tasksapp/task3.png",
      "/projects/tasksapp/task4.png",
      "/projects/tasksapp/task5.png",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
