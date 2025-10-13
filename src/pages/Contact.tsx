// src/pages/Contact.tsx
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    // honeypot:
    "bot-field": "",
  });
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Simple client-validering
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
        "form-name": "contact", // skal matche stubben i index.html
        name: form.name,
        email: form.email,
        message: form.message,
        "bot-field": form["bot-field"], // honeypot
      };

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (!res.ok) throw new Error(`Netlify returnerede ${res.status}`);

      setStatus("success");
      setForm({ name: "", email: "", message: "", "bot-field": "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setError("Noget gik galt under afsendelse. Prøv igen om lidt.");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Kontakt</h1>

      {status === "success" && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-900">
          Tak for din besked! Jeg vender tilbage snarest.
        </div>
      )}

      {status === "error" && error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-900">
          {error}
        </div>
      )}

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        {/* Netlify kræver hidden form-name */}
        <input type="hidden" name="form-name" value="contact" />
        {/* Honeypot (skjult felt) */}
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
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
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
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            placeholder="dig@eksempel.dk"
          />
        </label>

        <label className="block">
          <span className="text-sm">Besked</span>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={onChange("message")}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            placeholder="Skriv din besked her…"
          />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50 disabled:opacity-60"
        >
          {status === "submitting" ? "Sender…" : "Send"}
        </button>
      </form>

      {/* Hvis du hellere vil lave full-page redirect efter submit:
          - Fjern onSubmit-handleren
          - Tilføj action="/success" på <form ...>
          - Lav en route/side på /success */}
    </main>
  );
}
