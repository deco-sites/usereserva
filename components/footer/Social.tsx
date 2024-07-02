import Icon from "../../components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export default function Social(
  { content }: {
    content?: { title?: string; items?: SocialItem[] };
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div>
          {content.title && <h3 class="text-lg">{content.title}</h3>}
          <ul
            class={"flex gap-4 mt-4"}
          >
            {content.items.map((item) => {
              return (
                <li class="opacity-[.3] transition duration-300 hover:opacity-100">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex items-center"
                  >
                    <span class="block p-1 rounded-full">
                      <Icon size={20} id={item.label} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
