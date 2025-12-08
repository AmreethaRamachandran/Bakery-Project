import { useState } from 'react';

function CustomerLove() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Everything, I ordered on 21-12-24, all the items both sweets and karams are exceedingly good. Fresh, delicious",
      name: "Jayaraman arumugadoss",
      rating: 5
    },
    {
      id: 2,
      text: "For the past 2 years i am buying Sattur mittai kadai products for every occasion. Very tasty ans delicious. Every 6 months i am sending this products to my daughter who is in London. The packing also so good.",
      name: "Mangaiyarkarasi Ravirajan",
      rating: 5
    },
    {
      id: 3,
      text: "Prompt delivery. Tasty items.Wish to have an outlet at Medahalli in Bengaluru.",
      name: "Shanmugiah Arumugam",
      rating: 5
    },
    {
      id: 4,
      text: "Amazing quality and authentic taste. Been ordering for years and never disappointed. Highly recommended!",
      name: "Priya Krishnan",
      rating: 5
    },
    {
      id: 5,
      text: "The traditional recipes are preserved so well. Every bite takes me back to my childhood. Excellent service too!",
      name: "Rajesh Kumar",
      rating: 5
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(...testimonials.slice(0, 3 - visibleTestimonials.length));
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-[#FFA500] fill-current' : 'text-gray-300 fill-current'
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF6B35] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B4513] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#8B4513] text-sm font-semibold tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-4">
            Our Customer Love Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your feedback helps us improve – we'd love to hear from you!
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-[#8B4513] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6B3410] transition-all hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-[#FF6B35] opacity-20">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="relative z-10 mt-8">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-center relative z-10 min-h-[120px]">
                  "{testimonial.text}"
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] mx-auto mb-4 rounded-full"></div>

                {/* Customer Name */}
                <div className="text-center">
                  <h4 className="font-bold text-[#8B4513] text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">Verified Customer</p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#FF6B35] opacity-20 rounded-br-2xl"></div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-[#8B4513] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6B3410] transition-all hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: testimonials.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all rounded-full ${
                currentIndex === index
                  ? 'w-8 h-3 bg-[#FF6B35]'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FFA500] p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              Share Your Experience!
            </h3>
            <p className="text-white/90 mb-5">
              We value your feedback and would love to hear from you
            </p>
            <button className="px-8 py-3 bg-white text-[#FF6B35] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerLove;
