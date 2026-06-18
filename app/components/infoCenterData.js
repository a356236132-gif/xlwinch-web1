import { seoBlogArticles } from "./seoBlogArticles";

export const infoCategories = [
  {
    title: "Blog",
    href: "/blog",
    description: "Industry insights, buyer education and project inspiration for stage lighting teams."
  },
  {
    title: "News",
    href: "/news",
    description: "Company updates, product announcements, factory news and project delivery notes."
  },
  {
    title: "Exhibitions",
    href: "/exhibitions",
    description: "Trade show updates, booth highlights, event recaps and global lighting industry moments."
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Answers for MOQ, lead time, warranty, shipping, OEM service and technical support."
  },
  {
    title: "Knowledge",
    href: "/knowledge",
    description: "Technical guides for DMX512, Art-Net, MADRIX, installation and kinetic lighting basics."
  }
];

const rawResourceArticles = {
  blog: [
    ...seoBlogArticles,
    {
      category: "Blog",
      title: "How Kinetic Lights Transform Event Experiences",
      date: "2026-06-02",
      excerpt:
        "A practical look at how moving light objects create stronger visual storytelling for concerts, weddings and venue installations.",
      image: "/assets/hero-concert-banner.jpg"
    },
    {
      category: "Blog",
      title: "Choosing The Right Moving Head Light",
      date: "2026-05-25",
      excerpt:
        "Compare beam, spot, wash and hybrid fixtures before planning your next rental inventory or fixed installation.",
      image: "/assets/product-led-bsw-front.jpg"
    },
    {
      category: "Blog",
      title: "Stage Lighting Trends For 2026",
      date: "2026-05-18",
      excerpt:
        "Explore the design trends shaping touring shows, clubs, theaters and commercial spaces in 2026.",
      image: "/assets/hero-xk16c.jpg"
    },
    {
      category: "Blog",
      title: "Wedding Lighting Design Ideas",
      date: "2026-05-08",
      excerpt:
        "Use kinetic movement, beam effects and warm scene transitions to create memorable wedding productions.",
      image: "/assets/exhibition.jpg"
    },
    {
      category: "Blog",
      title: "Rental Business Growth Strategies",
      date: "2026-04-29",
      excerpt:
        "How rental companies can build differentiated lighting packages for premium events and production buyers.",
      image: "/assets/xk16c-product.jpg"
    }
  ],
  news: [
    {
      category: "News",
      title: "New Kinetic Lighting Product Planning For Global Projects",
      date: "2026-06-06",
      excerpt:
        "XLIGHTING continues product planning around kinetic systems for rental, integration and installation buyers.",
      image: "/assets/xk16c-product.jpg"
    },
    {
      category: "News",
      title: "Factory Testing Workflow For Stage Lighting Orders",
      date: "2026-05-28",
      excerpt:
        "A closer look at how product testing, packaging and documentation support export project delivery.",
      image: "/assets/about-team-wide.jpg"
    },
    {
      category: "News",
      title: "Project Delivery Updates For Overseas Buyers",
      date: "2026-05-16",
      excerpt:
        "Updates on production coordination, shipment planning and technical communication for international clients.",
      image: "/assets/hero-concert-banner.jpg"
    }
  ],
  exhibitions: [
    {
      category: "Exhibitions",
      title: "Trade Show Planning For Stage Lighting Buyers",
      date: "2026-06-01",
      excerpt:
        "What rental companies and distributors can prepare before visiting a professional lighting exhibition booth.",
      image: "/assets/exhibition.jpg"
    },
    {
      category: "Exhibitions",
      title: "Kinetic Lighting Booth Demonstration Ideas",
      date: "2026-05-20",
      excerpt:
        "How beam rings, lifting balls and winch systems can be presented clearly in exhibition environments.",
      image: "/assets/hero-xk16c.jpg"
    },
    {
      category: "Exhibitions",
      title: "Global Event Follow-Up Checklist",
      date: "2026-05-05",
      excerpt:
        "A structured checklist for turning exhibition conversations into product quotes and technical proposals.",
      image: "/assets/hero-concert-banner.jpg"
    }
  ],
  knowledge: [
    {
      category: "Knowledge",
      title: "DMX512 Basics For Kinetic Lighting Systems",
      date: "2026-06-04",
      excerpt:
        "Understand channels, addressing and scene control before planning kinetic lighting movement and effects.",
      image: "/assets/hero-xk16c.jpg"
    },
    {
      category: "Knowledge",
      title: "Art-Net Control Guide For Stage Lighting Projects",
      date: "2026-05-27",
      excerpt:
        "Learn how network control can support large fixture counts and more flexible stage lighting programming.",
      image: "/assets/hero-concert-banner.jpg"
    },
    {
      category: "Knowledge",
      title: "MADRIX Tutorial For Kinetic Light Installations",
      date: "2026-05-22",
      excerpt:
        "A starter guide to pixel mapping, cue planning and dynamic effects for professional lighting installations.",
      image: "/assets/xk16c-product.jpg"
    },
    {
      category: "Knowledge",
      title: "Kinetic Lighting Guide For First-Time Buyers",
      date: "2026-05-12",
      excerpt:
        "Key product, control, safety and installation factors to confirm before starting a kinetic lighting project.",
      image: "/assets/product-led-bsw-back.jpg"
    },
    {
      category: "Knowledge",
      title: "Stage Lighting Basics For Event Production",
      date: "2026-04-30",
      excerpt:
        "A practical introduction to fixture types, beam effects, control systems and application planning.",
      image: "/assets/product-led-bsw-front.jpg"
    },
    {
      category: "Knowledge",
      title: "Product Installation Tutorial Planning",
      date: "2026-04-20",
      excerpt:
        "What information to prepare for safer installation, cleaner commissioning and faster technical support.",
      image: "/assets/about-team-wide.jpg"
    }
  ]
};

