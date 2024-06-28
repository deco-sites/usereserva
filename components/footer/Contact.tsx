import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type ContactItem = {
  label: string;
  href: string;
  icon: AvailableIcons;
  description: string;
};

export type ItemContact = {
  label: string;
  items: ContactItem[];
};

export default function Contact({ content }: { content?: ItemContact[] }) {
  return (
    <>
      {content && content.length > 0 && (
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          {content.map((item) => (
            <div class="flex flex-col gap-2">
              <span class="font-reserva-serif text-lg font-black">
                {item.label}
              </span>
              <ul class={`flex flex-col gap-4 sm:grid sm:grid-cols-2 text-sm`}>
                {item.items.map((items) => (
                  <li class="flex">
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
                      <span class="text-xs whitespace-break-spaces">
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
