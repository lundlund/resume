import React from "react";

/**
 * Dummy brandnavne – byt til rigtige når du har dem.
 * Du kan også skifte til <img src="/logos/nike.svg" alt="Nike" />
 * (se kommenteret kode længere nede).
 */
const BRANDS = [
  "Louis Nielsen", "Netto", "TDC Koncern", "WebEyes", "Frederikssund Festival", "BSF Fodbold", "DBU",
  "Dansk Metal",
];

type Props = {
  title?: string;
  subtitle?: string;
};

export default function BrandCloud({
  title,
  subtitle = "During my career I’ve had the pleasure to work with these fine brands",
}: Props) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Diskret top-linje som i eksemplet */}
        <div className="h-px w-full bg-neutral-200/70 mb-6 sm:mb-8" />

        {title && (
          <h2 className="text-center text-xl font-semibold tracking-tight">
            {title}
          </h2>
        )}

        <p className="text-center text-sm text-neutral-500">
          {subtitle}
        </p>

        <ul
          className="
            mt-6 sm:mt-8
            grid place-items-center
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4
            gap-x-8 gap-y-10 sm:gap-y-12
          "
        >
          {BRANDS.map((name) => (
            <li
              key={name}
              className="opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              {/* TEXT-LOGO VARIANT (dummy) */}
              <div className="h-8 sm:h-9 flex items-center">
                <span
                  aria-hidden
                  className="
                    select-none whitespace-nowrap
                    text-neutral-400
                    font-semibold tracking-wide
                    uppercase
                    text-sm sm:text-base
                  "
                >
                  {name}
                </span>
                <span className="sr-only">{name}</span>
              </div>

              {/*
              // IMAGE-LOGO VARIANT (når du har rigtige filer):
              <img
                src={`/logos/${slugify(name)}.svg`}
                alt={name}
                className="h-8 sm:h-9 w-auto object-contain opacity-70 grayscale hover:opacity-100 transition"
                loading="lazy"
              />
              */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Hvis du vil bruge image-varianten, kan du bruge denne lille helper:
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
*/
