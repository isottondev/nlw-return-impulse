import { Popover } from "@headlessui/react";
import { ChatTeardropDots } from "phosphor-react";
import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import otherImageUrl from "../../assets/other.svg";
import React, { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const FeedbackTypes = {
  BUG: {
    tittle: "Problema",
    image: {
      src: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    tittle: "Ideia",
    image: {
      src: ideaImageUrl,
      alt: "Imagem de uma lampada",
    },
  },
  OTHER: {
    tittle: "Outro",
    image: {
      src: otherImageUrl,
      alt: "Imagem de uma nuvem de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof FeedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function onFeedbackTypeRestart() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackTypeRestart={onFeedbackTypeRestart} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackTypeRestart={onFeedbackTypeRestart}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito por
        <a
          href="https://isodev.com.br"
          className="underline underline-offset-2 pl-1"
          target="_blank"
        >
          ISODEV
        </a>
      </footer>
    </div>
  );
}
