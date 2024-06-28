export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden xl:flex flex-row gap-6 xl:gap-10 ${
              justify && "xl:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="text-lg font-reserva-serif font-black">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block link link-hover font-reserva-sans text-accent">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col xl:hidden">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input id={section.label} type="checkbox" class="" />
                  <label
                    htmlFor={section.label}
                    class="collapse-title flex gap-2 border-b border-[#f5f5f5]"
                  >
                    <span class="font-reserva-serif font-black text-accent text-base">{section.label}</span>
                  </label>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pl-5 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover font-reserva-sans text-accent text-sm"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
