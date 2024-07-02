export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections }: { sections: Section[] },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={"hidden xl:flex flex-row gap-6 xl:gap-10"}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="text-lg font-reserva-serif xl:font-black">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block link link-hover font-reserva-sans text-[#8a8c8e]"
                        >
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
                <div class="collapse collapse-arrow rounded-none">
                  <input id={section.label} type="checkbox" class="!min-h-12" />
                  <label
                    htmlFor={section.label}
                    class="collapse-title flex gap-2 !min-h-12 py-4 px-0 border-b border-[#f5f5f5] h-0"
                  >
                    <span class="font-reserva-sans text-accent text-base">
                      {section.label}
                    </span>
                  </label>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover font-reserva-sans text-[#8a8c8e] text-sm font-light"
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
