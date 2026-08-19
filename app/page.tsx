"use client";

import { useMemo, useState } from "react";
import JSZip from "jszip";

type TreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
};

const EXAMPLE = `coldforge/                      # Nombre del proyecto
├── backend/                    # API y lógica del servidor
│   ├── src/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── auth/
│   │   │   │   ├── domains/
│   │   │   │   ├── mailboxes/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── analytics/
│   │   │   │   ├── settings/
│   │   │   │   └── health/
│   │   ├── core/
│   │   │   ├── smtp/
│   │   │   │   ├── client.js
│   │   │   │   ├── queue.js
│   │   │   │   └── validator.js
│   │   │   ├── dns/
│   │   │   │   ├── spf.js
│   │   │   │   ├── dkim.js
│   │   │   │   └── dmarc.js
│   │   │   └── database/
│   │   │       ├── models/
│   │   │       └── migrations/
│   │   ├── services/
│   │   │   ├── cloudflare.js
│   │   │   ├── namecheap.js
│   │   │   └── hostinger.js
│   │   ├── workers/
│   │   │   ├── sender.js
│   │   │   ├── cleaner.js
│   │   │   └── reporter.js
│   │   └── config/
│   │       ├── index.js
│   │       ├── database.js
│   │       └── smtp.js
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── dashboard/
│   │   │   ├── domains/
│   │   │   └── common/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── nginx.conf
│
├── infra/
│   ├── docker-compose.yml
│   ├── kubernetes/
│   └── scripts/
│
├── docs/
│   ├── api/
│   ├── deployment/
│   └── user-guide/
│
└── README.md`;

