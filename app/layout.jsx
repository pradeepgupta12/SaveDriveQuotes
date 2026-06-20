import "./globals.css";

export const metadata = {
  title: "SaveDriveQuotes — Cheap Car Insurance Quotes, Compare & Save up to $700/yr",
  description:
    "Compare cheap car insurance quotes from 50+ top-rated insurers instantly. 100% free, no credit check, no obligation. Drivers save an average of $700/year.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
