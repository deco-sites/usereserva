import { useSection } from "deco/hooks/useSection.ts";
import type {
  Category,
  Department,
  ExtraLink,
  Menu as MenuProps,
} from "../../loaders/Header/Menu.ts";
import { useId } from "../../sdk/useId.ts";
import { ComponentChildren } from "preact";
import Icon from "../ui/Icon.tsx";
import {
  MENU_DRAWER_ID,
  MENU_INPUT_ID,
  NAVBAR_HEIGHT,
  NAVBAR_HEIGHT_MOBILE,
} from "../../constants.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  children: ComponentChildren;
  hasRotate?: boolean;
  class?: string;
  titleClass?: string;
  contentClass?: string;
}

const IMAGE_WIDTH = 259;
const IMAGE_HEIGHT = 358;

function Collapse(
  { title, children, class: _class, titleClass, contentClass, hasRotate }:
    Props,
) {
  const id = useId();
  return (
    <div
      class={`collapse rounded-none ${_class}`}
    >
      <input class="hidden" type="checkbox" id={id} />
      <label htmlFor={id}>
        <div class="collapse-title min-h-0 p-6 h-14">
          <div class="flex items-center justify-between h-full w-full">
            <p class={titleClass}>{title}</p>
            <style
              dangerouslySetInnerHTML={{
                __html: ` #${id}:checked ~ label  .arrow {color: #e4022b; }
                            
            #${id}:checked ~ label .rotate { transform: rotate(180deg);
            transition: transform 0.4s ease; }

            #${id}:not(:checked) ~ label .rotate { transform: rotate(0deg);
            transition: transform 0.4s ease; }
            `,
              }}
            />
            <Icon
              id="ChevronDown"
              width={24}
              height={24}
              class={`ml-auto text-black arrow pointer-events-none ${hasRotate ? "rotate" : ""
                }`}
            />
          </div>
        </div>
      </label>
      <div
        class={`collapse-content !p-0 font-normal text-base ${contentClass}`}
      >
        {children}
      </div>
    </div>
  );
}

const MenuCategory = ({ title, navItems }: Category) => {
  return (
    <Collapse
      title={title}
      class="border-none bg-[#f6f6f6]"
      titleClass="text-sm font-semibold"
      hasRotate
    >
      <ul class="bg-[#E6E6E6]">
        {navItems.map(({ title, link, isBlank }) => (
          <li class="text-sm px-12 h-14">
            <a
              href={link}
              target={isBlank ? "_blank" : "_self"}
              rel={isBlank ? "noopener noreferrer" : ""}
              class="flex items-center w-full h-full"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

const MenuDepartament = ({ title, collums, image }: Department) => {
  return (
    <Collapse
      title={title}
      class="bg-white border-b border-[#D8D9DA]"
      titleClass="text-sm font-bold uppercase"
      contentClass="border-t border-[#D8D9DA]"
    >
      {collums.map(({ categories }) =>
        categories.map((category) => <MenuCategory {...category} />)
      )}
      {image && image.src && (
        <Image
          class="w-full h-full"
          src={image.src}
          alt={image.alt}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          href={image.link}
          loading={"lazy"}
        />
      )}
    </Collapse>
  );
};

function MenuExtraLinks({ icon, link, title, isBlank }: ExtraLink) {
  return (
    <div class="h-14 w-full">
      <a
        class="flex items-center justify-start gap-5 h-full w-full"
        href={link}
        target={isBlank ? "_blank" : "_self"}
        rel={isBlank ? "noopener noreferrer" : ""}
      >
        <Icon id={icon} width={20} height={20} />
        <p class="text-sm font-bold">{title}</p>
      </a>
    </div>
  );
}

function MenuContent({ links, extraLinks }: MenuProps) {
  return (
    <div class="flex flex-col carousel-vertical">
      {links.map((department) => <MenuDepartament {...department} />)}
      {extraLinks?.map((extraLinks) => <MenuExtraLinks {...extraLinks} />)}
    </div>
  );
}

function Menu({ isDesktop }: { isDesktop?: boolean }) {
  return (
    <div id="menu-container">
      <style
        dangerouslySetInnerHTML={{
          __html: `#menu-container section { display: contents; }`,
        }}
      />
      <input id={MENU_INPUT_ID} type="checkbox" class="hidden peer" />
      <aside
        id={MENU_DRAWER_ID}
        class="absolute right-0 bottom-0 w-screen bg-white z-50 text-sm peer-checked:translate-x-0 -translate-x-full transition-all shadow-md duration-300 flex flex-col"
        style={{
          height: `calc(100vh - 100%)`,
          top: `${isDesktop ? NAVBAR_HEIGHT : NAVBAR_HEIGHT_MOBILE}`,
        }}
      >
        <div
          class="flex w-full h-full justify-center items-center flex-grow"
          hx-trigger="intersect once"
          hx-target={`#${MENU_DRAWER_ID}`}
          hx-get={useSection({ props: { displayMenuContents: true } })}
        >
          <span class="loading loading-spinner" />
        </div>
      </aside>
    </div>
  );
}

Menu.content = MenuContent;

export default Menu;
