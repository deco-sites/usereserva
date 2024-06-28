import { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "../../apps/site.ts";
import { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface Image {
  src?: ImageWidget;
  alt?: string;
  /** @title Posição */
  position: "left" | "right";
  link?: string;
}

/** @titleBy title */
export interface NavItem {
  /** @title Título */
  title: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  link: string;
}

/** @titleBy title */
export interface Category {
  /** @title Título */
  title: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  /** @title Itens da navegação */
  navItems: NavItem[];
}

export interface Column {
  /** @title Categorias */
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

/** @titleBy title */
export interface ExtraLink {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  /** @title Título */
  title: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
}
export interface Menu {
  links: Department[];
  extraLinks?: ExtraLink[];
}

export default function loader(
  props: { menu: Department[]; extraLinks?: ExtraLink[] },
  _req: Request,
  _ctx: AppContext,
): Menu {
  return { links: props.menu, ...props };
}
