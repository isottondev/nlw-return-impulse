import { ArrowLeft, Camera } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { FeedbackType, FeedbackTypes } from "..";
import { api } from "../../../libs/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackTypeRestart: () => void;
  onFeedbackSent: () => void;
}
export function FeedbackContentStep({
  feedbackType,
  onFeedbackTypeRestart,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const feedbackTypeInfo = FeedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSending(true);
    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <React.Fragment>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => onFeedbackTypeRestart()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            alt={feedbackTypeInfo.image.alt}
            src={feedbackTypeInfo.image.src}
          />
          {feedbackTypeInfo.tittle}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(ev) => setComment(ev.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment === null || comment.length === 0 || isSending}
          >
            {!isSending ? "Enviar feedback" : <Loading />}
          </button>
        </footer>
      </form>
    </React.Fragment>
  );
}
