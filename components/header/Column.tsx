import type { Column, NavItem } from "../../loaders/Header/Menu.ts";

const Item = ({ title, link, isBlank }: NavItem) => {
  return (
    <li class="text-sm font-light">
      <a
        href={link}
        target={isBlank ? "_blank" : "_self"}
        rel={isBlank ? "noopener noreferrer" : ""}
      >
        {title}
      </a>
    </li>
  );
};

function Column({ categories }: Column) {
  return (
    <ul class="flex flex-col w-32 gap-14">
      {/** this may have less gap */}
      {categories.map((category) => (
        <li class="flex flex-col gap-3 w-full">
          <a
            href={category.link}
            target={category?.isBlank ? "_blank" : "_self"}
            rel={category?.isBlank ? "noopener noreferrer" : ""}
            class="font-bold text-base"
          >
            {category.title}
          </a>
          <ul class="flex flex-col gap-2">
            {category.navItems.map((item) => <Item {...item} />)}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Column;