const sectionPaths = {
  blog: "/blog",
  news: "/news",
  exhibitions: "/exhibitions",
  knowledge: "/knowledge"
};

export function slugifyArticleTitle(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildArticleBody(article) {
  return [
    article.excerpt,
    "For global B2B buyers, the key is not only the visual effect. A successful lighting project also depends on fixture selection, control compatibility, delivery planning, safety communication and after-sales support.",
    "Before requesting a quotation, prepare the venue type, ceiling or truss height, expected quantity, control system, installation timeline and destination country. These details help the manufacturer recommend a practical product configuration.",
    "For kinetic lighting projects, buyers should confirm lifting height, load requirements, DMX or network control workflow, installation environment and maintenance access. Clear early communication reduces project risk and speeds up technical confirmation.",
    "XLIGHTING supports rental companies, system integrators, event production teams and venue owners with stage lighting products, OEM/ODM communication and project-based quotation support from Guangzhou, China."
  ];
}

export const resourceArticles = Object.fromEntries(
  Object.entries(rawResourceArticles).map(([section, articles]) => [
    section,
    articles.map((article) => {
      const slug = article.slug || slugifyArticleTitle(article.title);

      return {
        ...article,
        slug,
        href: `${sectionPaths[section]}/${slug}`,
        body: article.body || buildArticleBody(article)
      };
    })
  ])
);

export function getArticle(section, slug) {
  return resourceArticles[section]?.find((article) => article.slug === slug);
}

export function getAllArticles() {
  return Object.entries(resourceArticles).flatMap(([section, articles]) =>
    articles.map((article) => ({ ...article, section }))
  );
}

export const faqItems = [
  {
    question: "What is your MOQ?",
    answer:
      "MOQ depends on the product model and customization level. For standard products, our sales team can confirm the most practical order quantity after reviewing your project."
  },
  {
    question: "What is the typical lead time?",
    answer:
      "Lead time varies by product, order quantity and production schedule. Standard project communication usually includes production timing, testing time and shipping preparation."
  },
  {
    question: "Do you support OEM service?",
    answer:
      "Yes. XLIGHTING supports OEM and ODM cooperation for qualified B2B projects, including product configuration, branding support and project-specific communication."
  },
  {
    question: "What warranty do you provide?",
    answer:
      "Warranty terms depend on product type and order details. We recommend confirming the exact warranty policy with your quotation and product specification sheet."
  },
  {
    question: "Can you arrange shipping?",
    answer:
      "We can support international shipment coordination and provide packaging information for stage lighting products based on the order and destination."
  },
  {
    question: "Are your products compatible with DMX?",
    answer:
      "Many XLIGHTING products support DMX control. Specific channel modes, control options and compatibility details should be checked on the product parameter sheet."
  },
  {
    question: "Do you provide installation support?",
    answer:
      "For project buyers, we can provide product information, wiring guidance and technical communication to support installation planning and commissioning."
  }
];

export const latestArticles = [
  resourceArticles.blog[0],
  resourceArticles.news[0],
  resourceArticles.exhibitions[0],
  resourceArticles.knowledge[0],
  resourceArticles.blog[1],
  resourceArticles.news[1]
];
