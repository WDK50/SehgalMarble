/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import CarouselSlider from '../components/CarouselSlider';
import ProductCard from '../components/ProductCard';
import Reviews from '../components/Reviews';
import DemoVideo from '../components/DemoVideo';
import { allProducts, productCategories, getProductsByCategory } from '../data/products';

export default function Home() {
  const handleAddToCart = product => console.log('Added to cart:', product);

  return (
    <div id="home" className="bg-gray-50 relative">
      <CarouselSlider />

      <div className="container mx-auto px-4 space-y-12">
        {productCategories.map(category => {
          const items = getProductsByCategory(category).slice(0, 3);
          
          return (
            <section key={category} className="my-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {category}
                </h2>
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="flex items-center text-teal-600 hover:underline"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <Reviews key="reviews" />
        <DemoVideo key="demo-video" />
      </div>

      {/* Floating Chat Buttons */}
      <a
        href="https://wa.me/923008600444?text=Hello"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp className="h-5 w-5 md:h-6 md:w-6" />
      </a>

      <a
        href="https://m.me/SeghalMarble"
        aria-label="Chat on Facebook Messenger"
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaFacebookMessenger className="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  );
}