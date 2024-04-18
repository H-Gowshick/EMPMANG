import React from "react";

const EmployeeForm = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  employee,
  showForm,
  handleCloseForm,
  selectedEmployee,
  message,
}) => {
  return (
    showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h1 className="text-3xl font-bold mb-4">Employee Form</h1>
          {message && ( // Display the message conditionally
            <p
              className={
                message.includes("success")
                  ? "text-green-500 my-5"
                  : "text-red-500 my-5"
              }
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Email */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Phone Number */}
            <div className="mb-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={employee.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Designation */}
            <div className="mb-2">
              <label
                htmlFor="designation"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Select Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            {/* Course */}
            <div className="mb-2">
              <label className="block text-sm text-gray-700 font-bold mb-1">
                Select Course
              </label>
              <div>
                <input
                  type="checkbox"
                  id="mca"
                  name="mca"
                  value="MCA"
                  onChange={handleChange}
                  checked={employee.course.includes("MCA")}
                />
                <label htmlFor="mca" className="text-sm">
                  MCA
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="bca"
                  name="bca"
                  value="BCA"
                  onChange={handleChange}
                  checked={employee.course.includes("BCA")}
                />
                <label htmlFor="bca" className="text-sm">
                  BCA
                </label>{" "}
              </div>
              <div>
                <input
                  type="checkbox"
                  id="bsc"
                  name="bsc"
                  value="BSC"
                  onChange={handleChange}
                  checked={employee.course.includes("BSC")}
                />
                <label htmlFor="bsc" className="text-sm">
                  BSC
                </label>{" "}
                {/* Update label text accordingly */}
              </div>
            </div>
            {/* Gender */}
            <div className="mb-2">
              <label
                htmlFor="gender"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Gender
              </label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={employee.gender === "Male"}
                />
                <label htmlFor="male" className="text-sm">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={employee.gender === "Female"}
                />
                <label htmlFor="female" className="text-sm">
                  Female
                </label>
              </div>
            </div>
            {/* Image */}
            <div className="mb-2">
              <label
                htmlFor="image"
                className="block text-sm text-gray-700 font-bold mb-1"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Submit and Close buttons */}
            <div className="flex justify-center gap-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                {selectedEmployee ? "Update" : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EmployeeForm;
