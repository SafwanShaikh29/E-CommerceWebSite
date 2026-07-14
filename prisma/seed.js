const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 199.99,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracker and smartwatch with heart rate monitor.',
      price: 149.99,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with tactile switches.',
      price: 89.99,
      stock: 75,
      imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    },
    {
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with adjustable DPI.',
      price: 49.99,
      stock: 120,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-379381547969?w=800&q=80',
    },
  ];

  console.log('Start seeding...');
  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
