import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./context/userContext";
const Register = () => {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Function to update form data on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send formData to your backend or do any further processing
    console.log("Form submitted with data:", formData);
    fetch("http://localhost:3000/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("first");
        if (data.status) {
          setUser({ name: formData.name, email: formData.email });
          console.log(data);

          navigate("/dashboard");
        } else if (data.error_type === "VALIDATION_ERROR") {
          alert(data.error_message);
        } else {
          console.log(data);
          alert(data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-green-400 mb-6">
          Bharat Talks
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-3 mt-1 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 px-3 mt-1 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-10 px-3 mt-1 border rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-10 px-3 mt-1 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-green-400 hover:bg-green-500 text-white font-medium rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
