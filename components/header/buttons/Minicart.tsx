import Icon from "../../ui/Icon.tsx";

function Minicart() {
  return (
    <div class="w-6 h-6">
      <Icon
        id="Cart"
        width={18}
        height={18}
        class="text-[#1C1B1F] hover:text-[#e4022b] group-has-[li:hover]/header:text-black group-has-[#menu:checked]/header:text-black group-has-[input:checked]/header:text-white transition-all hover:w-5 h-5"
      />
    </div>
  );
}

export default Minicart;
