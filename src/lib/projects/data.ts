// Project Data

export type Slug =
  | 'reading-tracker'
  | 'skut-face'
  | 'sorting-visualizer'
  | 'cloud-image-processor-api';

export type Project = {
  slug: Slug;
  title: string;
  short: string;
  bullets: string[];
  stack: string[];
  links: { detail: string; repo?: string; live?: string };
  heroImage?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "reading-tracker",
    title: "Reading Tracker (SvelteKit + FastAPI)",
    short:
      "JWT-secured reading tracker with Alembic migrations — plus Social Readia: an extension for public feed, likes, and comments.",
    bullets: [
      "Built a JWT-secured Reading Tracker with token-based ownership and authorization.",
      "Implemented Alembic migrations and a clean FastAPI + SQLAlchemy service layer with Pydantic schemas.",
      "Added Social Readia as an optional social layer: public feed, likes, comments, and visibility rules on top of the tracker foundation."
    ],
    stack: ["SvelteKit", "TypeScript", "FastAPI", "SQLAlchemy", "Alembic"],
    links: {
      detail: "/projects/reading-tracker",
      repo: "https://github.com/SkutM/reading-tracker",
      live: ""
    }
  },
  {
    slug: "skut-face",
    title: "SkutFace — Facial Recognition Auth (Flask + DeepFace)",
    short: "Facial-recognition login using DeepFace + JWT sessions, containerized with Gunicorn.",
    bullets: [
      "Developed facial authentication with DeepFace and TensorFlow embeddings.",
      "Implemented JWT session persistence for secure user logins.",
      "Containerized app with Gunicorn for scalable production deployment."
    ],
    stack: ["Flask", "Python", "DeepFace", "TensorFlow", "Gunicorn"],
    links: {
      detail: "/projects/skut-face",
      repo: "https://github.com/SkutM/skut-face",
      live: ""
    }
  },
  {
    slug: "sorting-visualizer",
    title: "Sorting Visualizer (Python + Pygame)",
    short: "Real-time sorting animations using generator-based algorithms (yield / yield from).",
    bullets: [
      "Built an interactive visualizer with Pygame using generator functions for per-step animation.",
      "Implemented Bubble, Selection, Insertion, Merge, and Quick Sort with color-coded highlights.",
      "Added interactive controls: choose algorithm, array size, randomization, and background color.",
      "Designed a clean, modular structure (algorithms.py / main.py / utils.py)."
    ],
    stack: ["Python", "Pygame"],
    links: {
      detail: "/projects/sorting-visualizer",
      repo: "https://github.com/SkutM/sorting-visualizer",
      live: ""
    },
    heroImage: "/images/sorting-visualizer/hero.png",
    gallery: [
      "/images/sorting-visualizer/bubble.png",
      "/images/sorting-visualizer/merge.png",
      "/images/sorting-visualizer/quick.png"
    ]
  },
  {
    slug: "cloud-image-processor-api",
    title: "Cloud Image Processor API",
    short:
      "A cloud-style media processing backend with async thumbnail generation, object storage, background workers, and containerized infrastructure.",
    bullets: [
      "Built a FastAPI backend for image uploads, metadata storage, and retrieval through REST endpoints.",
      "Separated object storage from relational metadata using S3-compatible storage for originals and processed variants.",
      "Implemented asynchronous thumbnail generation with Redis and RQ workers.",
      "Containerized the API, worker, Redis, and Postgres services with Docker Compose to simulate a production-style cloud environment."
    ],
    stack: ["FastAPI", "Postgres", "Redis", "RQ", "Docker", "S3"],
    links: {
      detail: "/projects/cloud-image-processor-api",
      repo: "https://github.com/SkutM/cloud-image-processor-api",
      live: ""
    },
    heroImage: "/images/cloudimage/cloudimgport01.png",
  }
];
