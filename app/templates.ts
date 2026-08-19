export type Template = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  tree: string;
};

export const templates: Template[] = [
  {
    id: "react-vite",
    name: "React + Vite",
    description: "Modern React app with Vite, TypeScript, and Tailwind CSS.",
    tags: ["react", "vite", "typescript", "frontend"],
    tree: `my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts`,
  },
  {
    id: "nextjs",
    name: "Next.js App Router",
    description: "Full-stack Next.js with App Router, server components, and API routes.",
    tags: ["nextjs", "react", "fullstack", "typescript"],
    tree: `my-app/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   ├── forms/
│   │   └── LoginForm.tsx
│   └── shared/
│       ├── Footer.tsx
│       └── Header.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── public/
│   ├── favicon.ico
│   └── images/
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md`,
  },
  {
    id: "express-api",
    name: "Express REST API",
    description: "Node.js REST API with Express, middleware, controllers, and database models.",
    tags: ["node", "express", "api", "backend", "typescript"],
    tree: `my-api/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── cors.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── postController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── validate.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── postRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── emailService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── helpers.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   │   └── auth.test.ts
│   └── integration/
│       └── users.test.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md`,
  },
  {
    id: "monorepo",
    name: "Monorepo (Turborepo)",
    description: "Turborepo monorepo with shared packages and multiple apps.",
    tags: ["monorepo", "turborepo", "typescript", "fullstack"],
    tree: `my-monorepo/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── public/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── mobile/
│   │   ├── src/
│   │   ├── android/
│   │   ├── ios/
│   │   ├── app.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── api/
│       ├── src/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/
│   │   ├── eslint/
│   │   │   └── eslint-config.js
│   │   ├── typescript/
│   │   │   └── base.json
│   │   └── package.json
│   └── utils/
│       ├── src/
│       │   ├── format.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md`,
  },
  {
    id: "python-fastapi",
    name: "Python FastAPI",
    description: "FastAPI project with Pydantic models, SQL, and tests.",
    tags: ["python", "fastapi", "api", "backend"],
    tree: `my-api/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   └── items.py
│   │   │   └── router.py
│   │   └── deps.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/
│   │   ├── user.py
│   │   └── item.py
│   ├── schemas/
│   │   ├── user.py
│   │   └── item.py
│   ├── services/
│   │   ├── user_service.py
│   │   └── item_service.py
│   ├── __init__.py
│   └── main.py
├── tests/
│   ├── test_auth.py
│   ├── test_users.py
│   └── conftest.py
├── alembic/
│   ├── versions/
│   └── env.py
├── .env.example
├── .gitignore
├── alembic.ini
├── pyproject.toml
├── requirements.txt
└── README.md`,
  },
  {
    id: "cli-tool",
    name: "CLI Tool (Node.js)",
    description: "Command-line tool with Commander.js, tests, and CI config.",
    tags: ["cli", "node", "typescript", "tool"],
    tree: `my-cli/
├── src/
│   ├── commands/
│   │   ├── init.ts
│   │   ├── build.ts
│   │   └── deploy.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── config.ts
│   │   └── prompts.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── tests/
│   ├── commands/
│   │   ├── init.test.ts
│   │   └── build.test.ts
│   └── utils/
│       └── config.test.ts
├── .github/
│   └── workflows/
│       └── release.yml
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE`,
  },
  {
    id: "flutter",
    name: "Flutter App",
    description: "Cross-platform Flutter app with BLoC state management.",
    tags: ["flutter", "dart", "mobile", "cross-platform"],
    tree: `my_app/
├── lib/
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_colors.dart
│   │   │   └── app_strings.dart
│   │   ├── theme/
│   │   │   └── app_theme.dart
│   │   └── utils/
│   │       └── helpers.dart
│   ├── data/
│   │   ├── models/
│   │   │   └── user.dart
│   │   ├── repositories/
│   │   │   └── user_repository.dart
│   │   └── services/
│   │       └── api_service.dart
│   ├── presentation/
│   │   ├── blocs/
│   │   │   ├── auth/
│   │   │   │   ├── auth_bloc.dart
│   │   │   │   ├── auth_event.dart
│   │   │   │   └── auth_state.dart
│   │   │   └── home/
│   │   │       ├── home_bloc.dart
│   │   │       ├── home_event.dart
│   │   │       └── home_state.dart
│   │   ├── pages/
│   │   │   ├── home_page.dart
│   │   │   ├── login_page.dart
│   │   │   └── splash_page.dart
│   │   └── widgets/
│   │       ├── custom_button.dart
│   │       └── loading_indicator.dart
│   ├── routes/
│   │   └── app_router.dart
│   ├── main.dart
│   └── app.dart
├── test/
│   ├── blocs/
│   │   └── auth_bloc_test.dart
│   └── widget_test.dart
├── android/
├── ios/
├── web/
├── .gitignore
├── analysis_options.yaml
├── pubspec.yaml
└── README.md`,
  },
  {
    id: "rust-cli",
    name: "Rust CLI",
    description: "Rust CLI with clap argument parsing and structured error handling.",
    tags: ["rust", "cli", "systems"],
    tree: `my-cli/
├── src/
│   ├── commands/
│   │   ├── mod.rs
│   │   ├── init.rs
│   │   └── build.rs
│   ├── error.rs
│   ├── logger.rs
│   ├── main.rs
│   └── utils.rs
├── tests/
│   ├── integration_test.rs
│   └── init_test.rs
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── Cargo.lock
├── Cargo.toml
├── README.md
└── LICENSE`,
  },
  {
    id: "docker-fullstack",
    name: "Docker Full-Stack",
    description: "Dockerized full-stack app with Nginx reverse proxy and PostgreSQL.",
    tags: ["docker", "fullstack", "devops", "nginx", "postgres"],
    tree: `my-project/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── app.js
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf
├── docker/
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
├── scripts/
│   ├── setup.sh
│   └── seed.sh
├── .env.example
├── .gitignore
└── README.md`,
  },
  {
    id: "blank",
    name: "Blank Slate",
    description: "Minimal starting point — just src, tests, and config files.",
    tags: ["minimal", "starter"],
    tree: `my-project/
├── src/
├── tests/
├── .gitignore
├── package.json
└── README.md`,
  },
];
