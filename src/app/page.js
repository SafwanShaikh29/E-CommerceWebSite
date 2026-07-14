import ProductList from '../components/ProductList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="animate-fade-in">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
          Discover <span style={{ color: 'var(--primary)' }}>Premium</span> Gear
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Upgrade your lifestyle with our curated collection of high-quality products designed for the modern individual.
        </p>
      </header>

      <ProductList />
    </div>
  );
}
