import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const RentAdvertisementCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  // Mock data - in a real app, you would fetch this from your API
  const mockAds = [
    {
      id: "323e4567-e89b-12d3-a456-426614174002",
      title: "Family House with Garden",
      price: "3500.00",
      location: "789 Oak St, Suburbia",
      area: "150.00",
      bedrooms: 3,
      bathrooms: 2,
      category: 2,
      category_name: "House",
      owner: {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
      },
      status: "pending",
      created_at: "2024-01-15T08:15:00Z",
      is_available: true,
      primary_image: null,
      is_favorited: false,
      average_rating: 0,
      review_count: 0,
      views_count: 12,
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Luxury Downtown Apartment",
      price: "2500.00",
      location: "123 Main St, Downtown",
      area: "85.00",
      bedrooms: 2,
      bathrooms: 2,
      category: 1,
      category_name: "Apartment",
      owner: {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
      },
      status: "approved",
      created_at: "2024-01-10T09:00:00Z",
      is_available: true,
      primary_image: {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        is_primary: true,
        uploaded_at: "2024-01-10T09:05:00Z",
      },
      is_favorited: false,
      average_rating: 4.0,
      review_count: 2,
      views_count: 45,
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174001",
      title: "Cozy Studio Near University",
      price: "1200.00",
      location: "456 College Ave, University District",
      area: "40.00",
      bedrooms: 1,
      bathrooms: 1,
      category: 3,
      category_name: "Studio",
      owner: {
        id: "6ba7b811-9dad-11d1-80b4-00c04fd430c9",
        email: "jane.smith@example.com",
        first_name: "Jane",
        last_name: "Smith",
      },
      status: "approved",
      created_at: "2024-01-08T11:30:00Z",
      is_available: true,
      primary_image: {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        is_primary: true,
        uploaded_at: "2024-01-08T11:35:00Z",
      },
      is_favorited: false,
      average_rating: 0,
      review_count: 0,
      views_count: 80,
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchAds = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/v1/advertisements/');
        // const data = await response.json();
        // setAds(data.results);

        // Using mock data for demonstration
        setTimeout(() => {
          setAds(mockAds);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ads.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}/month`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-xl">No advertisements found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Rental Properties
      </h2>

      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad, index) => (
            <div key={ad.id} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row">
                {/* Property Image */}
                <div className="md:w-1/2 h-80 md:h-auto relative">
                  {ad.primary_image ? (
                    <img
                      src={ad.primary_image.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      ad.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(ad.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    {favorites[ad.id] ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Property Details */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {ad.title}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-4">
                      {formatPrice(ad.price)}
                    </p>

                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="mr-4">
                        {ad.bedrooms}{" "}
                        {ad.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                      </span>
                      <span className="mr-4">
                        {ad.bathrooms}{" "}
                        {ad.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                      </span>
                      <span>{ad.area} m²</span>
                    </div>

                    <p className="text-gray-600 mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {ad.location}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-6">
                        <EyeIcon className="h-5 w-5 text-gray-500 mr-1" />
                        <span className="text-gray-600">
                          {ad.views_count} views
                        </span>
                      </div>

                      {ad.average_rating > 0 && (
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                          <span className="text-gray-600">
                            {ad.average_rating} ({ad.review_count} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {ad.category_name}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm">
                      Posted by {ad.owner.first_name} {ad.owner.last_name} on{" "}
                      {formatDate(ad.created_at)}
                    </p>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium">
                      Contact Owner
                    </button>
                    <button className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full ${
                currentIndex === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentAdvertisementCarousel;
