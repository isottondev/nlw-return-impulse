import { Popover } from "@headlessui/react";
import { ChatTeardropDots } from "phosphor-react";
import { WidgetForm } from "./WidgetForm";

export function Widget() {
  return (
    <Popover className="absolute bottom-8 right-8 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="flex items-center bg-brand-500 rounded-full px-3 h-12 group">
        <ChatTeardropDots className="w-6 h-6 text-white" />
        <span className=" max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="text-white pl-2">Feedback</span>
        </span>
      </Popover.Button>
    </Popover>
  );
}