function cleanName(value: string) {
  return value
    .replace(/#.*$/, "")
    .replace(/[│├└─]/g, "")
    .trim();
}

function parseTree(input: string): TreeNode[] {
  const lines = input.split("\n");
  const nodes: TreeNode[] = [];
  const stack: { depth: number; path: string }[] = [];

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;

    const line = rawLine.replace(/\t/g, "    ");

    const match = line.match(/^(\s*)(?:├──|└──|\|--|`--)?\s*(.*)$/);

    if (!match) continue;

    const spaces = match[1].length;
    const rawName = match[2];
    const name = cleanName(rawName);

    if (!name) continue;

    const depth = Math.floor(spaces / 4);

    while (stack.length && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    const parentPath =
      stack.length > 0 ? stack[stack.length - 1].path : "";

    const path = parentPath ? `${parentPath}/${name}` : name;

    const isFolder =
      name.endsWith("/") ||
      rawLine.trimEnd().endsWith("/") ||
      !/\.[a-zA-Z0-9]+$/.test(name);

    nodes.push({
      name: name.replace(/\/$/, ""),
      path,
      type: isFolder ? "folder" : "file",
    });

    if (isFolder) {
      stack.push({
        depth,
        path,
      });
    }
  }

  return nodes;
}

export default function Home() {
  const [structure, setStructure] = useState(EXAMPLE);
  const [projectName, setProjectName] = useState("coldforge");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const nodes = useMemo(() => parseTree(structure), [structure]);

  const folders = nodes.filter((node) => node.type === "folder");
  const files = nodes.filter((node) => node.type === "file");

  const rootName = useMemo(() => {
    const first = nodes[0]?.name;

    if (!first) return projectName;

    return first.replace(/\/$/, "");
  }, [nodes, projectName]);

  function handleExample() {
    setStructure(EXAMPLE);
    setProjectName("coldforge");
    setGenerated(false);
  }

  function handleClear() {
    setStructure("");
    setGenerated(false);
  }

  async function generateZip() {
    if (!nodes.length) return;

    setIsGenerating(true);

    try {
      const zip = new JSZip();

      for (const node of nodes) {
        let relativePath = node.path;

        // Replace root project name with user's selected name
        if (rootName) {
          relativePath = relativePath.replace(
            new RegExp(`^${rootName}`),
            projectName || rootName
          );
        }

        if (node.type === "folder") {
          zip.folder(relativePath);
        } else {
          zip.file(relativePath, "");
        }
      }

      // Helpful metadata
      zip.file(
        `${projectName || rootName}/.scaffold.json`,
        JSON.stringify(
          {
            generator: "ScaffoldForge",
            project: projectName || rootName,
            folders: folders.length,
            files: files.length,
            generatedAt: new Date().toISOString(),
          },
          null,
          2
        )
      );

      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${projectName || rootName}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#09090b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-black text-black">
              SF
            </div>

            <div>
              <h1 className="font-mono text-lg font-bold">
                ScaffoldForge
              </h1>

              <p className="text-xs text-zinc-500">
                Project structure generator
              </p>
            </div>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 sm:block">
            Paste → Preview → Download
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Developer Tool
          </div>

          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Turn your project tree into a{" "}
            <span className="text-emerald-400">ready-to-use template.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Paste a directory structure and ScaffoldForge automatically
            creates the folders and files, then packages everything into a
            downloadable ZIP.
          </p>
        </section>

        {/* Project settings */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Project name
              </label>

              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm outline-none transition focus:border-emerald-500"
                placeholder="my-project"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExample}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
              >
                Example
              </button>

              <button
                onClick={handleClear}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* Editor */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 className="font-semibold">Project Structure</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Paste your tree structure
                </p>
              </div>

              <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-500">
                TREE
              </span>
            </div>

            <textarea
              value={structure}
              onChange={(e) => {
                setStructure(e.target.value);
                setGenerated(false);
              }}
              spellCheck={false}
              className="h-[620px] w-full resize-none bg-[#080809] p-5 font-mono text-xs leading-6 text-zinc-300 outline-none"
              placeholder={`my-project/
├── src/
│   ├── index.js
│   └── utils/
├── tests/
└── README.md`}
            />
          </div>

          {/* Preview */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 className="font-semibold">Preview</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Generated project structure
                </p>
              </div>

              <div className="flex gap-2">
                <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                  {folders.length} folders
                </span>

                <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[10px] text-blue-400">
                  {files.length} files
                </span>
              </div>
            </div>

            <div className="h-[620px] overflow-auto bg-[#080809] p-5">
              {nodes.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-zinc-600">
                  Your project preview will appear here.
                </div>
              ) : (
                <div className="font-mono text-xs leading-7">
                  {nodes.map((node, index) => {
                    const depth = node.path.split("/").length - 1;

                    return (
                      <div
                        key={`${node.path}-${index}`}
                        style={{
                          paddingLeft: `${depth * 22}px`,
                        }}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={
                            node.type === "folder"
                              ? "text-amber-400"
                              : "text-zinc-500"
                          }
                        >
                          {node.type === "folder" ? "▾" : "·"}
                        </span>

                        <span
                          className={
                            node.type === "folder"
                              ? "text-zinc-200"
                              : "text-zinc-400"
                          }
                        >
                          {node.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Action */}
        <section className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row">
          <div>
            <p className="font-medium">Ready to generate?</p>

            <p className="mt-1 text-sm text-zinc-500">
              {folders.length} folders and {files.length} files will be
              created.
            </p>
          </div>

          <button
            onClick={generateZip}
            disabled={!nodes.length || isGenerating}
            className="w-full rounded-xl bg-emerald-500 px-7 py-3.5 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {isGenerating ? "Generating..." : "Generate & Download ZIP"}
          </button>
        </section>

        {generated && (
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
            Project generated successfully. Your ZIP file is ready.
          </div>
        )}

        {/* Features */}
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Paste any structure",
              "Use the familiar tree format you already use in documentation and architecture plans.",
            ],
            [
              "02",
              "Instant preview",
              "See folders and files before generating your project.",
            ],
            [
              "03",
              "Download ZIP",
              "Generate a real project structure directly in your browser.",
            ],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-5 font-mono text-sm text-emerald-400">
                {number}
              </div>

              <h3 className="font-semibold">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-zinc-600">
          ScaffoldForge — Build your project structure faster.
        </footer>
      </div>
    </main>
  );
}