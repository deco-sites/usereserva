import Icon, { AvailableIcons } from "./Icon.tsx";

/** @titleBy icon */
export interface Benefit {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  /**
   * @title Largura do Traço.
   * @description Especifique a largura do traço para o ícone. (O padrão é 1)
   */
  strokeWidth?: number;
  /** @title Título */
  title?: string;
  /**
   * @title Descrição
   * @format rich-text
   */
  description?: string;
}

export interface Props {
  /** @title Benefícios */
  benefits: Benefit[];
}

export default function RangeOfBenefits({ benefits }: Props) {
  return (
    <div class="flex lg:flex-row flex-col justify-center max-w-screen-xl px-11 mx-auto w-full py-5 gap-9">
      {benefits.map(({ icon, title, description, strokeWidth }) => (
        <div class="flex lg:flex-col justify-start sm:items-center w-full sm:gap-3.5 gap-4 lg:max-w-none max-w-[300px] mx-auto">
          {icon &&
            (
              <Icon
                class="flex-shrink-0"
                id={icon}
                size={36}
                strokeWidth={strokeWidth || 1}
              />
            )}
          {title &&
            (
              <div>
                <h3 class="md:text-center text-base font-bold">{title}</h3>
                {description && (
                  <span
                    class="md:text-center sm:text-base text-sm text-base-300 w-full flex md:max-w-64"
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
