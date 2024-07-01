import type { Menu } from "../../loaders/Header/Menu.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import NavItem from "./NavItem.tsx";
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from "../../constants.tsx";
import Image from "apps/website/components/Image.tsx";
import Search, { SearchbarProps } from "../search/Searchbar/Form.tsx";
import Wishlist from "./buttons/Wishlist.tsx";
import Account from "./buttons/Account.tsx";
import Cart from "./buttons/Minicart.tsx";
import MenuButton from "./buttons/Menu.tsx";
import MenuDrawer from "./Menu.tsx";

export interface NavBar {
  logo: ImageWidget;
  menu: Menu;
  /** @title Barra de pesquisa */
  searchBar?: SearchbarProps;
  /** 
   * @hide 
   */
  isDesktop?: boolean;
}

function NavBar({ logo, menu, searchBar, isDesktop }: NavBar) {
  return (
    <div
      class="flex items-center gap-16 justify-between bg-white group-has-[li:hover]/header:bg-white group-has-[#menu:checked]/header:!bg-white group-has-[#header-transparent:checked]/header:bg-transparent transition-colors duration-500 relative"
      style={{ height: isDesktop ? NAVBAR_HEIGHT : NAVBAR_HEIGHT_MOBILE }}
    >
      <div class="flex items-center justify-between h-full container">
        {/** DESKTOP */}
        {isDesktop && (
          <>
            <div class="flex items-center gap-16 justify-start h-full w-full max-xl:hidden">
              <Image src={logo} alt="usereserva" width={27} height={32} />
              <ul class="flex flex-start gap-12 h-full">
                {menu.links.map((department) => <NavItem {...department} />)}
              </ul>
            </div>
            <div class="flex items-center justify-end h-full w-full gap-16 max-xl:hidden">
              <Search {...searchBar} />
              <div class="flex items-center justify-start gap-5">
                <Wishlist />
                <Account />
                <Cart />
              </div>
            </div>
          </>
        )}
        <>
          {/** MOBILE */}
          <div class="flex flex-col w-full xl:hidden gap-[6px]">
            <div class="flex items-center justify-between h-full w-full">
              <MenuButton />
              <Image src={logo} alt="usereserva" width={27} height={32} loading={"lazy"} />
              <Cart />
            </div>
            <Search {...searchBar} />
          </div>
          <MenuDrawer isDesktop={isDesktop} />
        </>
      </div>
    </div>
  );
}

export default NavBar;
