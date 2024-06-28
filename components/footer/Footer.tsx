import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import BackToTop from "../../components/footer/BackToTop.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Contact from "../../components/footer/Contact.tsx";
import Logo from "../../components/footer/Logo.tsx";
import { AvailableIcons } from "../../components/ui/Icon.tsx";
/* import MobileApps from "../../components/footer/MobileApps.tsx"; */
import Social from "../../components/footer/Social.tsx";
import { clx } from "../../sdk/clx.ts";

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

export type ItemContact = {
  label: string;
  items: ContactItem[];
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Facebook"
    | "Instagram"
    | "Tiktok"
    | "Twitter"
    | "Linkedin";
  link: string;
}

/* export interface MobileApps {
  apple?: string;
  android?: string;
} */

/* export interface NewsletterForm {
  placeholderName?: string;
  placeholderEmail?: string;
  buttonText?: string;
  /** @format html */
/* helpText?: string;/*  */
/* } */

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    /*  newsletter?: boolean; */
    sectionLinks?: boolean;
    socialLinks?: boolean;
    /*     mobileApps?: boolean; */
    extraLinks?: boolean;
    contact?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  /*   newsletter?: {
    icon?: AvailableIcons;
    title?: string;
    /** @format textarea */
  /*     description?: string;
    form?: NewsletterForm;
    mobileApps?: MobileApps;
  }; */
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  extraLinks?: Item[];
  contact?: ItemContact[];
  backToTheTop?: {
    text?: string;
  };
  footerImage?: FooterImage[];
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  /*   newsletter = {
    icon: "Deco",
    title: "Newsletter",
    description: "",
    form: {
      placeholderName: "",
      placeholderEmail: "",
      buttonText: "",
      helpText: "",
    },
    mobileApps: { apple: "/", android: "/" },
  }, */
  sections = [{
    "label": "Sobre a Reserva",
    "items": [
      {
        "href": "/",
        "label": "1P=5P",
      },
      {
        "href": "/",
        "label": "Cultura",
      },
      {
        "href": "/",
        "label": "Sustentabilidade",
      },
      {
        "href": "/",
        "label": "Quem Faz",
      },
      {
        "href": "/",
        "label": "Mapa de Categorias",
      },
    ],
  }, {
    "label": "Vem pra Reserva",
    "items": [
      {
        "href": "/",
        "label": "Seja um Franqueado",
      },
      {
        "href": "/",
        "label": "Nossas Lojas",
      },
      {
        "href": "/",
        "label": "Trabalhe Conosco",
      },
    ],
  }, {
    "label": "Minha Conta",
    "items": [
      {
        "href": "/",
        "label": "Favoritos",
      },
      {
        "href": "/",
        "label": "Meus Pedidos",
      },
      {
        "href": "/",
        "label": "Minha Carteira",
      },
      {
        "href": "/",
        "label": "Meu Cartão Presente",
      },
    ],
  }, {
    "label": "Suporte",
    "items": [
      {
        "href": "/",
        "label": "Política de Privacidade",
      },
      {
        "href": "/",
        "label": "Termos de Uso",
      },
      {
        "href": "/",
        "label": "Dúvidas Frequentes",
      },
      {
        "href": "/",
        "label": "Compromisso Best Friday",
      },
      {
        "href": "/",
        "label": "Regulamento ação 1 ano de Reserva",
      },
      {
        "href": "/",
        "label": "Troca e Devolução",
      },
      {
        "href": "/",
        "label": "Regulamento Roleta Premiada",
      },
    ],
  }],
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
  extraLinks = [],
  contact = [{
    "label": "Atendimento",
    "items": [{
      "href": "/",
      "label": "WhatsApp Reserva",
      "icon": "FooterWhatsapp",
      "description": "Segunda a Sexta: 08h às 20h Sábados: 08h às 18h",
    }, {
      "href": "/",
      "label": "Atendimento em libras",
      "icon": "Libra",
      "description": "",
    }, {
      "href": "/",
      "label": "Solicite sua troca aqui",
      "icon": "Exchange",
      "description": "",
    }],
  }],
  footerImage = [{
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    title: "Enrega Internacional",
    description: "Entrega para mais de 40 países de forma rápida e segura.",
  }, {
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    title: "Enrega Internacional",
    description: "Entrega para mais de 40 países de forma rápida e segura.",
  }, {
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    title: "Enrega Internacional",
    description: "Entrega para mais de 40 países de forma rápida e segura.",
  }],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 5",
    hide: {
      logo: false,
      /* newsletter: false, */
      sectionLinks: false,
      socialLinks: false,
      /*       mobileApps: false, */
      extraLinks: false,
      contact: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;
  const _contact = layout?.hide?.contact
    ? <></>
    : <Contact content={contact} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col p-8 font-reserva-sans",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="xl:container">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
            </div>
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
              </div>
            </div>
            {/*   <Divider /> */}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_sectionLinks}
              </div>
            </div>
            {/*      <Divider /> */}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col">
            {_logo}
            <div class="flex flex-col xl:flex-row xl:justify-between">
              <div class="order-2 xl:order-none flex flex-col xl:flex-row">
                {_sectionLinks}
              </div>
              <div class="order-1 xl:order-none pb-5 xl:pb-0">
                {_contact}
                {_social}
              </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-10 py-12">
              {footerImage.map((image, index) => (
                <div class="flex flex-col items-center" key={index}>
                  <figure>
                    <Image
                      class="card"
                      src={image.image}
                      alt={image.title}
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                  </figure>
                  <p class="text-lg font-reserva-sans text-accent">
                    {image.title}
                  </p>
                  <span class="text-sm font-reserva-sans text-accent font-light">
                    {image.description}
                  </span>
                </div>
              ))}
            </div>
            <div class="flex flex-col-reverse md:flex-row md:justify-between">
              teste
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {/*  {layout?.hide?.newsletter ? <></> : <Divider />} */}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  {
                    /*                   <div class="lg:flex-auto">
                    {_payments}
                  </div> */
                  }
                  <div class="lg:flex-auto">
                    {/*     {_social} */}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {/*  {_region} */}
                  {/* {_apps} */}
                </div>
              </div>
            </div>
            {/* <Divider /> */}
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              {/*   <PoweredByDeco /> */}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {/*  {layout?.hide?.newsletter ? <></> : <Divider />} */}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {/*  {_social} */}
              </div>
            </div>
            {/*  <Divider /> */}
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              {/* <PoweredByDeco /> */}
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {/*  {_region} */}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
