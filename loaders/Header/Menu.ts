import { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "../../apps/site.ts";

export interface Image {
  src?: ImageWidget;
  alt?: string;
  position: "left" | "right";
}

export interface NavItem {
  title: string;
  isBlank?: boolean;
  link: string;
}

export interface Category {
  title: string;
  link: string;
  isBlank?: boolean;
  navItems: NavItem[];
}

export interface Column {
  categories: Category[];
}

/** @titleBy title */
export interface Department {
  /** @title Título */
  title: string;
  /**
   * @format color-input
   * @title Cor do Título
   */
  color?: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  /** @title Colunas */
  collums: Column[];
  image?: Image;
}

export interface Menu {
  links: Department[];
}

export default function loader(
  props: { menu: Department[] },
  _req: Request,
  _ctx: AppContext,
): Menu {
  return { links: props.menu };
}
