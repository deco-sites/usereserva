import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface contentCta {
  /** @description Quando o usuario clickar na imagem, vai para esse link */
  href?: string;

  /**
   *  @title Título
   *  @description Título da imagem 
   *  @format rich-text
   */
  title?: string;
  /**
   * @title Sub-Título 
   * @description Sub-Título da imagem
   * @format rich-text
   */
  subTitle?: string;
  /**
   * @title Descrição 
   * @description Image text description 
   * @format rich-text
   */
  description?: string;
}

/** @titleBy label */
export interface CTA {
  /** @title Link */
  href: string;
  /** @description Texto que vai renderizar no botão de link */
  label: string;
}

/**
 * @titleBy alt
 */
export interface Banner {
  /** @title Titulo */
  title?: string;
  /** @description Imagem otimizada para o desktop (1440X600) */
  desktop: ImageWidget;
  /** @description Imagem otimazada para o mobile (430x590) */
  mobile: ImageWidget;
  /** @description Texto de acessibilidade da imagem (ALT)  */
  alt: string;
  /** @title Ação */
  action?: {
    /** @title Conteúdo */
    content?: contentCta;
    links?: CTA[];
  };
}

export interface Autoplay {
  /** @title Ativar */
  activate?: boolean;
  /**
   * @title Intervalo autoplay 
   * @description Tempo (em segundos) para trocar de item no carousel autômaticamente.
   */
  interval?: number;
}

export interface Props {
  images?: Banner[];
  /**
   * @title Preload
   * @description Ative essa opção quando o banner for o maior do site e aparcer na primeira dobra. isso é para melhorar a performance.
   */
  preload?: boolean;
  /**
   * @title Mostrar setas
   * @description Mostra as setas para navegar.
   */
  arrows?: boolean;
  /**
   * @title Mostrar os botões
   * @description Mostra os botões para navegar.
   */
  dots?: boolean;
  autoplay?: Autoplay;
}

const DEFAULT_PROPS = {
  images: [
    {
      title: "New collection",
      subTitle: "Main title",
      label: "Explore collection",
      href: "/",
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function Action({ action }: { action: Banner["action"] }) {
  const content = action?.content;
  const links = action?.links
  return <div class="flex items-center justify-center absolute z-20 w-full h-full">
    {content && (
      <div class="items-center mx-auto max-w-[465px] flex flex-col justify-center px-8 py-12 w-full">
        {content?.title && (
          <span
            class="text-xs text-base-200 mb-2.5 text-center"
            dangerouslySetInnerHTML={{ __html: content.title }}
          >
          </span>
        )}
        {content?.subTitle && (
          <span
            class="text-5xl text-base-200 mb-3 leading-none text-center"
            dangerouslySetInnerHTML={{ __html: content.subTitle }}
          >
          </span>
        )}
        {content?.description && (
          <span
            class="text-base text-base-200 mb-5 text-center"
            dangerouslySetInnerHTML={{ __html: content.description }}
          >
          </span>
        )}
        {links && (
          <div class="flex items-center gap-4">
            {links?.map(({ href, label }, index) => (
              links && href && (
                <Button
                  key={index}
                  as={"a"}
                  href={href}
                  class="text-base-200 flex border-0 p-0 bg-transparent text-sm hover:bg-transparent shadow-transparent h-4 gap-0 min-h-0 group"
                  aria-label={label}
                >
                  {label}
                  <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px]">
                  </span>
                </Button>
              )
            ))}
          </div>
        )}
      </div>
    )}
  </div>
}
function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    title,
    mobile,
    desktop,
    action,
  } = image;
  return (
    <a
      id={id}
      href={action?.content?.href ?? "#"}
      aria-label={action?.content?.href ?? "#"}
      class="relative overflow-y-hidden w-full"
    >
      <Action action={action} />
      <Picture preload={lcp} class="flex-1">
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={430}
          height={590}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full"
          title={title}
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
        <span class="absolute bg-shadow top-0 left-0 w-full h-full z-10"></span>
      </Picture>
    </a>
  );
}


function Dots({ images, autoplay }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 1%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-1.5 sm:mx-0 mx-5 z-10 row-start-4 items-start">
        {images?.map((_, index) => (
          <Slider.Dot index={index}>
            <li class="carousel-item">
              <div
                class="sm:w-[86px] w-full h-0.5 group-data-[painted]:bg-none group-data-[painted]:bg-white group-disabled:animate-progress bg-gradient-to-r from-white from-[length:var(--dot-progress)] to-[#FFFFFF14] to-[length:var(--dot-progress)]"
                style={{
                  animationDuration: `${autoplay?.interval}s`,
                }}
              />
            </li>
          </Slider.Dot>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, autoplay } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] sm:grid-rows-[1fr_48px_1fr_64px] grid-rows-[1fr_48px_1fr_62px] lg:min-h-min min-h-[535px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };
          return (
            <Slider.Item
              index={index}
              class="carousel-item w-full flex justify-center"
            >
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={images} autoplay={autoplay} />}

      <Slider.JS
        rootId={id}
        interval={autoplay?.interval && autoplay.interval * 1e3}
        infinite
      />
    </div>
  );
}

export default BannerCarousel;
