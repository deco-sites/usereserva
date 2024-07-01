import { MENU_INPUT_ID } from "../../../constants.tsx";
import Icon from "../../ui/Icon.tsx";

function Menu() {
  return (
    <label
      htmlFor={MENU_INPUT_ID}
      class="w-6 h-6 swap group/menu group-has-[#menu:checked]/header:swap-active swap-rotate"
    >
      <Icon
        id="MenuHamburguer"
        width={17}
        height={18}
        class="swap-off text-[#1C1B1F] group-hover/menu:!text-[#e4022b] group-has-[li:hover]/header:text-black group-has-[#menu:checked]/header:text-black group-has-[#header-transparent:checked]/header:text-white transition-all"
      />
      <Icon
        id="X"
        width={15}
        height={15}
        class="swap-on text-[#1C1B1F] group-hover/menu:!text-[#e4022b] group-has-[li:hover]/header:text-black group-has-[#menu:checked]/header:text-black group-has-[input:checked]/header:text-white transition-all"
      />
    </label>
  );
}

export default Menu;
