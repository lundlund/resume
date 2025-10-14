// src/pages/Contact.tsx
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import Highlighter from "@/components/Highlighter";
import TrustBadges from "@/components/TrustBadges";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const { t } = useTranslation();

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    orgType: "",
    solutions: [] as string[],
    message: "",
    "bot-field": "",
  });

  const onChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleSolution = (value: string) =>
    setForm((f) => ({
      ...f,
      solutions: f.solutions.includes(value)
        ? f.solutions.filter((v) => v !== value)
        : [...f.solutions, value],
    }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError(t("contact.errors.fillAllBasic", { defaultValue: "Udfyld venligst navn og email." }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t("contact.errors.email", { defaultValue: "Indtast en gyldig e-mailadresse." }));
      return;
    }
    if (form.solutions.length === 0) {
      setError(t("contact.errors.solutions", { defaultValue: "Vælg mindst én løsning." }));
      return;
    }

    setStatus("submitting");
    try {
      const payload: Record<string, string> = {
        "form-name": "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        budget: form.budget,
        orgType: form.orgType,
        solutions: form.solutions.join(", "),
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
      setForm({
        name: "",
        email: "",
        phone: "",
        budget: "",
        orgType: "",
        solutions: [],
        message: "",
        "bot-field": "",
      });
    } catch {
      setStatus("error");
      setError(t("contact.error", { defaultValue: "Noget gik galt under afsendelse. Prøv igen om lidt." }));
    }
  }

  const budgetOptions = [
    { value: "<10k", label: t("contact.budget.lt10", { defaultValue: "Mindre end 10k" }) },
    { value: "<30k", label: t("contact.budget.lt30", { defaultValue: "Mindre end 30k" }) },
    { value: "<50k", label: t("contact.budget.lt50", { defaultValue: "Mindre end 50k" }) },
    { value: "<100k", label: t("contact.budget.lt100", { defaultValue: "Mindre end 100k" }) },
    { value: ">100k", label: t("contact.budget.gt100", { defaultValue: "Mere end 100k" }) },
  ];

  const orgTypes = [
    { value: "business", label: t("contact.org.business", { defaultValue: "Virksomhed" }) },
    { value: "ngo", label: t("contact.org.ngo", { defaultValue: "Forening" }) },
    { value: "public", label: t("contact.org.public", { defaultValue: "Offentlig" }) },
    { value: "other", label: t("contact.org.other", { defaultValue: "Andet" }) },
  ];

  const solutionItems = [
    { value: "AI Strategy", label: t("contact.solutions.strategy", { defaultValue: "AI Strategi" }) },
    { value: "Local RAG", label: t("contact.solutions.rag", { defaultValue: "Lokal RAG" }) },
    { value: "Custom Agents", label: t("contact.solutions.agents", { defaultValue: "Tilpassede AI Agenter" }) },
    { value: "Onboarding", label: t("contact.solutions.onboarding", { defaultValue: "Onboarding" }) },
    { value: "GPT Solutions", label: t("contact.solutions.gpt", { defaultValue: "GPT Løsninger" }) },
    { value: "Data Training", label: t("contact.solutions.training", { defaultValue: "Data Træning" }) },
    { value: "AI Hardware", label: t("contact.solutions.hardware", { defaultValue: "AI Hardware" }) },
    { value: "Local LLM", label: t("contact.solutions.localLlm", { defaultValue: "Lokal LLM Opsætning" }) },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* VENSTRE: hero-tekst + TRUST BADGES NEDERST */}
        <section aria-labelledby="contact-hero" className="space-y-6 md:h-full md:flex md:flex-col md:justify-center">
          <div>
            <h1
              id="contact-hero"
              className="text-3xl sm:text-5xl md:text-5xl font-semibold leading-[1.05] tracking-tight whitespace-pre-line"
            >
              <Trans
                i18nKey="contact.hero"
                components={{
                  hi1: <Highlighter>{""}</Highlighter>,
                  hi2: <Highlighter>{""}</Highlighter>,
                  hi3: <Highlighter>{""}</Highlighter>,
                  emlite: <span className="font-medium not-italic" />,
                }}
                defaults={`Creating <hi1>value</hi1> across
<emlite>artificial</emlite>
intelligence <emlite>and</emlite>
true <hi3>customer</hi3> experience.`}
              />
            </h1>

            <p className="mt-6 text-lg text-neutral-700 leading-7">
              {t("contact.intro", {
                defaultValue:
                  "Jeg omsætter strategi til produkter med kort vej fra idé til prototype—og videre til drift. Fokus på klare mål, brugeroplevelse og målbar effekt.",
              })}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:you@example.com"
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
              >
                {t("contact.emailCta", { defaultValue: "Email" })}
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

            {/* TRUST BADGES PÅ VENSTRE SIDE */}
            <TrustBadges className="mt-8 md:mt-10" />
          </div>
        </section>

        {/* HØJRE: FORM */}
        <section aria-labelledby="contact-form-title" className="max-w-md w-full md:justify-self-end">
          <h2 id="contact-form-title" className="sr-only">
            {t("contact.formTitle", { defaultValue: "Kontaktformular" })}
          </h2>

          {status === "success" && (
            <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-green-900" role="status" aria-live="polite">
              {t("contact.thanks", { defaultValue: "Tak for din besked! Jeg vender tilbage snarest." })}
            </div>
          )}

          {status === "error" && error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-900" role="alert" aria-live="assertive">
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
                {t("contact.honeypotLabel", { defaultValue: "Lad dette felt stå tomt:" })}{" "}
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
              <span className="text-sm">{t("contact.name", { defaultValue: "Navn" })}</span>
              <input
                name="name"
                required
                value={form.name}
                onChange={onChange("name")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder={t("contact.namePh", { defaultValue: "Dit navn" })}
              />
            </label>

            <label className="block">
              <span className="text-sm">{t("contact.email", { defaultValue: "Email" })}</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange("email")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder={t("contact.emailPh", { defaultValue: "dig@eksempel.dk" })}
              />
            </label>

            <label className="block">
              <span className="text-sm">{t("contact.phone", { defaultValue: "Telefonnummer" })}</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange("phone")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder={t("contact.phonePh", { defaultValue: "+45 12 34 56 78" })}
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm">{t("contact.budget.label", { defaultValue: "Budget" })}</span>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={onChange("budget")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                >
                  <option value="">{t("contact.budget.placeholder", { defaultValue: "Vælg budget" })}</option>
                  {budgetOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm">{t("contact.org.label", { defaultValue: "Organisationstype" })}</span>
                <select
                  name="orgType"
                  value={form.orgType}
                  onChange={onChange("orgType")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
                >
                  <option value="">{t("contact.org.placeholder", { defaultValue: "Vælg type" })}</option>
                  {orgTypes.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="border border-neutral-200 rounded-xl p-3">
              <legend className="px-1 text-sm text-neutral-700">
                {t("contact.solutions.label", { defaultValue: "Løsninger" })}
              </legend>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {solutionItems.map((s) => (
                  <label key={s.value} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="solutions"
                      value={s.value}
                      checked={form.solutions.includes(s.value)}
                      onChange={() => toggleSolution(s.value)}
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                    <span className="text-sm">{s.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm">{t("contact.message", { defaultValue: "Besked" })}</span>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange("message")}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder={t("contact.messagePh", { defaultValue: "Skriv din besked her…" })}
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50 disabled:opacity-60"
              >
                {status === "submitting"
                  ? t("cta.sending", { defaultValue: "Sender…" })
                  : t("cta.send", { defaultValue: "Send besked" })}
              </button>
              <span className="text-sm text-neutral-500">
                {t("contact.replyTime", { hours: 24, defaultValue: "Svarer typisk inden for 24 timer." })}
              </span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
