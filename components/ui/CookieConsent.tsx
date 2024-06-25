import { Cookie } from "std/http/mod.ts";
import { useId } from "../../sdk/useId.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    const setCookie = ({ name, value, path }: Cookie) => {
      document.cookie = `${name}=${value};path=${path};`;
    };

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept &&
        accept.addEventListener("click", () => {
          const consentValue = JSON.stringify({
            action: "accept",
            categories: "[]",
          });
          localStorage.setItem(KEY, ACCEPTED);
          elem.classList.add(HIDDEN);
          setCookie({
            name: "CookieScriptConsent",
            value: consentValue,
            path: "/",
          });
        });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface PolicyContent {
  /**
   * @description Texto que vai renderizar no botão de link.
   */
  text?: string;
  /**
   * @description URL do link.
   */
  link?: string;
}

export interface PolicyButtons {
  /**
   * @description Texto do botão de aceite
   * */
  allowText: string;
  /** @description Texto do botão de cancelar */
  cancelText?: string;
}

export interface Props {
  /** @title Título */
  /** @description Título do bloco dos cookies */
  title?: string;
  /** @title Descrição */
  /** @description Texto de descrição dos cookies */
  text?: string;
  /** @title Link da política de privacidade */
  policy?: PolicyContent;
  /** @title Botões */
  buttons?: PolicyButtons;
  /** @title Posição do bloco de cookies */
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
  };
}

const DEFAULT_PROPS = {
  title: "Cookies",
  text: "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  policy: {
    text: "Saiba mais sobre sobre política de privacidade",
    link: "/politica-de-privacidade",
  },
  buttons: {
    allowText: "Aceitar",
    cancelText: "Fechar",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
  },
};

function CookieConsent(props: Props) {
  const id = useId();
  const { title, text, policy, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 lg:bottom-2 w-screen z-50 lg:flex
          ${layout?.position === "Left" ? "lg:justify-start" : ""}
          ${layout?.position === "Center" ? "lg:justify-center" : ""}
          ${layout?.position === "Right" ? "lg:justify-end" : ""}
        `}
      >
        <div class="m-2 backdrop-blur">
          <div
            class={`
          flex flex-row px-4 py-2 items-center shadow-lg bg-base-100 opacity-85 rounded-lg
          ${
            !layout?.position || layout?.position === "Expanded"
              ? "lg:container lg:mx-auto"
              : `
            ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            ${
              !layout?.content || layout?.content === "Tiled"
                ? "lg:w-[520px]"
                : ""
            }
          `
          }
          ${
            !layout?.content || layout?.content === "Tiled" ? "lg:flex-row" : ""
          }
          
        `}
          >
            <div
              class={`flex-auto flex flex-col ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:gap-2"
                  : ""
              }`}
            >
              <h3 class="text-xs sm:text-sm">{title}</h3>
              {text && (
                <span class="text-xs sm:text-sm">
                  {text}
                  <a href={policy.link} class="link ml-1">
                    {policy.text}
                  </a>
                </span>
              )}
            </div>

            <div
              class={`flex flex-col gap-2 ${
                !layout?.position || layout?.position === "Expanded"
                  ? "lg:flex-row"
                  : ""
              }`}
            >
              <button
                class="py-2 px-6 lg:px-12 text-xs sm:text-sm font-normal text-base-200 bg-black hover:bg-black rounded-full uppercase"
                data-button-cc-accept
              >
                {buttons.allowText}
              </button>
              {buttons.cancelText && (
                <button
                  class="py-2 px-6 lg:px-12 text-xs sm:text-sm font-normal text-base-200 bg-black hover:bg-black rounded-full uppercase"
                  data-button-cc-close
                >
                  {buttons.cancelText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
