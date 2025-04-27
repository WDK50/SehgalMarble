  export const allProducts = [
    // Floor Products (18 items)
    ...Array.from({ length: 18 }, (_, i) => ({
      id: 100 + i + 1,
      code: `FLR${String(i + 1).padStart(3, '0')}`,
      name: `Floor Tile ${i + 1}`,
      price: 79.99 + (i * 5),
      imageUrl: `/assets/Floor/Floor-${i + 1}.jpg`,
      category: 'Floor',
      description: `Premium ceramic floor tile with a glossy finish, perfect for modern interiors. 
                  Anti-skid surface with high durability (${i % 2 ? 'matte' : 'glossy'} finish). 
                  Suitable for both residential and commercial use. Easy maintenance and stain-resistant.`,
      rating: (4.0 + (i * 0.1)).toFixed(1),
      sizes: ['30x30 cm', '60x60 cm', '90x90 cm'],
      stock: 150 - (i * 5),
      material: i % 2 ? 'Ceramic' : 'Porcelain',
      thickness: '10 mm'
    })),

    // Stairs Products (39 items)
    ...Array.from({ length: 39 }, (_, i) => ({
      id: 200 + i + 1,
      code: `STR${String(i + 1).padStart(3, '0')}`,
      name: `Stair Design ${i + 1}`,
      price: 129.99 + (i * 3),
      imageUrl: `/assets/Stair/Str-${i + 1}.jpg`,
      category: 'Stairs',
      description: `Custom-designed marble staircase with ${i % 3 ? 'spiral' : 'straight'} pattern. 
                  Non-slip edge detailing and reinforced structure. Available in ${i % 2 ? 'classic white' : 'modern grey'} marble. 
                  Includes professional installation guidelines.`,
      rating: (4.2 - (i * 0.02)).toFixed(1),
      sizes: ['Standard', 'Custom'],
      stock: 85 - i,
      material: 'Natural Stone',
      weightCapacity: '500 kg'
    })),

    // Mosaic Products (33 items)
    ...Array.from({ length: 33 }, (_, i) => ({
      id: 300 + i + 1,
      code: `MOS${String(i + 1).padStart(3, '0')}`,
      name: `Mosaic Pattern ${i + 1}`,
      price: 59.99 + (i * 2),
      imageUrl: `/assets/Mosaic/mosaic 000${i + 1}.jpg`,
      category: 'Mosaic',
      description: `Handcrafted mosaic tiles featuring ${['geometric', 'floral', 'abstract'][i % 3]} design. 
                  Weather-resistant for indoor/outdoor use. ${i % 4 ? 'Glass' : 'Ceramic'} tiles with UV-protected colors. 
                  Perfect for accent walls and decorative surfaces.`,
      rating: (4.5 - (i * 0.03)).toFixed(1),
      sizes: ['10x10 cm sheets', '30x30 cm panels'],
      stock: 200 - (i * 3),
      material: ['Glass', 'Ceramic', 'Stone'][i % 3],
      theme: ['Modern', 'Vintage', 'Bohemian'][i % 3]
    }))
  ];

  export const productCategories = [
    'Floor',
    'Stairs',
    'Mosaic'
  ];

  // Helper Functions
  export const getProductsByCategory = (category) => {
    return allProducts.filter(product => product.category === category);
  };

  export const getFeaturedProducts = (count = 6) => {
    return allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  export const getAverageRating = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    return product ? product.rating : 0;
  };