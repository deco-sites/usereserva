import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { AppContext } from "../../apps/site.ts"

export interface Link {
  link: string;
  /**
   * @title Abre em nova guia?
   * @description Com essa opção ativa, vai abrir uma nova guia.
   */
  isBlank?: boolean;
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  label: string;
}

export interface Props {
  links: Link[];
  /** @title Texto do botão */
  buttonText: string;
  /**
   *  @hide
   */
  hasArrivedEnd?: AvailableIcons;
}

export const loader = async (props: Props, req: Request, _ctx: AppContext) => {
  const isOpen = await req.formData().catch(() => null)
  return { ...props, isOpen: isOpen?.get("isOpen") === "on" }
}

function helpButton({ links, buttonText, hasArrivedEnd, isOpen }: Awaited<ReturnType<typeof loader>>) {
  const id = useId();
  const style = {
    boxShadow: "0 5px 12px rgba(0, 0, 0, .12)",
    background: "hsla(0, 0%, 100%, .63)",
  };
  const isOnEnd =
    "((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000))";

  const ScrollHTMX = () => (
    <div
      class="hidden"
      hx-target="closest section"
      hx-include={`[id=${id}]`}
      hx-post={useSection({ props: { hasArrivedEnd: !hasArrivedEnd } })}
      hx-trigger={`scroll[${
        hasArrivedEnd ? `!${isOnEnd}` : isOnEnd
      }] from:document`}
    />
  );

  const ScrollToTop = () => (
    <div
      hx-on:click="window.scrollTo({ top: 0, behavior: 'smooth' })"
      class={`w-12 h-12 flex items-center justify-center rounded-full ${
        hasArrivedEnd ? "block" : "hidden"
      }`}
      hx-swap="outerHTML swap:1s"
      style={style}
    >
      <Icon id="ChevronUp" width={24} height={24} />
    </div>
  );
  return (
    <div class="group/drop fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
      <input type="checkbox" class="hidden" id={id} name="isOpen" checked={isOpen} />
      <div class=" dropdown dropdown-top dropdown-end group-has-[input:checked]/drop:dropdown-open">
        <label
          htmlFor={id}
          class="flex items-center justify-center w-20 h-12 rounded-full transition-all ease-in duration-200 group-has-[input:checked]/drop:w-12 group-has-[input:checked]/drop:h-12 mt-1"
          style={style}
        >
          <div class="w-fit group-has-[input:checked]/drop:hidden font-semibold text-sm">
            {buttonText}
          </div>
          <div class="w-fit group-has-[input:checked]/drop:block hidden">
            <Icon id="X" width={16} height={16} strokeWidth={1} />
          </div>
        </label>
        <ul
          class="dropdown-content z-[1] py-px px-4 shadow bg-base-100 rounded-box w-44"
          style={style}
        >
          {links.map(({ link, label, icon, isBlank }) => (
            <li
              class="py-3 h-12 border-b last:border-none border-[#AFADAC] font-semibold"
              key={link}
            >
              <a
                class="flex gap-1"
                href={link}
                target={isBlank ? "_blank" : "_self"}
                rel={isBlank ? "noopener noreferrer" : ""}
              >
                {icon && (
                  <Icon class="text-black" id={icon} width={20} height={20} />
                )}
                <p class="text-sm text-black">{label}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ScrollHTMX />
      <ScrollToTop />
    </div>
  );
}

export default helpButton;
