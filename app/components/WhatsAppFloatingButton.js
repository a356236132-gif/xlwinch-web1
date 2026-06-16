const whatsappHref =
  "https://wa.me/8615975490982?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.";

export default function WhatsAppFloatingButton() {
  return (
    <a
      aria-label="Contact XLIGHTING on WhatsApp"
      className="whatsapp-float"
      href={whatsappHref}
      rel="noopener noreferrer"
      target="_blank"
      title="Contact us on WhatsApp"
      data-track-event="whatsapp_click"
      data-track-category="lead_generation"
      data-track-label="Floating WhatsApp"
      data-track-location="floating_button"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M16.03 4.05C9.44 4.05 4.08 9.38 4.08 15.93c0 2.1.55 4.14 1.6 5.95L4 28l6.28-1.63a12 12 0 0 0 5.75 1.46c6.59 0 11.95-5.33 11.95-11.9S22.62 4.05 16.03 4.05Zm0 21.76c-1.82 0-3.58-.49-5.13-1.42l-.37-.22-3.72.97.99-3.6-.24-.37a9.75 9.75 0 0 1-1.48-5.24c0-5.43 4.46-9.86 9.95-9.86 5.48 0 9.94 4.43 9.94 9.86s-4.46 9.88-9.94 9.88Z" />
        <path d="M21.5 18.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.18 5.07 4.46.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
