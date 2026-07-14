import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'NextGen E-Commerce',
  description: 'Premium modern e-commerce platform built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container" style={{ minHeight: 'calc(100vh - 80px)', padding: '2rem 1.5rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
