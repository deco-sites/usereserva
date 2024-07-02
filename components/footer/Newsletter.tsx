/* import { AppContext } from "../../apps/site.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx"; */
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import MobileApps from "./MobileApps.tsx";
import { useSection } from "deco/hooks/useSection.ts";

export interface Form {
  /**
   * @title Campo nome
   * @description Texto do placeholder do campo nome.
   */
  placeholderName?: string;
  /**
   * @title Campo E-mail
   * @description Texto do placeholder do campo e-mail.
   */
  placeholderEmail?: string;
  /**
   * @title Botão
   * @description Texto do botão do formulário.
   */
  buttonText?: string;
}

export interface MobileApps {
  /** @description Link para o aplicativo IOS */
  apple?: string;
  /** @description Link para o aplicativo android */
  android?: string;
}

export interface AppsContent {
  /**
   * @title Título
   * @description Título da sessão de App
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição da sessão de App.
   */
  /** @format textarea */
  description?: string;
}

export interface Props {
  /**
   * @title Ícone
   * @description ícone do título do formulário
   */
  icon?: AvailableIcons;
  /**
   * @title Título
   * @description Texto que será renderizado no título.
   */
  title?: string;
  /**
   * @title Descrição
   * @description Texto que será renderizado na descrição.
   */
  /** @format textarea */
  description?: string;
  /**
   * @title Formulário
   */
  form?: Form;
  /**
   * @title Links dos aplicativos
   */
  mobileApps?: MobileApps;
  /**
   * @title Conteúdo Aplicativo
   */
  appsContent?: AppsContent;
  /** @ignore */
  invalidEmail?: boolean;
  /** @ignore */
  newsletterSuccess?: boolean;
  /** @ignore */
  invalidName?: boolean;
}

export default function Newsletter({
  icon = "ReservaBird",
  title = "Assine nossa newsletter",
  description = "Cadastre-se e receba promoções exclusivas e saiba tudo antes de todo mundo!",
  form = {
    placeholderEmail: "Digite seu e-mail",
    placeholderName: "Digite seu nome",
    buttonText: "Cadastrar",
  },
  mobileApps = { apple: "/", android: "/" },
  appsContent = {
    title: "Baixe o app",
    description:
      "A Reserva todinha na palma da sua mão, baixe agora mesmo na loja do seu smartphone.",
  },
  invalidEmail,
  invalidName,
  newsletterSuccess,
}: Props) {

  return (
    <div class="bg-[#f9f9f9]">
      <div class="container flex flex-col justify-center p-8 md:gap-10 md:flex-row xl:justify-between">
        <div class="order-2 xl:order-none mt-5 md:mt-0 ">
          <div class="flex flex-col items-center justify-center xl:flex-row xl:justify-evenly">
            <div class="flex items-center">
              <Icon
                id={icon}
                width={18}
                height={23}
                strokeWidth={0.01}
                class="mr-2.5"
              />
              {title && (
                <h4 class="text-[23px] xl:text-[32px] tracking-tighter font-reserva-display text-center leading-tight">
                  {title}
                </h4>
              )}
            </div>
            {description && (
              <div class="text-sm text-center font-reserva-sans my-2.5 w-64 xl:text-justify">
                {description}
              </div>
            )}
          </div>

          <form
            class="flex flex-col"
            hx-post={useSection()}
            hx-swap="outerHTML"
            hx-target="closest section"
            hx-indicator="#submitButton"
          >
            <div class="flex flex-col xl:flex-row gap-3">
              <div class="flex flex-col">
                <input
                  name="email"
                  type="text"
                  class={`flex-auto input input-bordered bg-white text-secondary text-sm focus:outline-none border-[#B0B0B0] focus:border-[#b0b0b0] rounded-lg font-reserva-sans font-light max-h-[42px] xl:w-[257px] ${invalidEmail ? "border-[#ff4c4c]" : "border-[#B0B0B0]"}`}
                  placeholder={form.placeholderEmail}
                />
                {invalidEmail && (
                  <span class="text-[#ff4c4c] text-[13px] font-reserva-sans">
                    E-mail inválido
                  </span>
                )}
              </div>
              <div class="flex flex-col">
                <input
                  name="name"
                  type="text"
                  class={`flex-auto input input-bordered bg-white text-secondary text-sm focus:outline-none border-[#B0B0B0] focus:border-[#b0b0b0] rounded-lg font-reserva-sans font-light max-h-[42px] xl:w-[257px] ${invalidName ? "border-[#ff4c4c]" : "border-[#B0B0B0]"}`}
                  placeholder={form?.placeholderName}
                />
                {invalidName && (
                  <span class="text-[#ff4c4c] text-[13px] font-reserva-sans">
                    O Nome é obrigatório
                  </span>
                )}
              </div>
              <button
                id="submitButton"
                type="submit"
                class="text-sm rounded-lg uppercase text-white bg-black py-3 w-full font-reserva-sans font-light tracking-widest xl:w-[149px]"
              >
                <span class="[.htmx-request_&]:hidden inline">
                  {form.buttonText}
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner">
                  0
                </span>
              </button>
            </div>
            {newsletterSuccess && (
              <div class="flex justify-end">
                <p class="text-xs font-reserva-sans mt-2.5">
                  Obrigado por se cadastrar!
                </p>
              </div>
            )}
          </form>
        </div>

        <div class="order-1 xl:order-none ">
          <div class="flex flex-col items-center justify-center xl:flex-row xl:justify-between">
            {appsContent.title && (
              <h4 class="text-[23px] xl:text-[32px] tracking-tighter font-reserva-display text-center">
                {appsContent.title}
              </h4>
            )}
            {appsContent.description && (
              <div class="text-sm text-center font-reserva-sans my-2.5 w-72 xl:text-justify xl:ml-2.5">
                {appsContent.description}
              </div>
            )}
          </div>
          <MobileApps content={mobileApps} />
        </div>
      </div>
    </div>
  );
}
