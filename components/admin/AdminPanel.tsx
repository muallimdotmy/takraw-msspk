"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/types";

const STORAGE_KEY = "msspk_admin_password";

type TabId =
  | "event"
  | "embeds"
  | "links"
  | "stats"
  | "gallery"
  | "footer"
  | "nav";

const TABS: { id: TabId; label: string }[] = [
  { id: "event", label: "Event" },
  { id: "embeds", label: "Embeds" },
  { id: "links", label: "Pautan" },
  { id: "stats", label: "Stats" },
  { id: "gallery", label: "Galeri" },
  { id: "footer", label: "Footer" },
  { id: "nav", label: "Nav" },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-[11px] text-muted/80">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-card-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary";

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [tab, setTab] = useState<TabId>("event");
  const [status, setStatus] = useState<{
    type: "ok" | "err" | "warn";
    text: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadConfig = useCallback(async (pwd: string) => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/config", {
        headers: { "x-admin-password": pwd },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Gagal muat config");
      }
      setConfig(data.config as SiteConfig);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pwd);
    } catch (e) {
      setAuthed(false);
      setConfig(null);
      setLoginError(e instanceof Error ? e.message : "Ralat");
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void loadConfig(saved);
    }
  }, [loadConfig]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setLoginError(data.error || "Kata laluan salah");
      return;
    }
    await loadConfig(password);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setConfig(null);
    setPassword("");
    setStatus(null);
  }

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    setStatus(null);
    const pwd = sessionStorage.getItem(STORAGE_KEY) || password;
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": pwd,
        },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Gagal simpan");
      }
      if (data.saved) {
        setStatus({ type: "ok", text: data.message || "Berjaya disimpan." });
        if (data.config) setConfig(data.config);
      } else if (data.download) {
        setStatus({
          type: "warn",
          text:
            data.warning ||
            "Tidak dapat tulis fail. JSON dimuat turun — commit ke repo.",
        });
        const blob = new Blob([data.download], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "site-config.json";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      setStatus({
        type: "err",
        text: e instanceof Error ? e.message : "Ralat simpan",
      });
    } finally {
      setSaving(false);
    }
  }

  function updateEvent<K extends keyof SiteConfig["event"]>(
    key: K,
    value: SiteConfig["event"][K],
  ) {
    setConfig((c) =>
      c ? { ...c, event: { ...c.event, [key]: value } } : c,
    );
  }

  if (!authed || !config) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-2xl border border-card-border bg-card p-6 shadow-xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-extrabold">Setting laman</h1>
          <p className="mt-2 text-sm text-muted">
            Sunting <code className="text-accent">site-config.json</code> tanpa
            edit kod. Lalai local:{" "}
            <code className="text-accent">msspk2026</code>
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Field label="Kata laluan">
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Field>
            {loginError ? (
              <p className="text-sm text-red-400">{loginError}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white transition hover:bg-primary-glow disabled:opacity-60"
            >
              {loading ? "Memuat…" : "Log masuk"}
            </button>
          </form>
          <a
            href="/"
            className="mt-4 block text-center text-sm text-muted hover:text-accent"
          >
            ← Kembali ke laman
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            Setting site config
          </h1>
          <p className="mt-1 text-sm text-muted">
            Disimpan ke{" "}
            <code className="text-accent">content/site-config.json</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-card-border px-4 py-2 text-sm font-semibold hover:border-primary"
          >
            Lihat laman
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-card-border px-4 py-2 text-sm font-semibold text-muted hover:border-red-500/50 hover:text-red-300"
          >
            Log keluar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary-glow disabled:opacity-60"
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </header>

      {status ? (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
            status.type === "ok"
              ? "border-primary/40 bg-primary/10 text-primary-glow"
              : status.type === "warn"
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-red-500/40 bg-red-500/10 text-red-300"
          }`}
        >
          {status.text}
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
              tab === t.id
                ? "bg-accent text-background"
                : "border border-card-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-card-border bg-card p-4 sm:p-6">
        {tab === "event" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama penuh">
              <input
                className={inputClass}
                value={config.event.name}
                onChange={(e) => updateEvent("name", e.target.value)}
              />
            </Field>
            <Field label="Nama pendek">
              <input
                className={inputClass}
                value={config.event.shortName}
                onChange={(e) => updateEvent("shortName", e.target.value)}
              />
            </Field>
            <Field label="Tahun">
              <input
                type="number"
                className={inputClass}
                value={config.event.year}
                onChange={(e) =>
                  updateEvent("year", Number(e.target.value) || 0)
                }
              />
            </Field>
            <Field label="Tarikh paparan">
              <input
                className={inputClass}
                value={config.event.dates}
                onChange={(e) => updateEvent("dates", e.target.value)}
              />
            </Field>
            <Field label="startDate (ISO)">
              <input
                className={inputClass}
                value={config.event.startDate}
                onChange={(e) => updateEvent("startDate", e.target.value)}
              />
            </Field>
            <Field label="endDate (ISO)">
              <input
                className={inputClass}
                value={config.event.endDate}
                onChange={(e) => updateEvent("endDate", e.target.value)}
              />
            </Field>
            <Field label="Venue ringkas">
              <input
                className={inputClass}
                value={config.event.venue}
                onChange={(e) => updateEvent("venue", e.target.value)}
              />
            </Field>
            <Field label="Status label (badge)">
              <input
                className={inputClass}
                value={config.event.statusLabel}
                onChange={(e) => updateEvent("statusLabel", e.target.value)}
              />
            </Field>
            <Field label="Venue penuh" hint="Alamat lengkap">
              <textarea
                className={`${inputClass} min-h-[72px]`}
                value={config.event.venueFull}
                onChange={(e) => updateEvent("venueFull", e.target.value)}
              />
            </Field>
            <Field label="Penganjur">
              <input
                className={inputClass}
                value={config.event.organizer}
                onChange={(e) => updateEvent("organizer", e.target.value)}
              />
            </Field>
            <Field label="Status (kod)">
              <input
                className={inputClass}
                value={config.event.status}
                onChange={(e) => updateEvent("status", e.target.value)}
              />
            </Field>
          </div>
        )}

        {tab === "embeds" && (
          <div className="grid gap-4">
            <Field
              label="YouTube embed (majlis penutup)"
              hint="Format: https://www.youtube.com/embed/VIDEO_ID"
            >
              <input
                className={inputClass}
                value={config.embeds.youtube.majlisPenutup}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: {
                      ...config.embeds,
                      youtube: { majlisPenutup: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="Jadual U12 (Sheets pubhtml)" hint="Kosong = placeholder">
              <input
                className={inputClass}
                value={config.embeds.jadual.u12}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: {
                      ...config.embeds,
                      jadual: { ...config.embeds.jadual, u12: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="Jadual U15">
              <input
                className={inputClass}
                value={config.embeds.jadual.u15}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: {
                      ...config.embeds,
                      jadual: { ...config.embeds.jadual, u15: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="Jadual U18">
              <input
                className={inputClass}
                value={config.embeds.jadual.u18}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: {
                      ...config.embeds,
                      jadual: { ...config.embeds.jadual, u18: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="Keputusan (Sheets/Docs)">
              <input
                className={inputClass}
                value={config.embeds.keputusan}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: { ...config.embeds, keputusan: e.target.value },
                  })
                }
              />
            </Field>
            <Field
              label="Buku program (Drive preview)"
              hint="https://drive.google.com/file/d/ID/preview"
            >
              <input
                className={inputClass}
                value={config.embeds.bukuProgram}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: { ...config.embeds, bukuProgram: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Google Maps embed src">
              <textarea
                className={`${inputClass} min-h-[72px] font-mono text-xs`}
                value={config.embeds.maps}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    embeds: { ...config.embeds, maps: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        )}

        {tab === "links" && (
          <div className="grid gap-4">
            {(
              [
                ["youtube", "YouTube (tab baharu)"],
                ["mapsExternal", "Google Maps"],
                ["waze", "Waze"],
                ["legacySite", "Laman lama (Google Sites)"],
                ["bukuProgramAnyflip", "AnyFlip buku program"],
              ] as const
            ).map(([key, label]) => (
              <Field key={key} label={label}>
                <input
                  className={inputClass}
                  value={config.links[key]}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      links: { ...config.links, [key]: e.target.value },
                    })
                  }
                />
              </Field>
            ))}
          </div>
        )}

        {tab === "stats" && (
          <div className="space-y-4">
            {config.stats.map((stat, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl border border-card-border bg-surface/50 p-3 sm:grid-cols-3"
              >
                <Field label="Label">
                  <input
                    className={inputClass}
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...config.stats];
                      stats[i] = { ...stats[i], label: e.target.value };
                      setConfig({ ...config, stats });
                    }}
                  />
                </Field>
                <Field label="Nilai">
                  <input
                    className={inputClass}
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...config.stats];
                      stats[i] = { ...stats[i], value: e.target.value };
                      setConfig({ ...config, stats });
                    }}
                  />
                </Field>
                <Field label="Hint">
                  <input
                    className={inputClass}
                    value={stat.hint}
                    onChange={(e) => {
                      const stats = [...config.stats];
                      stats[i] = { ...stats[i], hint: e.target.value };
                      setConfig({ ...config, stats });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-4">
            {config.gallery.map((item, i) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-xl border border-card-border bg-surface/50 p-3"
              >
                <Field label="Tajuk">
                  <input
                    className={inputClass}
                    value={item.title}
                    onChange={(e) => {
                      const gallery = [...config.gallery];
                      gallery[i] = { ...gallery[i], title: e.target.value };
                      setConfig({ ...config, gallery });
                    }}
                  />
                </Field>
                <Field label="Deskripsi">
                  <input
                    className={inputClass}
                    value={item.description}
                    onChange={(e) => {
                      const gallery = [...config.gallery];
                      gallery[i] = {
                        ...gallery[i],
                        description: e.target.value,
                      };
                      setConfig({ ...config, gallery });
                    }}
                  />
                </Field>
                <Field label="Pautan (href)">
                  <input
                    className={inputClass}
                    value={item.href}
                    onChange={(e) => {
                      const gallery = [...config.gallery];
                      gallery[i] = { ...gallery[i], href: e.target.value };
                      setConfig({ ...config, gallery });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {tab === "footer" && (
          <div className="grid gap-4">
            <Field label="Kredit">
              <input
                className={inputClass}
                value={config.footer.credit}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    footer: { ...config.footer, credit: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Nota">
              <textarea
                className={`${inputClass} min-h-[88px]`}
                value={config.footer.note}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    footer: { ...config.footer, note: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        )}

        {tab === "nav" && (
          <div className="space-y-3">
            <p className="text-xs text-muted">
              Item navigasi (href + label). Biasanya anchor #seksyen.
            </p>
            {config.nav.map((item, i) => (
              <div key={i} className="grid gap-3 sm:grid-cols-2">
                <Field label="Href">
                  <input
                    className={inputClass}
                    value={item.href}
                    onChange={(e) => {
                      const nav = [...config.nav];
                      nav[i] = { ...nav[i], href: e.target.value };
                      setConfig({ ...config, nav });
                    }}
                  />
                </Field>
                <Field label="Label">
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) => {
                      const nav = [...config.nav];
                      nav[i] = { ...nav[i], label: e.target.value };
                      setConfig({ ...config, nav });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary-glow disabled:opacity-60"
        >
          {saving ? "Menyimpan…" : "Simpan perubahan"}
        </button>
      </div>
    </div>
  );
}
