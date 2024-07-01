import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type ContactItem = {
  /**
   * @title Texto
   * @description Texto que vai renderizar no link
   */
  label: string;
  /**
   * @description URL do link
   */
  href: string;
  /**
   * @description Ícone que irá renderizar ao lado do link
   */
  icon: AvailableIcons;
  /**
   * @description Descrição que vai renderizar abaixo do texto do link
   */
  description: string;
};

export type Contact = {
  /**
  * @title Título
  */
  title: string;
  /**
  * @title Itens de link
  */
  items: ContactItem[];
};

export default function Contact({ content }: { content?: Contact[] }) {
  return (
    <>
      {content && content.length > 0 && (
        <div className="flex flex-col md:flex-row lg:gap-10">
          {content.map((contact) => (
            <div class="flex flex-col gap-2">
              <span class="font-reserva-serif text-lg font-black">
                {contact.title}
              </span>
              <ul class={`flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:gap-y-8 text-sm`}>
                {contact.items.map((items) => (
                  <li class="flex col-span-1">
                    <Icon
                      id={items.icon}
                      width={20}
                      height={20}
                      strokeWidth={0.01}
                    />

                    <div class="ml-2.5">
                      <a
                        href={items.href}
                        class="block link link-secondary font-reserva-sans text-accent-content"
                      >
                        {items.label}
                      </a>
                      <span class="text-xs">
                        {items.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
