function Categories({ onCategoryClick }) {
  const categories = [
    {
      id: 1,
      name: "Combo",
      image: "/images/combo image.jpg",
      bgColor: "bg-gradient-to-br from-amber-200 to-orange-200",
      imageScale: '1.2',
      imagePosition: '58% 50%'
    },
    {
      id: 2,
      name: "Murukku",
      image: "/images/murukku.jpg",
      bgColor: "bg-gradient-to-br from-amber-200 to-orange-200"
    },
    {
      id: 3,
      name: "Specials",
      image: "/images/ribbon-pakoda-521211.webp",
      bgColor: "bg-gradient-to-br from-amber-200 to-orange-200"
    },
    {
      id: 4,
      name: "Mixture",
      image: "/images/Keezha_Eral_Mixture_1200x1200.jpg",
      bgColor: "bg-gradient-to-br from-amber-200 to-orange-200"
    },
    {
      id: 5,
      name: "Laddu",
      image: "/images/laddoos.jpg",
      bgColor: "bg-gradient-to-br from-amber-200 to-orange-200",
      imagePosition: 'center 40%'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-1/4 w-32 h-64 opacity-10">
        <svg viewBox="0 0 200 400" className="w-full h-full text-gray-400">
          <path d="M10,10 L50,50 M50,10 L10,50 M30,70 L30,120" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      
      <div className="absolute right-0 top-20 w-40 h-40 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#FF6B35" strokeWidth="2"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#FF6B35" strokeWidth="2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 mb-2 tracking-wide">Shop Collections</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF6B35] font-serif italic tracking-wide">Categories</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => onCategoryClick && onCategoryClick(category.name)}
            >
              {/* Circle Image Container */}
              <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full ${category.bgColor} p-4 shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl overflow-hidden`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: category.imagePosition || '62% 60%',
                      transform: category.imageScale ? `scale(${category.imageScale})` : 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* Category Name */}
              <h3 className="mt-4 text-lg md:text-xl font-semibold text-[#FF6B35] group-hover:text-[#8B4513] transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-[#8B4513] via-[#6B3410] to-[#8B4513] opacity-80">
        <div className="h-full flex items-center justify-center">
          <div className="flex gap-4">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full opacity-50"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
