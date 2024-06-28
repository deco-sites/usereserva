import { AppContext } from "../../apps/site.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";

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
  /**
   * @title Texto após submit do formulário
   * @description Texto renderizado após submeter o formulário.
   */
  /** @format html */
  helpText?: string;
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
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();

  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
    });
  }

  return props;
}

export function loader(props: Props) {
  return props;
}

export default function Newsletter({
  icon = "ReservaBird",
  title = "Assine nossa newsletter",
  description =
    "Cadastre-se e receba promoções exclusivas e saiba tudo antes de todo mundo!",
  form = {
    placeholderEmail: "Digite seu e-mail",
    placeholderName: "Digite seu nome",
    buttonText: "Cadastrar",
    helpText: "Obrigado por se cadastrar.",
  },
  mobileApps = { apple: "/", android: "/" },
  appsContent = {
    title: "Baixe o app",
    description:
      "A Reserva todinha na palma da sua mão, baixe agora mesmo na loja do seu smartphone.",
  },
}: Props) {
  return (
    <div class="bg-[#f9f9f9]">
      <section class="container flex flex-col sm:flex-row justify-between items-center sm:items-start py-8 px-4">
        <div class="order-2 xl:order-none mt-5 sm:mt-0">
          <div class="flex flex-wrap items-center justify-center lg:justify-between">
            <div class="flex items-center">
              <Icon
                id={icon}
                width={18}
                height={23}
                strokeWidth={0.01}
                class="lg:mr-2.5"
              />
              {title && (
                <h4 class="text-2xl lg:text-3xl text-center sm:text-justify font-reserva-display">
                  {title}
                </h4>
              )}
            </div>
            {description && (
              <div class="text-sm text-center lg:text-justify font-reserva-sans my-2.5 w-64">
                {description}
              </div>
            )}
          </div>

          <form
            hx-target="closest section"
            hx-swap="outerHTML"
            hx-post={useComponent(import.meta.url)}
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col xl:flex-row gap-3">
              <input
                name="name"
                type="text"
                class="flex-auto input input-bordered border-[#B0B0B0] text-secondary text-sm focus:outline-none focus:border-[#b0b0b0] rounded-lg font-reserva-sans font-light"
                required
                placeholder={form?.placeholderName}
              />
              <input
                name="email"
                type="email"
                class="flex-auto input input-bordered border-[#B0B0B0] text-secondary text-sm focus:outline-none focus:border-[#b0b0b0] rounded-lg font-reserva-sans font-light"
                placeholder={form.placeholderEmail}
              />
              <button
                class="text-sm rounded-lg uppercase text-white bg-black px-7 py-3.5 w-full font-reserva-sans font-light"
                type="submit"
              >
                <span class="[.htmx-request_&]:hidden inline">
                  {form.buttonText}
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner">
                  0
                </span>
              </button>
            </div>

            <div
              class="text-xs font-reserva-sans text-center"
              dangerouslySetInnerHTML={{ __html: form.helpText ?? "" }}
            />
          </form>
        </div>

        <div class="order-1 xl:order-none">
          <div class="xl:flex xl:items-center">
            {appsContent.title && (
              <h4 class="text-2xl lg:text-3xl font-reserva-display text-center">
                {appsContent.title}
              </h4>
            )}
            {appsContent.description && (
              <div class="text-sm text-center lg:text-justify font-reserva-sans my-2.5 w-72 xl:ml-5">
                {appsContent.description}
              </div>
            )}
          </div>
          <MobileApps content={mobileApps} />
        </div>
      </section>
    </div>
  );
}
