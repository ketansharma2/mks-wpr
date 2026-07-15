import './globals.css';

export const metadata = {
  title: 'MKS Operations Hub',
  description: 'Daily Progress & Reporting System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}