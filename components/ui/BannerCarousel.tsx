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
  /** @description when user clicks on the image, go to this link */
  href?: string;
  /** @description Image text title */
  /** @format rich-text */
  title?: string;
  /** @description Image text subtitle */
  /** @format rich-text */
  subTitle?: string;
  /** @description Image text description */
  /** @format rich-text */
  description?: string;
}

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description title image */
  title?: string;
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    content?: contentCta;
    link?: {
      firstCta?: {
        href?: string;
        label?: string;
      };
      secondCta?: {
        href?: string;
        label?: string;
      };
      thirdCta?: {
        href?: string;
        label?: string;
      };
      fourthCta?: {
        href?: string;
        label?: string;
      };
    };
  };
}

export interface Autoplay {
  /** @description Activate or deactivate Carousel autoplay */
  activate?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: Autoplay;
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
  const links = action?.link;
  return (
    <a
      id={id}
      href={action?.content?.href ?? "#"}
      aria-label={action?.content?.href ?? "#"}
      class="relative overflow-y-hidden flex flex-col items-center justify-center"
    >
      <div class="flex flex-col absolute">
        {action?.content && (
          <div class=" items-center mx-auto max-w-[465px] flex flex-col justify-center px-8 py-12 w-full bottom-1/2">
            {action.content.title && (
              <span
                class="text-xs text-base-200 mb-2.5 text-center"
                dangerouslySetInnerHTML={{ __html: action.content.title }}
              >
              </span>
            )}
            {action.content.subTitle && (
              <span
                class="text-[51px] text-base-200 mb-3 leading-none text-center"
                dangerouslySetInnerHTML={{ __html: action.content.subTitle }}
              >
              </span>
            )}
            {action.content.description && (
              <span
                class="lg:text-base text-[15px] text-base-200 mb-[21px] text-center"
                dangerouslySetInnerHTML={{ __html: action.content.description }}
              >
              </span>
            )}
            {links && (
              <div class="flex items-center gap-4">
                {links?.firstCta && (
                  <Button
                    as={"a"}
                    href={links.firstCta.href}
                    class="text-base-200 flex border-0 p-0 bg-transparent text-sm hover:bg-transparent shadow-transparent h-[16px] gap-0 min-h-0 group"
                  >
                    {links.firstCta.label}
                    <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px] h-[0.5px]"></span>
                  </Button>
                )}
                {links?.secondCta && (
                  <Button
                    as={"a"}
                    href={links.secondCta.href}
                    class="text-base-200 flex border-0 p-0 bg-transparent text-sm hover:bg-transparent shadow-transparent h-[16px] gap-0 min-h-0 group"
                  >
                    {links.secondCta.label}
                    <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px] h-[0.5px]"></span>
                  </Button>
                )}
                {links?.thirdCta && (
                  <Button
                    as={"a"}
                    href={links.thirdCta.href}
                    class="text-base-200 flex border-0 p-0 bg-transparent text-sm hover:bg-transparent shadow-transparent h-[16px] gap-0 min-h-0 group"
                  >
                    {links.thirdCta.label}
                    <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px] h-[0.5px]"></span>
                  </Button>
                )}
                {links?.fourthCta && (
                  <Button
                    as={"a"}
                    href={links.fourthCta.href}
                    class="text-base-200 flex border-0 p-0 bg-transparent text-sm hover:bg-transparent shadow-transparent h-[16px] gap-0 min-h-0 group"
                  >
                    {links.fourthCta.label}
                    <span class="block h-[0.5px] bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px]"></span>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
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
      </Picture>
    </a>
  );
}

function Dots({ images, interval }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-1.5 sm:mx-0 mx-5 z-10 row-start-4 items-start">
        {images?.map((_, index) => (
          <Slider.Dot index={index}>
            <li class="carousel-item">
              <div
                class="w-[86px] h-0.5 group-data-[dot-background]:bg-transparent group-data-[dot-background]:bg-white group-disabled:animate-progress bg-gradient-to-r from-white from-[length:var(--dot-progress)] to-[#FFFFFF14] to-[length:var(--dot-progress)]"
                style={{
                  animationDuration: `${interval?.interval}s`,
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
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] sm:grid-rows-[1fr_48px_1fr_64px] grid-rows-[1fr_48px_1fr_62px] sm:min-h-min min-h-[535px]"
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

      {props.dots && <Dots images={images} interval={interval} />}

      <Slider.JS
        rootId={id}
        interval={interval?.interval && interval.interval * 1e3}
        infinite
      />
    </div>
  );
}

export default BannerCarousel;

