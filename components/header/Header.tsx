import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from "../../constants.tsx";
import Alert, { Alert as IAlert } from "./Alert.tsx";
import NavBar, { NavBar as INavBar } from "./NavBar.tsx";
import MenuDrawer from "./Menu.tsx";
import { AppContext } from "../../apps/site.ts";
import { useScriptAsDataURI } from "deco/hooks/useScript.ts";

export interface Props {
  /** @title Alerta */
  Alert: IAlert;
  navBar: INavBar;
  /** @title É Transparente? */
  isTransparent?: boolean;

  /**
   * @hide
   */
  displayMenuContents?: boolean;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, isDesktop: ctx.device === "desktop" };
};

export const ScrollJS = ({ isTransparent }: { isTransparent?: boolean }) => {
  const setup = ({ isTransparent }: { isTransparent?: boolean }) => {
    const header = document.getElementById("header") as HTMLElement;
    const alert = document.getElementById("alert") as HTMLElement;
    const inputTransparent = document.getElementById(
      "header-transparent",
    ) as HTMLInputElement;
    const ALERT_HEIGHT = 32;
    const changeHeader = () => {
      if (globalThis.scrollY > ALERT_HEIGHT) {
        header.classList.remove("absolute");
        header.classList.add("fixed");
        alert.classList.add("hidden");
        if (isTransparent) {
          inputTransparent.checked = false;
        }
      } else if (globalThis.scrollY < ALERT_HEIGHT) {
        header.classList.remove("fixed");
        alert.classList.remove("hidden");
        header.classList.add("absolute");
        if (isTransparent) {
          inputTransparent.checked = true;
        }
      }
    };

    addEventListener("scroll", changeHeader);
  };

  return <script src={useScriptAsDataURI(setup, { isTransparent })} />;
};

function Header({ isTransparent, ...props }: ReturnType<typeof loader>) {
  if (props.displayMenuContents) {
    return <MenuDrawer.content {...props.navBar.menu} />;
  }

  const style = {
    height: props.isDesktop ? HEADER_HEIGHT : HEADER_HEIGHT_MOBILE,
  };

  return (
    <div class="group/header" style={{ ...(!isTransparent && style) }}>
      <input
        class="hidden"
        type="checkbox"
        id="header-transparent"
        checked={isTransparent}
      />
      <header
        class="w-full absolute z-50 max-xl:flex max-xl:flex-col top-0"
        id="header"
      >
        <Alert {...props.Alert} />
        <NavBar {...props.navBar} isDesktop={props.isDesktop} />
      </header>
      <ScrollJS isTransparent={isTransparent} />
    </div>
  );
}

export default Header;
