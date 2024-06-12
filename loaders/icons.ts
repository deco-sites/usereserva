import { allowCorsFor, FnContext } from "deco/mod.ts";

const icons = [
  { component: "S", label: "Small", prop: "fontSize" },
  { component: "M", label: "Normal", prop: "fontSize" },
  { component: "L", label: "Large", prop: "fontSize" },
];

// Used to load icons that will be used for ButtonGroup widgets.
// The file adminIcons.ts contains all available icons in a string format, and this loader maps them to the format expected by the button-group widget.
export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  // Mapping icons to { value, label }
  const iconsMap = icons.map((icon) => ({
    value: icon.component,
    label: icon.label,
    prop: icon.prop,
  }));

  return iconsMap;
}
