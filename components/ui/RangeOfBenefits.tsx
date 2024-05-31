import Icon, { AvailableIcons } from "./Icon.tsx";

export interface Benefit {
  /** @description id label */
  label: AvailableIcons;
  title?: string;
  /** @format rich-text */
  description?: string;
}

export default function RangeOfBenefits({ benefits }: { benefits: Benefit[] }) {
  return (
    <div class="flex md:flex-row flex-col justify-center mx-auto w-full">
      {benefits.map(({ label, title, description }) => (
        <div class="flex sm:flex-col items-center justify-center gap-2.5 items-center sm:max-w-[200px] w-full">
          {label &&
            <Icon id={label} size={30} strokeWidth={5} />}
          {title &&
            (
              <div>
                <h3 class="sm:text-center text-[17px]">{title}</h3>
                {description && (
                  <span
                    class="sm:text-center text-[15px]"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
