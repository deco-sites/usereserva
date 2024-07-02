import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type Image = {
  /**
   * @title Imagem
   */
  image: ImageWidget;
  /**
   * @description URL do link
   */
  href: string;
  /**
   * @description Texto alt da imagem
   */
  alt: string;
};

export type ExtraLinks = {
  /**
   * @title Título
   */
  label: string;
  /**
   * @description Lista de imagens que irão renderizar com o link
   */
  items: Image[];
};

export default function ExtraLinks({ content }: { content?: ExtraLinks[] }) {
  return (
    <>
      {content && content.length > 0 && (
        <>
          {content.map((extraLinks) => (
            <div class="flex flex-col gap-2 items-center">
              <span class="font-reserva-sans text-lg font-black">
                {extraLinks.label}
              </span>
              <ul class="flex gap-2 items-end">
                {extraLinks?.items?.map((items) => (
                  <li class="opacity-[.3] transition duration-300 hover:opacity-100">
                    <a href={items.href}>
                      <Image
                        class="object-contain max-h-[40px]"
                        src={items.image}
                        alt={items.alt}
                        width={70}
                        height={40}
                        loading="lazy"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </>
  );
}
