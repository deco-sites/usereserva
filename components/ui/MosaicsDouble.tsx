import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";

export interface Text {
  title?: string;
  description?: string;
}

export interface Image {
  link?: string;
  /** @description title image */
  title?: string;
  /** @description for better performance, if you want to use a GIF, prefer to use video */
  src?: ImageWidget;
  alt?: string;
  content?: BannerContent;
}

export interface Video {
  link?: string;
  url?: VideoWidget;
  description?: string;
  content?: BannerContent;
}

export interface Cta {
  label?: string;
  href?: string;
}

export interface Link {
  firstCta?: Cta;
  secondCta?: Cta;
  thirdCta?: Cta;
  fourthCta?: Cta;
}

export interface BannerContent {
  text?: Text;
  link?: Link;
}

export interface MosaicsProps {
  right?: Image | Video;
  left?: Image | Video;
}

export default function Mosaics({ right, left }: MosaicsProps) {
  return (
    <div class="flex md:flex-row flex-col mx-auto items-center justify-center px-[5px]">
      <div class="flex flex-col items-center justify-center gap-[10px]">
        {left && (
          <>
            {"src" in left && (
              <div class="relative m-[5px]">
                <a href={left.link || ""} aria-label={left.title || ""}>
                  <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
                  </span>
                  <Image
                    src={left.src || ""}
                    alt={left.alt || ""}
                    title={left.title || ""}
                    width={705}
                    height={500}
                    class="aspect-[705/500] object-cover"
                  />
                </a>
              </div>
            )}
            {"url" in left && (
              <div class="relative m-[5px]">
                <a href={left.link || ""} aria-label={left.description || ""}>
                  <Video
                    width={705}
                    height={500}
                    muted
                    autoPlay
                    loop
                    src={left.url || ""}
                    alt={left.description || ""}
                    loading="lazy"
                    class="aspect-[705/500] object-cover"
                  />
                </a>
                <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
                </span>
              </div>
            )}
            {left.content?.text && (
              <div class="flex flex-col items-center justify-center absolute z-20">
                <h2 class="text-2xl text-base-200">
                  {left.content.text?.title}
                </h2>
                <p class="text-base-200 text-center">
                  {left.content.text?.description}
                </p>
              </div>
            )}
            {left.content?.link && (
              <div class="flex items-center justify-center absolute z-20 gap-[18px] mt-[100px]">
                {left.content.link.firstCta &&
                  renderCtaLink(left.content.link.firstCta)}
                {left.content.link.secondCta &&
                  renderCtaLink(left.content.link.secondCta)}
                {left.content.link.thirdCta &&
                  renderCtaLink(left.content.link.thirdCta)}
                {left.content.link.fourthCta &&
                  renderCtaLink(left.content.link.fourthCta)}
              </div>
            )}
          </>
        )}
      </div>
      <div class="flex flex-col items-center justify-center gap-[10px]">
        {right && (
          <>
            {"src" in right && (
              <div class="relative m-[5px]">
                <a href={right.link || ""} aria-label={right.title || ""}>
                  <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
                  </span>
                  <Image
                    src={right.src || ""}
                    alt={right.alt || ""}
                    title={right.title || ""}
                    width={705}
                    height={500}
                    class="aspect-[705/500] object-cover"
                  />
                </a>
              </div>
            )}
            {"url" in right && (
              <div class="relative m-[5px]">
                <a href={right.link || ""} aria-label={right.description || ""}>
                  <Video
                    width={705}
                    height={500}
                    muted
                    autoPlay
                    loop
                    src={right.url || ""}
                    alt={right.description || ""}
                    loading="lazy"
                    class="aspect-[705/500] object-cover"
                  />
                </a>
                <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
                </span>
              </div>
            )}
            {right.content?.text && (
              <div class="flex flex-col items-center justify-center absolute z-20">
                <h2 class="text-2xl text-base-200">
                  {right.content.text?.title}
                </h2>
                <p class="text-base-200 text-center">
                  {right.content.text?.description}
                </p>
              </div>
            )}
            {right.content?.link && (
              <div class="flex items-center justify-center absolute z-20 gap-[18px] mt-[100px]">
                {right.content.link.firstCta &&
                  renderCtaLink(right.content.link.firstCta)}
                {right.content.link.secondCta &&
                  renderCtaLink(right.content.link.secondCta)}
                {right.content.link.thirdCta &&
                  renderCtaLink(right.content.link.thirdCta)}
                {right.content.link.fourthCta &&
                  renderCtaLink(right.content.link.fourthCta)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function renderCtaLink(cta: Cta) {
  return (
    <a href={cta.href} class="text-base-200 group" aria-label={cta.label}>
      {cta.label}
      <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px] h-[0.5px]">
      </span>
    </a>
  );
}
