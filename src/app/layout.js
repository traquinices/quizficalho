import './globals.css';

export const metadata = {
  title: 'Quiz Ficalho 🤔',
  description: 'Descobre qual dos 6 lendas de Ficalho vive dentro de ti.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-slate-950 text-white antialiased">{children}</body>
    </html>
  );
}