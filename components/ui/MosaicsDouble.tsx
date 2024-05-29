import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface contentText {
  title?: string;
  description?: string;
}

export interface contentImage {
  /** @description title image */
  title?: string;
  src?: ImageWidget;
  alt?: string;
}

export interface contentVideo {
  link?: string;
  url?: VideoWidget;
  width?: number;
  height?: number;
  description?: string;
}

export interface contentCta {
  label?: string;
  href?: string;
}

export interface contentLink {
  firstCta?: contentCta;
  secondCta?: contentCta;
  thirdCta?: contentCta;
  fourthCta?: contentCta;
}


export interface contentBanner {
  text?: contentText;
  image?: contentImage;
  video?: contentVideo;
  link?: contentLink;
}

export interface MosaicsDoubleProps {
  firstBanner?: contentBanner;
  secondBanner?: contentBanner;
}

export default function MosaicsDouble(props: MosaicsDoubleProps) {
  const { firstBanner, secondBanner } = props;

  const renderBanner = (banner?: contentBanner) => {
    if (!banner) return null;
    const { image, video, link, text } = banner;

    return (
      <div class="flex flex-col items-center justify-center gap-[10px]">
        {image && !video && (
          <div class="relative m-[5px]">
            <span class="absolute mosaic-bg top-0 left-0 w-full h-full z-10"></span>
            <Image
              src={image.src || ""}
              alt={image.alt}
              title={image.title}
              width={705}
              height={500}
            />
          </div>
        )}
        {video && !image && (
          <Video
            width={video.width || 900}
            height={video.height || 773}
            muted
            autoPlay
            controls
            src={video.url || ""}
            alt={video.description}
            loading="lazy"
            class="w-full h-full object-cover pt-20 pb-[60px]"
          />
        )}
        {text && (
          <div class="flex flex-col items-center justify-center absolute z-20">
            <h2 class="text-2xl text-base-200">{text.title}</h2>
            <p class="text-base-200 text-center">{text.description}</p>
          </div>
        )}
        <div class="flex items-center justify-center absolute z-20 gap-[18px] mt-[100px]">
          {link?.firstCta && (
            <a
              href={link.firstCta.href}
              class="text-base-200"
            >
              {link.firstCta.label}
            </a>
          )}
          {link?.secondCta && (
            <a
              href={link.secondCta.href}
              class="text-base-200"
            >
              {link.secondCta.label}
            </a>
          )}
          {link?.thirdCta && (
            <a
              href={link.thirdCta.href}
              class="text-base-200"
            >
              {link.thirdCta.label}
            </a>
          )}
          {link?.fourthCta && (
            <a
              href={link.fourthCta.href}
              class="text-base-200"
            >
              {link.fourthCta.label}
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div class="flex flex-col md:flex-row items-center justify-center md:px-[5px] px-2.5">
      {renderBanner(firstBanner)}
      {renderBanner(secondBanner)}
    </div>
  );
}
