import Icon, { AvailableIcons } from "./Icon.tsx";

export interface Benefit {
  /** @description id label */
  label: AvailableIcons;
  /** @description specifies the stroke width for the icon */
  strokeWidth?: number;
  title?: string;
  /** @format rich-text */
  description?: string;
}

export default function RangeOfBenefits({ benefits }: { benefits: Benefit[] }) {
  return (
    <div class="flex md:flex-row flex-col justify-center max-w-screen-xl px-[44px] mx-auto w-full py-5 gap-9">
      {benefits.map(({ label, title, description,strokeWidth }) => (
        <div class="flex sm:flex-col items-center justify-start items-center w-full sm:gap-3.5 gap-[18px] md:max-w-none max-w-[300px] mx-auto">
          {label &&
            <Icon id={label} size={36} strokeWidth={strokeWidth || 1} /> }
          {title &&
            (
              <div>
                <h3 class="md:text-center text-base font-bold">{title}</h3>
                {description && (
                  <span
                    class="md:text-center sm:text-[15px] text-[14px] text-base-300 w-full flex md:max-w-none max-w-[247px]"
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
