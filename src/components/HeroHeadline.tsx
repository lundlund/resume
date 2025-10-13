// src/components/HeroHeadline.tsx
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import Highlighter from "@/components/Highlighter";

export default function HeroHeadline() {
  // Hook'en sørger for re-render når sproget skifter
  useTranslation(); // eslint-disable-line react-hooks/rules-of-hooks

  return (
    <h1 className="heading-xl font-sans whitespace-pre-line">
      <Trans
        ns="common"
        i18nKey="hero.headline"
        components={{
          hi1: <Highlighter>{""}</Highlighter>,                 // value / værdi
          hi2: <Highlighter>{""}</Highlighter>,                 // customer / kunde
          emlite: <span className="font-medium not-italic" />   // artificial/and → uden kursiv
        }}
        defaults={`Creating <hi1>value</hi1> across
<emlite>artificial</emlite>
intelligence <emlite>and</emlite>
true <hi2>customer</hi2> experience.`}
      />
    </h1>
  );
}
