import React from "react";
import { CloseButton } from "../../CloseButton";
import doneImageUrl from "../../../assets/done.svg";

interface FeedbackSuccessStepProps {
  onFeedbackTypeRestart: () => void;
}
export function FeedbackSuccessStep({
  onFeedbackTypeRestart,
}: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 min-w-[304px]">
        <img
          alt={"Confirmação de sucesso"}
          src={doneImageUrl}
          height={48}
          width={41}
        />
        <span className="text-xl mt-2">Agradecemos o feedback</span>
        <button
          onClick={() => onFeedbackTypeRestart()}
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}
