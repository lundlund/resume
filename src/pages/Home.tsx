import React from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import HeroHeadline from "@/components/HeroHeadline";
import BrandCloud from "@/components/BrandCloud";
import { useTranslation } from "react-i18next";
import SkillsShowcase from "@/components/SkillsShowcase";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <HeroHeadline />
            <div className="mt-8 flex gap-3">
              <Button as="a" href="/blog">{t("home.cta.blog", { defaultValue: "Se blog" })}</Button>
              <Button as="a" variant="ghost" href="/contact">{t("home.cta.contact", { defaultValue: "Kontakt" })}</Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/3] rounded-2xl overflow-hidden border border-black/5 bg-[#ddd]">
              <img
                src="/img/lundimg2.jpg"
                alt={t("home.heroAlt", { defaultValue: "Portræt" })}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>
       <SkillsShowcase />

      {/* BrandCloud i bunden – tekst via i18n */}
      <BrandCloud
        subtitle={t("home.brandSubtitle", {
          defaultValue:
            "Gennem min karriere har jeg haft fornøjelsen af at arbejde med disse brands",
        })}
      />
    </main>
  );
}
