// src/pages/Contact.tsx
import { useState } from "react";
import Highlighter from "@/components/Highlighter";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    "bot-field": "",
  });

  const onChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Udfyld venligst alle felter.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Indtast en gyldig e-mailadresse.");
      return;
    }

    setStatus("submitting");
    try {
      const payload: Record<string, string> = {
        "form-name": "contact",
        name: form.name,
        email: form.email,
        message: form.message,
        "bot-field": form["bot-field"],
      };

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!res.ok) throw new Error(String(res.status));

      setStatus("success");
      setForm({ name: "", email: "", message: "", "bot-field": "" });
    } catch {
      setStatus("error");
      setError("Noget gik galt under afsendelse. Prøv igen om lidt.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* På desktop fylder rækkerne efter indholdets højde (formen er typisk højest).
          Vi gør venstre kolonne til flex + items-center + h-full, så teksten står midt i højden. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* VENSTRE: vertikalt centreret på desktop */}
        <section
          aria-labelledby="contact-hero"
          className="space-y-6 md:h-full md:flex md:items-center"
        >
          <div>
            <h1
              id="contact-hero"
              className="text-5xl sm:text-5xl md:text-5xl font-semibold leading-[1.05] tracking-tight"
            >
              Creating <Highlighter>value</Highlighter> across
              <br />
              artificial <Highlighter>intelligence</Highlighter> and
              <br />
              true <Highlighter>customer</Highlighter> experience.
            </h1>

            <p className="mt-6 text-lg text-neutral-700 leading-7">
              Jeg omsætter strategi til produkter med kort vej fra idé til
              prototype—og videre til drift. Fokus på klare mål, brugeroplevelse
              og målbar effekt.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:you@example.com"
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
              >
                Email
              </a>
              <a
                href="https://github.com/ditnavn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ditnavn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* HØJRE: FORM (uændret), smal og pænt placeret */}
        <section
          aria-labelledby="contact-form-title"
          className="max-w-md w-full md:justify-self-end"
        >
          <h2 id="contact-form-title" className="sr-only">
            Kontaktformular
          </h2>

          {status === "success" && (
            <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-green-900">
              Tak for din besked! Jeg vender tilbage snarest.
            </div>
          )}

          {status === "error" && error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-900">
              {error}
            </div>
          )}

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />

            <p className="hidden">
              <label>
                Lad dette felt stå tomt:{" "}
                <input
                  name="bot-field"
                  value={form["bot-field"]}
                  onChange={onChange("bot-field")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </p>

            <label className="block">
              <span className="text-sm">Navn</span>
              <input
                name="name"
                required
                value={form.name}
                onChange={onChange("name")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="Dit navn"
              />
            </label>

            <label className="block">
              <span className="text-sm">Email</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange("email")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="dig@eksempel.dk"
              />
            </label>

            <label className="block">
              <span className="text-sm">Besked</span>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={onChange("message")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="Skriv din besked her…"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50 disabled:opacity-60"
              >
                {status === "submitting" ? "Sender…" : "Send besked"}
              </button>
              <span className="text-sm text-neutral-500">
                Svarer typisk inden for 24 timer.
              </span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
