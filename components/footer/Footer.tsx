import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import BackToTop from "../../components/footer/BackToTop.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Contact from "../../components/footer/Contact.tsx";
import Newsletter from "../../components/footer/Newsletter.tsx";
import { AvailableIcons } from "../../components/ui/Icon.tsx";
import Social from "../../components/footer/Social.tsx";
import { clx } from "../../sdk/clx.ts";
import type { SectionProps } from "deco/mod.ts";
import { loader } from "../../components/footer/loader/newsletter.ts";

export interface NewsletterForm {
  placeholderName?: string;
  placeholderEmail?: string;
  buttonText?: string;
}
export interface MobileApps {
  apple?: string;
  android?: string;
}
export type Image = {
  image: ImageWidget;
  href: string;
  alt: string;
};

export type ExtraLinks = {
  label: string;
  items: Image[];
};
export type FooterImage = {
  image: ImageWidget;
  title: string;
  description: string;
};
export type Item = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  href: string;
  icon: AvailableIcons;
  description: string;
};

export type Contact = {
  title: string;
  items: ContactItem[];
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label: "Facebook" | "Instagram" | "Tiktok" | "Twitter" | "Linkedin";
  link: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
}

export interface Props {
  newsletter?: {
    icon?: AvailableIcons;
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
    mobileApps?: MobileApps;
  };
  sections?: Section[];
  contact?: Contact[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  footerImage?: FooterImage[];
  extraLinks?: ExtraLinks[];
  backToTheTop?: {
    text?: string;
  };
  copyright?: string;
  layout?: Layout;
}

const LAYOUT = {
  Primary: "bg-primary text-primary-content",
  Secondary: "bg-secondary text-secondary-content",
  Accent: "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  newsletter = {},
  sections = [
    {
      label: "Sobre a Reserva",
      items: [
        {
          href: "/",
          label: "1P=5P",
        },
        {
          href: "/",
          label: "Cultura",
        },
        {
          href: "/",
          label: "Sustentabilidade",
        },
        {
          href: "/",
          label: "Quem Faz",
        },
        {
          href: "/",
          label: "Mapa de Categorias",
        },
      ],
    },
    {
      label: "Vem pra Reserva",
      items: [
        {
          href: "/",
          label: "Seja um Franqueado",
        },
        {
          href: "/",
          label: "Nossas Lojas",
        },
        {
          href: "/",
          label: "Trabalhe Conosco",
        },
      ],
    },
    {
      label: "Minha Conta",
      items: [
        {
          href: "/",
          label: "Favoritos",
        },
        {
          href: "/",
          label: "Meus Pedidos",
        },
        {
          href: "/",
          label: "Minha Carteira",
        },
        {
          href: "/",
          label: "Meu Cartão Presente",
        },
      ],
    },
    {
      label: "Suporte",
      items: [
        {
          href: "/",
          label: "Política de Privacidade",
        },
        {
          href: "/",
          label: "Termos de Uso",
        },
        {
          href: "/",
          label: "Dúvidas Frequentes",
        },
        {
          href: "/",
          label: "Compromisso Best Friday",
        },
        {
          href: "/",
          label: "Regulamento ação 1 ano de Reserva",
        },
        {
          href: "/",
          label: "Troca e Devolução",
        },
        {
          href: "/",
          label: "Regulamento Roleta Premiada",
        },
      ],
    },
  ],
  social = {
    title: "",
    items: [
      { label: "Facebook", link: "/" },
      { label: "Instagram", link: "/" },
      { label: "Tiktok", link: "/" },
      { label: "Twitter", link: "/" },
      { label: "Linkedin", link: "/" },
    ],
  },
  extraLinks = [
    {
      label: "Somos com Orgulho",
      items: [
        {
          alt: "Somos com Orgulho",
          href: "",
          image: "https://lojausereserva.vtexassets.com/arquivos/empb2x.png",
        },
        {
          alt: "",
          href: "",
          image: "https://lojausereserva.vtexassets.com/arquivos/capit2x.png",
        },
      ],
    },
    {
      label: "Navegue por Marcas",
      items: [
        {
          alt: "",
          href: "/",
          image: "https://lojausereserva.vtexassets.com/arquivos/rsvx1.png",
        },
        {
          alt: "",
          href: "/",
          image: "https://lojausereserva.vtexassets.com/arquivos/rsvminix1.png",
        },
        {
          alt: "",
          href: "/",
          image: "https://lojausereserva.vtexassets.com/arquivos/rsvgox1.png",
        },
        {
          alt: "",
          href: "/",
          image: "https://lojausereserva.vtexassets.com/arquivos/rvsx1.png",
        },
      ],
    },
    {
      label: "Certificações",
      items: [
        {
          alt: "",
          href: "",
          image: "https://lojausereserva.vtexassets.com/arquivos/letse2x.png",
        },
        {
          alt: "",
          href: "",
          image: "https://lojausereserva.vtexassets.com/arquivos/ebit2x.png",
        },
        {
          alt: "",
          href: "",
          image: "https://lojausereserva.vtexassets.com/arquivos/recla2x.png",
        },
      ],
    },
  ],
  contact = [
    {
      title: "Atendimento",
      items: [
        {
          href: "/",
          label: "Atendimento em libras",
          icon: "Libra",
          description: "",
        },
        {
          href: "/",
          label: "WhatsApp Reserva",
          icon: "FooterWhatsapp",
          description: "Segunda a Sexta: 08h às 20h Sábados: 08h às 18h",
        },
        {
          href: "/",
          label: "Solicite sua troca aqui",
          icon: "Exchange",
          description: "",
        },
      ],
    },
  ],
  footerImage = [
    {
      image: "https://lojausereserva.vtexassets.com/arquivos/entr3x.png",
      title: "Entrega Internacional",
      description: "Entrega para mais de 40 países de forma rápida e segura.",
    },
    {
      image: "https://lojausereserva.vtexassets.com/arquivos/1p5px2.png",
      title: "1P=5P",
      description:
        "A cada peça vendida, 5 pratos de comida são viabilizados para quem tem fome.",
    },
    {
      image: "https://lojausereserva.vtexassets.com/arquivos/trocax2.png",
      title: "Troca Facilitada",
      description:
        "Compre no site ou app e troque em uma das lojas em até 7 dias.",
    },
  ],
  copyright =
    "AREZZO INDUSTRIA E COMERCIO S.A | CNPJ: 16.590.234/0064-50 | Inscrição Estadual: 12297378 | AV ARTHUR ANTONIO SENDAS, 999 - GALPÃO 300 - PARQUE JURITI - SAO JOÃO DE MERITI | CEP: 25585-085 - RJ",
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
  },
  invalidEmail,
  invalidName,
  newsletterSuccess,
}: SectionProps<typeof loader>) {
  return (
    <footer
      class={clx(
        "w-full flex flex-col font-reserva-sans",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <Newsletter
        icon={newsletter.icon}
        title={newsletter.title}
        description={newsletter.description}
        form={newsletter.form}
        mobileApps={newsletter.mobileApps}
        invalidEmail={invalidEmail || false}
        invalidName={invalidName || false}
        newsletterSuccess={newsletterSuccess || false}
      />
      <div class="xl:container p-8">
        <div class="flex flex-col">
          <div class="flex flex-col xl:flex-row xl:justify-between">
            <div class="order-2 xl:order-none flex flex-col xl:flex-row">
              <FooterItems sections={sections} />
            </div>
            <div class="order-1 xl:order-none pb-5 xl:pb-0 xl:max-w-md">
              <Contact content={contact} />
              <Social content={social} />
            </div>
          </div>
          <div class="flex flex-col lg:flex-row gap-10 py-12 max-w-3xl mx-auto">
            {footerImage.map((image, index) => (
              <div class="flex flex-col items-center" key={index}>
                <figure>
                  <Image
                    class="object-contain"
                    src={image.image}
                    alt={image.title}
                    width={70}
                    height={70}
                    loading="lazy"
                  />
                </figure>
                <p class="text-lg font-reserva-sans font-bold text-accent opacity-[.5]">
                  {image.title}
                </p>
                <span class="text-[13px] font-reserva-sans text-[#8a8c8e] font-light text-center">
                  {image.description}
                </span>
              </div>
            ))}
          </div>
          <div class="flex flex-col justify-between lg:flex-row gap-5">
            <ExtraLinks content={extraLinks} />
          </div>
        </div>
      </div>
      <div class="p-2.5 bg-[#f0f0f0] flex justify-center">
        <p class="font-reserva-sans text-xs tracking-[.005em] opacity-[.5]">
          {copyright}
        </p>
      </div>
      <BackToTop content={backToTheTop?.text} />
    </footer>
  );
}

export default Footer;
