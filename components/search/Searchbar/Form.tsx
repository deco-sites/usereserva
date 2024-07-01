/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { Suggestion } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { asResolved, Resolved } from "deco/mod.ts";
import { useId } from "../../../sdk/useId.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../sdk/useUI.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";

// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que você procura?
   */
  placeholder?: string;

  /** @description Loader para rodar sugestões de novos elementos */
  loader?: Resolved<Suggestion | null>;
}

const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      globalThis.window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });

  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as
        | HTMLInputElement
        | null;

      if (input) {
        input.checked = true;

        document.getElementById(formId)?.focus();
      }
    }
  });
};

const Suggestions = import.meta.resolve("./Suggestions.tsx");

export default function Searchbar(
  { placeholder = "O que você procura?", loader }: SearchbarProps,
) {
  const slot = useId();

  return (
    <div class="w-full gap-8 xl:max-w-[276px] relative h-8">
      <form
        id={SEARCHBAR_INPUT_FORM_ID}
        action={ACTION}
        class="join w-full h-full"
      >
        <button
          type="submit"
          class="bg-transparent no-animation absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          <Icon
            class="inline [.htmx-request_&]:hidden group-has-[li:hover]/header:text-black group-has-[#menu:checked]/header:text-black group-has-[#header-transparent:checked]/header:text-white"
            id="MagnifyingGlass"
            size={24}
            strokeWidth={0.01}
          />
        </button>
        <input
          autofocus
          tabIndex={0}
          class="px-3 placeholder:text-sm placeholder:font-light  placeholder:text-black group-has-[li:hover]/header:bg-white group-has-[li:hover]/header:text-black group-has-[li:hover]/header:placeholder:text-black group-has-[#menu:checked]/header:text-black group-has-[#menu:checked]/header:bg-white group-has-[#menu:checked]/header:placeholder:text-black group-has-[#header-transparent:checked]/header:[background:_hsla(0,_0%,_100%,_.3)] group-has-[#header-transparent:checked]/header:placeholder:text-white group-has-[#header-transparent:checked]/header:text-white border-[0.4px] border-[#DEDEDE] focus:outline-none flex-grow rounded-full h-full"
          name={NAME}
          placeholder={placeholder}
          autocomplete="off"
          hx-target={`#${slot}`}
          hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
          })}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        />
        {
          /* <label
          type="button"
          class="join-item btn btn-ghost btn-square hidden sm:inline-flex"
          for={SEARCHBAR_POPUP_ID}
          aria-label="Toggle searchbar"
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </label> */
        }
      </form>

      {/* Suggestions slot */}
      <div id={slot} />

      {/* Send search events as the user types */}
      <script
        defer
        src={scriptAsDataURI(
          script,
          SEARCHBAR_INPUT_FORM_ID,
          NAME,
          SEARCHBAR_POPUP_ID,
        )}
      />
    </div>
  );
}
