import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Border {
  /**
   * @title Cor de Cima
   * @format color-input
   */
  colorTop?: string;
  /**
   * @title Cor de Baixo
   * @format color-input
   */
  colorBottom?: string;
}

/** @titleBy title */
export interface Category {
  /** @description Coloque uma imagem nas proporções (110x110)px */
  image: ImageWidget;
  alt: string;
  /**
   * @title Borda
   * @description Em caso de não por uma cor, a borda será preta
   */
  border?: Border;
  /** @title Título */
  title: string;
  link: string;
}

export interface Autoplay {
  /** @title Ativar */
  activate?: boolean;
  /**
   * @title Intervalo autoplay
   * @description Tempo (em segundos) para trocar de item no carousel automaticamente.
   */
  interval?: number;
}

export interface Props {
  /** @title Título */
  title?: string;
  /**
   * @title Categorias
   * @maxItems 15
   */
  categories: Category[];
  autoplay?: Autoplay;
}

function generateBorderStyle(
  topColor: string | undefined,
  bottomColor: string | undefined,
): Record<string, string> {
  if (!topColor && !bottomColor) {
    return { border: "3px solid black" };
  }

  if (!topColor) {
    return { border: `3px solid ${bottomColor}` };
  }

  if (!bottomColor) {
    return { border: `3px solid ${topColor}` };
  }

  return {
    background:
      `linear-gradient(white, white) padding-box, linear-gradient(to bottom, ${topColor}, ${bottomColor}) border-box`,
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "transparent",
  };
}

export const Category = ({ image, link, title, alt, border }: Category) => {
  const style = generateBorderStyle(border?.colorTop, border?.colorBottom);
  return (
    <a href={link} class="flex flex-col gap-2 w-28 h-36">
      <Image
        class="rounded-full"
        src={image}
        alt={alt}
        width={110}
        height={110}
        style={{ ...style }}
        loading="lazy"
      />
      <h2 class="text-center text-sm font-normal">{title}</h2>
    </a>
  );
};

function CategoryNavigation({ categories, title, autoplay }: Props) {
  const id = useId();
  const Divider = () => <div class="w-16 h-[0.5px] bg-black" />;
  const interval = autoplay?.activate ? (autoplay?.interval ?? 0) : 0;
  return (
    <div class="container">
      {title && (
        <div class="flex gap-2 flex-col items-center justify-center pt-8 pb-6">
          <p class="text-center text-sm font-normal">{title}</p>
          <Divider />
        </div>
      )}
      <div class="relative gap-4 my-6" id={id}>
        <Slider.PrevButton class="absolute left-0 top-1/2 -translate-y-1/2 z-10 max-md:hidden">
          <Icon id="Prev" size={45} />
        </Slider.PrevButton>
        <Slider.NextButton class="absolute right-0 top-1/2 -translate-y-1/2 z-10 max-md:hidden">
          <Icon id="Next" size={45} />
        </Slider.NextButton>
        <Slider class="carousel flex gap-5 scroll-px-10 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          {categories.map((category, index) => (
            <Slider.Item
              index={index}
              class="carousel-item first:pl-10 last:pr-10"
            >
              <Category {...category} />
            </Slider.Item>
          ))}
        </Slider>
        <Slider.JS rootId={id} interval={interval * 1e3} />
      </div>
    </div>
  );
}

export default CategoryNavigation;
