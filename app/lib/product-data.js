import uploadedProducts from "../../content/products.json";

const baseProducts = [
  {
    slug: "x-k16c-pro",
    href: "/products/x-k16c-pro",
    title: "X-K16C PRO Beam Ring D90",
    eyebrow: "Flying Beam Ring System",
    image: "/assets/xk16c-product.jpg",
    summary:
      "A flying beam ring kinetic lighting system with RGBW LEDs, 0-8m lifting height and DMX512 / MADRIX control for concerts, clubs and touring productions.",
    applications: "Concerts, clubs, TV shows, theaters, weddings and immersive venues",
    specs: [
      ["LED Source", "48x20W RGBW LEDs"],
      ["Lifting Height", "0-8 meters"],
      ["Ring Diameter", "900mm"],
      ["Control", "DMX512 / MADRIX"]
    ],
    features: [
      "360-degree downward beam ring effect",
      "Smooth kinetic lifting movement",
      "Professional DMX512 / MADRIX workflow",
      "OEM/ODM and project configuration support"
    ]
  },
  {
    slug: "xlwinch",
    href: "/products/xlwinch",
    title: "XLWINCH Kinetic Winch System",
    eyebrow: "Kinetic Lifting Core",
    image: "/assets/hero-xk16c.jpg",
    summary:
      "A professional kinetic winch platform for lifting balls, tubes, rings and custom scenic fixtures in stage and venue projects.",
    applications: "Rental systems, fixed installations, concerts, clubs and commercial atriums",
    specs: [
      ["Control", "DMX / project control system"],
      ["Use", "Suspended kinetic fixtures"],
      ["Support", "Project-based configuration"],
      ["Service", "OEM/ODM available"]
    ],
    features: [
      "Designed for repeatable vertical movement",
      "Supports multiple suspended lighting objects",
      "Suitable for custom kinetic show layouts",
      "Factory communication for rigging and control planning"
    ]
  },
  {
    slug: "kinetic-ball",
    href: "/products/kinetic-ball",
    title: "Kinetic LED Lifting Ball",
    eyebrow: "Suspended Light Ball",
    image: "/assets/hero-concert-banner.jpg",
    summary:
      "Suspended LED lifting balls for dynamic arrays, ceiling movement and immersive stage scenes in events and venues.",
    applications: "Concerts, weddings, clubs, theaters, churches and event productions",
    specs: [
      ["Effect", "Vertical kinetic movement"],
      ["Layout", "Single fixture or large arrays"],
      ["Control", "DMX project control"],
      ["Customization", "Color, quantity and show layout support"]
    ],
    features: [
      "Strong visual impact in repeated arrays",
      "Smooth motion for reveal moments and show cues",
      "Works with XLWINCH project systems",
      "Useful for premium event and venue installations"
    ]
  },
  {
    slug: "kinetic-tube",
    href: "/products/kinetic-tube",
    title: "Kinetic LED Tube",
    eyebrow: "Linear Motion Lighting",
    image: "/assets/product-led-bsw-back.jpg",
    summary:
      "Linear kinetic LED fixtures for vertical movement, pixel-style lighting and architectural stage effects.",
    applications: "Nightclubs, live stages, exhibitions, atriums and commercial spaces",
    specs: [
      ["Fixture Type", "Linear LED kinetic fixture"],
      ["Effect", "Moving lines and spatial arrays"],
      ["Control", "DMX / pixel project planning"],
      ["Project Use", "Stage and installation design"]
    ],
    features: [
      "Creates clean linear movement overhead",
      "Good for ceiling arrays and immersive environments",
      "Can be planned with lighting control systems",
      "Flexible for custom stage and commercial projects"
    ]
  },
  {
    slug: "smart-series",
    href: "/products/smart-series",
    title: "SMART Series Stage Lighting",
    eyebrow: "Compact Stage Fixture Line",
    image: "/assets/product-led-bsw-front.jpg",
    summary:
      "Compact control-ready stage lighting products for rental companies, events and permanent installations.",
    applications: "Small to mid-size events, rental inventory, venues and commercial shows",
    specs: [
      ["Category", "Professional stage lighting"],
      ["Use", "Rental and installation"],
      ["Support", "Product matching and quote"],
      ["Service", "Factory direct supply"]
    ],
    features: [
      "Practical product line for B2B buyers",
      "Supports mixed rental packages",
      "Suitable for event and venue upgrades",
      "Direct communication with manufacturer sales team"
    ]
  },
  {
    slug: "power-pro",
    href: "/products/power-pro",
    title: "Power Pro Stage Lighting",
    eyebrow: "High-Output Lighting System",
    image: "/assets/exhibition.jpg",
    summary:
      "Professional lighting products for touring, rental and installation buyers who need reliable show equipment.",
    applications: "Touring shows, rental companies, production teams and venues",
    specs: [
      ["Category", "Professional event lighting"],
      ["Buyer", "Rental and production teams"],
      ["Support", "Project and quotation support"],
      ["Delivery", "Global B2B delivery coordination"]
    ],
    features: [
      "Built for demanding stage environments",
      "Supports project-based product selection",
      "Good fit for rental and touring packages",
      "OEM/ODM discussion available for qualified buyers"
    ]
  }
];

function normalizeProduct(product) {
  const slug = product.slug;

  return {
    ...product,
    href: product.href || `/products/${slug}`,
    gallery: Array.isArray(product.gallery) && product.gallery.length ? product.gallery : [product.image],
    specs: Array.isArray(product.specs) ? product.specs : [],
    features: Array.isArray(product.features) ? product.features : []
  };
}

const productMap = new Map();

for (const product of [...baseProducts, ...uploadedProducts].map(normalizeProduct)) {
  if (product.slug && product.title) {
    productMap.set(product.slug, product);
  }
}

const priorityProductSlugs = ["x-k66", "x-k60"];

export const productList = Array.from(productMap.values()).sort((a, b) => {
  const aPriority = priorityProductSlugs.indexOf(a.slug);
  const bPriority = priorityProductSlugs.indexOf(b.slug);

  if (aPriority === -1 && bPriority === -1) {
    return 0;
  }

  if (aPriority === -1) {
    return 1;
  }

  if (bPriority === -1) {
    return -1;
  }

  return aPriority - bPriority;
});

export function getProductBySlug(slug) {
  return productList.find((product) => product.slug === slug);
}
