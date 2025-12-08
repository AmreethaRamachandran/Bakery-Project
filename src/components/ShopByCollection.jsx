import { useState } from 'react';

function ShopByCollection() {
  const [activeTab, setActiveTab] = useState('Savouries');
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = ['Savouries', 'Sweets', 'Bakery', 'Chikki', 'Kitchen Specials', 'Combo'];

  const collections = {
    Savouries: [
      {
        id: 1,
        name: 'Ennai Kadalai',
        image: 'https://images.unsplash.com/photo-1599909533730-f9ff6c7b8b7e?w=600',
        rating: 4,
        reviews: 20,
        price: 100.00
      },
      {
        id: 2,
        name: 'Corn Chips',
        image: 'https://images.unsplash.com/photo-1613919098114-5796d7125e1e?w=600',
        rating: 4.5,
        reviews: 21,
        price: 50.00
      },
      {
        id: 3,
        name: 'Bombay Mixture',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
        rating: 4,
        reviews: 18,
        price: 120.00
      },
      {
        id: 4,
        name: 'Kara boondi',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
        rating: 4.5,
        reviews: 20,
        price: 120.00
      },
      {
        id: 5,
        name: 'Karasevu',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600',
        rating: 4.5,
        reviews: 61,
        price: 120.00
      }
    ],
    Sweets: [
      {
        id: 1,
        name: 'Gulab Jamun',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
        rating: 5,
        reviews: 45,
        price: 150.00
      },
      {
        id: 2,
        name: 'Jalebi',
        image: 'https://images.unsplash.com/photo-1626190466568-1b48ed9f0fd0?w=600',
        rating: 4.5,
        reviews: 38,
        price: 130.00
      },
      {
        id: 3,
        name: 'Rasgulla',
        image: 'https://images.unsplash.com/photo-1606491048118-a5db76e49c48?w=600',
        rating: 5,
        reviews: 52,
        price: 140.00
      },
      {
        id: 4,
        name: 'Laddu',
        image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600',
        rating: 4.5,
        reviews: 42,
        price: 160.00
      },
      {
        id: 5,
        name: 'Mysore Pak',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
        rating: 5,
        reviews: 55,
        price: 180.00
      }
    ],
    Bakery: [
      {
        id: 1,
        name: 'Butter Cookies',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600',
        rating: 4.5,
        reviews: 34,
        price: 110.00
      },
      {
        id: 2,
        name: 'Vanilla Cake',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
        rating: 5,
        reviews: 67,
        price: 450.00
      },
      {
        id: 3,
        name: 'Chocolate Muffins',
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600',
        rating: 4.5,
        reviews: 29,
        price: 200.00
      },
      {
        id: 4,
        name: 'Bread Loaf',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
        rating: 4,
        reviews: 41,
        price: 80.00
      },
      {
        id: 5,
        name: 'Croissant',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
        rating: 5,
        reviews: 58,
        price: 90.00
      }
    ],
    Chikki: [
      {
        id: 1,
        name: 'Peanut Chikki',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
        rating: 5,
        reviews: 72,
        price: 85.00
      },
      {
        id: 2,
        name: 'Sesame Chikki',
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=600',
        rating: 4.5,
        reviews: 48,
        price: 95.00
      },
      {
        id: 3,
        name: 'Coconut Chikki',
        image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=600',
        rating: 4.5,
        reviews: 53,
        price: 100.00
      },
      {
        id: 4,
        name: 'Mixed Dry Fruit Chikki',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
        rating: 5,
        reviews: 65,
        price: 150.00
      },
      {
        id: 5,
        name: 'Almond Chikki',
        image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?w=600',
        rating: 5,
        reviews: 59,
        price: 180.00
      }
    ],
    'Kitchen Specials': [
      {
        id: 1,
        name: 'Murukku',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
        rating: 4.5,
        reviews: 44,
        price: 110.00
      },
      {
        id: 2,
        name: 'Thattai',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600',
        rating: 4,
        reviews: 36,
        price: 95.00
      },
      {
        id: 3,
        name: 'Seedai',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
        rating: 4.5,
        reviews: 41,
        price: 105.00
      },
      {
        id: 4,
        name: 'Ribbon Pakoda',
        image: 'https://images.unsplash.com/photo-1599909533730-f9ff6c7b8b7e?w=600',
        rating: 5,
        reviews: 55,
        price: 120.00
      },
      {
        id: 5,
        name: 'Karasev',
        image: 'https://images.unsplash.com/photo-1613919098114-5796d7125e1e?w=600',
        rating: 4.5,
        reviews: 47,
        price: 115.00
      }
    ],
    Combo: [
      {
        id: 1,
        name: 'Festival Special Pack',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
        rating: 5,
        reviews: 88,
        price: 500.00
      },
      {
        id: 2,
        name: 'Sweet & Savory Mix',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
        rating: 5,
        reviews: 76,
        price: 450.00
      },
      {
        id: 3,
        name: 'Snack Hamper',
        image: 'https://images.unsplash.com/photo-1606491048118-a5db76e49c48?w=600',
        rating: 4.5,
        reviews: 62,
        price: 380.00
      },
      {
        id: 4,
        name: 'Traditional Delights',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
        rating: 5,
        reviews: 71,
        price: 550.00
      },
      {
        id: 5,
        name: 'Chikki Collection',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
        rating: 4.5,
        reviews: 54,
        price: 320.00
      }
    ]
  };

  const currentProducts = collections[activeTab];
  const itemsToShow = 4;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentProducts.length - itemsToShow : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= currentProducts.length - itemsToShow ? 0 : prev + 1));
  };

  const visibleProducts = currentProducts.slice(currentIndex, currentIndex + itemsToShow);
  if (visibleProducts.length < itemsToShow) {
    visibleProducts.push(...currentProducts.slice(0, itemsToShow - visibleProducts.length));
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= fullStars
                ? 'text-[#FF6B35] fill-current'
                : star === fullStars + 1 && hasHalfStar
                ? 'text-[#FF6B35] fill-current opacity-50'
                : 'text-gray-300 fill-current'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] text-center mb-8">
          Shop by Collection
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
              className={`text-lg font-medium pb-2 transition-all duration-300 ${
                activeTab === tab
                  ? 'text-[#FF6B35] border-b-3 border-[#FF6B35]'
                  : 'text-[#D4A574] hover:text-[#FF6B35]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-64 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#FF6B35] mb-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-xl font-bold text-[#5C3D2E] mb-3">
                    Rs. {product.price.toFixed(2)}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full py-3 bg-[#6B3410] text-white rounded hover:bg-[#8B4513] transition-colors duration-300 font-medium">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(currentProducts.length / itemsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsToShow)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / itemsToShow) === index
                  ? 'bg-[#FF6B35] w-6'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByCollection;
