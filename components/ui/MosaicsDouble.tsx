import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";

export interface Text {
  /** @title Título */
  title?: string;
  /** 
   * @title Descrição
   * @format textarea
   */
  description?: string;
}

export interface Image {
  link?: string;
  /** 
   * @title Título
   */
  title?: string;
  /** @description Em caso de querer usar videos. Para uma performance melhor, use GIFS para parecer com vídeo. */
  src?: ImageWidget;
  alt?: string;
  /** 
   * @title Conteúdo do Banner.
   * @description (Texto e CTAS que vai ficar em cima).
   */
  content?: BannerContent;
}

/** @titleBy description */
export interface Video {
  link?: string;
  url?: VideoWidget;
  /** @title Descrição */
  description?: string;
  /** 
   * @title Conteúdo do vídeo.
   * @description (Texto e CTAS que vai ficar em cima).
   */
  content?: BannerContent;
}

/** @titleBy label */
export interface Cta {
  label?: string;
  href?: string;
}
export interface BannerContent {
  /** @title Texto */
  text?: Text;
  links?: Cta[];
}

export interface MosaicsProps {
  /** @title Esquerda */
  left?: Image | Video;
  /** @title Direita */
  right?: Image | Video;
}

function Cta({ href, label }: Cta) {
  return (
    <a href={href} class="text-base-200 group" aria-label={label}>
      {label}
      <span class="block h-0.5 bg-base-200 w-full transition-transform duration-300 transform group-hover:translate-y-[-2px]" />
    </a>
  );
}

const ImageOrVideo = ({ content }: { content?: Image | Video }) => {
  const links = content?.content?.links
  return <div class="flex flex-col items-center justify-center gap-3">
    {content && (
      <>
        {"src" in content && (
          <div class="relative m-1">
            <a href={content.link || ""} aria-label={content.title || ""}>
              <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
              </span>
              <Image
                src={content.src || ""}
                alt={content.alt || ""}
                title={content.title || ""}
                width={705}
                height={500}
                class="aspect-[705/500] object-cover"
              />
            </a>
          </div>
        )}
        {"url" in content && content.url && (
          <div class="relative m-1">
            <a href={content.link} aria-label={content.description}>
              <Video
                width={705}
                height={500}
                muted
                autoPlay
                loop
                src={content.url}
                alt={content.description}
                loading="lazy"
                class="aspect-[705/500] object-cover"
              />
            </a>
            <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10">
            </span>
          </div>
        )}
        {content.content?.text && (
          <div class="flex flex-col items-center justify-center absolute z-20">
            <h2 class="text-2xl text-base-200">
              {content.content.text?.title}
            </h2>
            <p class="text-base-200 text-center">
              {content.content.text?.description}
            </p>
          </div>
        )}
        <div class="flex items-center justify-center absolute z-20 gap-4 mt-24">
          {links?.map((cta) =>
            <Cta {...cta} />
          )}
        </div>
      </>
    )}
  </div>
}

export default function Mosaics({ right, left }: MosaicsProps) {
  return (
    <div class="flex md:flex-row flex-col mx-auto items-center justify-center px-1">
      <ImageOrVideo content={left} />
      <ImageOrVideo content={right} />
    </div>
  );
}