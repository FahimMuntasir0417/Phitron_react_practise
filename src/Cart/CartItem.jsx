import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaShoppingCart,
  FaTag,
  FaHashtag,
  FaDollarSign,
  FaCartPlus,
  FaExclamationCircle,
  FaTrash,
} from "react-icons/fa";

const CartItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [cart, setCart] = useState([]);

  const addItemToCart = (data) => {
    setCart([...cart, { ...data, id: Date.now() }]); // Add unique ID for each item
  };

  const removeItemFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Submit function
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    addItemToCart(data); // This line was missing!
    alert(`Added ${data.quantity} ${data.itemName} to cart!`);
    reset(); // Reset form after submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-700 p-5 font-sans flex flex-col items-center gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in"
      >
        <div className="bg-gradient-to-br from-red-400 to-orange-600 text-white px-6 py-6 text-center">
          <h2 className="font-semibold text-2xl mb-1 flex items-center justify-center gap-2">
            <FaShoppingCart className="text-xl" /> Add to Cart
          </h2>
          <p className="opacity-90 text-sm">
            Fill in the details below to add an item to your cart
          </p>
        </div>

        {/* Item Name */}
        <div className="px-6 py-4">
          <label
            htmlFor="itemName"
            className="block mb-2 font-medium text-gray-800 text-base"
          >
            Item Name
          </label>
          <div className="relative">
            <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 text-lg" />
            <input
              id="itemName"
              {...register("itemName", {
                required: "Item name is required",
                minLength: {
                  value: 2,
                  message: "Item name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="Enter item name"
              className={`w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 ${
                errors.itemName ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.itemName && (
            <span className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
              <FaExclamationCircle /> {errors.itemName.message}
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="px-6 py-4">
          <label
            htmlFor="quantity"
            className="block mb-2 font-medium text-gray-800 text-base"
          >
            Quantity
          </label>
          <div className="relative">
            <FaHashtag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 text-lg" />
            <input
              id="quantity"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                max: {
                  value: 100,
                  message: "Maximum quantity is 100",
                },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter quantity"
              className={`w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 ${
                errors.quantity ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.quantity && (
            <span className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
              <FaExclamationCircle /> {errors.quantity.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="px-6 py-4">
          <label
            htmlFor="price"
            className="block mb-2 font-medium text-gray-800 text-base"
          >
            Price (Optional)
          </label>
          <div className="relative">
            <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 text-lg" />
            <input
              id="price"
              {...register("price", {
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter price"
              className={`w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 ${
                errors.price ? "border-red-500" : ""
              }`}
              step="0.01"
            />
          </div>
          {errors.price && (
            <span className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
              <FaExclamationCircle /> {errors.price.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-700 to-blue-500 text-white border-none rounded-xl py-4 text-lg font-semibold w-[calc(100%-3rem)] mx-6 mb-6 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          <FaCartPlus className="text-xl" /> Add to Cart
        </button>
      </form>

      {/* Cart Display */}
      <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-xl">
        <h3 className="flex items-center gap-2 mb-4 text-gray-800">
          <FaShoppingCart /> Your Cart ({cart.length} items)
        </h3>

        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border-b border-gray-200"
              >
                <div className="item-info">
                  <h4 className="m-0 mb-1 text-gray-800">{item.itemName}</h4>
                  <p className="m-1 text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p className="m-1 text-gray-600 text-sm">
                    Price: ${item.price || "0.00"}
                  </p>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="bg-red-500 text-white border-none rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-orange-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic py-5">
            Your cart is empty. Add some items!
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CartItem;
