import { useState } from 'react';

function BehindTheScenes() {
  const [mutedVideos, setMutedVideos] = useState({
    video1: true,
    video2: true,
    video3: true,
    video4: true
  });

  const videos = [
    {
      id: 'video1',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
      title: 'Making Traditional Snacks',
      label: 'SINCE 1914'
    },
    {
      id: 'video2',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
      title: 'Preparing Fresh Dough',
      label: 'HANDMADE'
    },
    {
      id: 'video3',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
      title: 'Deep Frying Process',
      label: 'AUTHENTIC'
    },
    {
      id: 'video4',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
      title: 'Packaging with Care',
      label: 'QUALITY'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Laddu',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300'
    },
    {
      id: 2,
      name: 'Adhirasam',
      image: 'https://images.unsplash.com/photo-1626190466568-1b48ed9f0fd0?w=300'
    },
    {
      id: 3,
      name: 'Karupatti Mittai',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300'
    },
    {
      id: 4,
      name: 'Groundnut Chikki Bar',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300'
    }
  ];

  const toggleMute = (videoId) => {
    setMutedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 via-gray-50 to-stone-50 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #FF6B35 1px, transparent 1px), radial-gradient(circle at 80% 80%, #8B4513 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-orange-200 to-amber-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-yellow-200 to-orange-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-3">
            Behind The Scenes
          </h2>
          <p className="text-gray-600 text-lg">
            Watch how we craft our delicious treats with love and tradition
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Video/Image */}
              <div className="relative h-80 bg-gray-900">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Label Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-[#8B4513] text-xs font-bold tracking-wider">
                    {video.label}
                  </span>
                </div>

                {/* Mute/Unmute Button */}
                <button
                  onClick={() => toggleMute(video.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                >
                  {mutedVideos[video.id] ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg">
                    <svg className="w-6 h-6 text-[#8B4513] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Showcase */}
        <div className="border-t pt-12">
          <h3 className="text-2xl font-bold text-[#8B4513] text-center mb-8">
            Featured Products in Process
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-[#6B3410]">{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#8B4513] to-[#6B3410] px-8 py-6 rounded-2xl shadow-xl">
            <p className="text-white text-lg mb-4">
              Want to see more of our traditional craftsmanship?
            </p>
            <button className="px-6 py-3 bg-white text-[#8B4513] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold">
              Visit Our YouTube Channel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BehindTheScenes;
