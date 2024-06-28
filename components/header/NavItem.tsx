import Image from "apps/website/components/Image.tsx";
import type { Department } from "../../loaders/Header/Menu.ts";
import { NAVBAR_HEIGHT } from "../../constants.tsx";
import Column from "./Column.tsx";

const IMAGE_WIDTH = 259;
const IMAGE_HEIGHT = 358;

function NavItem({ title, collums, link, isBlank, image, color }: Department) {
  const isLeft = image?.position === "left";
  return (
    <li class="group flex items-center h-full">
      <a
        href={link}
        target={isBlank ? "_blank" : "_self"}
        rel={isBlank ? "noopener noreferrer" : ""}
      >
        <p class="text-base font-normal group-hover:border-b-2 border-black group-has-[li:hover]/header:text-black group-has-[input:checked]/header:text-white" style={{ color }}>
          {title}
        </p>
      </a>
      <div
        class="absolute group-hover:opacity-100 group-hover:pointer-events-auto group-has-[input:checked]/header:transition-opacity group-has-[input:checked]/header:duration-500 shadow-sm pointer-events-none opacity-0 w-full border-t border-[#DEDEDE] bg-white z-50"
        style={{ top: NAVBAR_HEIGHT, left: 0 }}
      >
        <div class="container flex justify-start gap-16 py-8">
          {isLeft && image?.src && (
            <Image
              class="flex-shrink-0"
              src={image.src}
              alt={image.alt}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            />
          )}
          <ul class="flex items-start gap-12 w-full">
            {collums.map((column) => <Column {...column} />)}
          </ul>
          {!isLeft && image?.src && (
            <Image
              class="flex-shrink-0"
              src={image.src}
              alt={image.alt}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default NavItem;
