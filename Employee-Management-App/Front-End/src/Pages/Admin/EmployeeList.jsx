import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import EmployeeForm from "../Admin/EmployeeForm";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "hr",
    gender: "",
    course: [],
    image: null,
  });
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  // Fetch username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      let upperUsername = storedUsername.toUpperCase();
      setUsername(upperUsername);
      fetchEmployeeData(storedUsername);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox input
      if (checked) {
        setEmployee({
          ...employee,
          course: [...employee.course, value],
        });
      } else {
        setEmployee({
          ...employee,
          course: employee.course.filter((course) => course !== value),
        });
      }
    } else {
      // Handle other inputs
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    setEmployee({
      ...employee,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("phoneNumber", employee.phoneNumber);
      formData.append("designation", employee.designation);
      formData.append("gender", employee.gender);

      // Append each course individually
      employee.course.forEach((course) => {
        formData.append("course", course);
      });

      formData.append("image", employee.image);
      formData.append("adminUsername", username);

      // Determine the URL based on whether it's an update or create operation
      const url = selectedEmployee
        ? `http://localhost:8000/api/employees/${selectedEmployee._id}`
        : "http://localhost:8000/api/employees";

      const method = selectedEmployee ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
        setEmployee({
          name: "",
          email: "",
          phoneNumber: "",
          designation: "hr",
          gender: "",
          course: [],
          image: null,
        });
        setShowForm(false);

        await fetchEmployeeData(username.toLowerCase());
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  // Function to fetch employee data based on adminUsername
  const fetchEmployeeData = async (username) => {
    console.log(username);

    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/getlist?adminUsername=${username.toUpperCase()}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch employee data: ${response.statusText}`
        );
      }

      const data = await response.json();
      setEmployeeList(data);
      setDataLoaded(true); // Set dataLoaded to true after fetching data
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setErrorMessage("Failed to fetch employee data. Please try again later.");
    }
  };

  // Function to handle edit button click
  const handleEdit = (employee) => {
    // Populate the form fields with the selected employee's data
    setSelectedEmployee(employee);
    setEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete employee: ${response.statusText}`);
      }

      // Update the employee list after deletion
      await fetchEmployeeData(username.toLowerCase());
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete employee. Please try again later.");
    }
  };

  // Function to close the form
  const handleCloseForm = () => {
    setShowForm(false);
    setSuccessMessage("");
    setErrorMessage("");
    setSelectedEmployee(null); // Reset selected employee when form is closed
    setEmployee({
      name: "",
      email: "",
      phoneNumber: "",
      designation: "hr",
      gender: "",
      course: [],
      image: null,
    }); // Clear the form fields
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2 sm:px-0">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
        >
          Create Employee
        </button>
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <EmployeeForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          employee={employee}
          showForm={showForm}
          handleCloseForm={handleCloseForm}
          selectedEmployee={selectedEmployee}
          message={errorMessage} // Pass error message to form
        />
        {/* Conditionally render the table and the text */}
        {dataLoaded ? (
          employeeList.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold mb-4">Employee List</h1>
              <div className="mt-8 overflow-x-auto">
                <table className="table-auto w-full">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Unique Id</th>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Mobile No</th>
                      <th className="px-4 py-2">Designation</th>
                      <th className="px-4 py-2">Gender</th>
                      <th className="px-4 py-2">Course</th>
                      <th className="px-4 py-2">Joined At</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {employeeList.map((employee) => (
                      <tr
                        key={employee._id}
                        className="border-b border-gray-200"
                      >
                        <td className="px-4 py-2 text-sm">{employee._id}</td>
                        <td className="px-4 py-2">
                          <img
                            src={employee.imageUrl}
                            alt="Employee"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm">{employee.name}</td>
                        <td className="px-4 py-2 text-sm">{employee.email}</td>
                        <td className="px-4 py-2 text-sm">
                          {employee.phoneNumber}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {employee.designation}
                        </td>
                        <td className="px-4 py-2 text-sm">{employee.gender}</td>
                        <td className="px-4 py-2 text-sm">
                          {employee.course.join(", ")}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {new Date(employee.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 flex gap-3 ">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-xl font-semibold">No employees found.</p>
          )
        ) : (
          <p>Loading...</p> // Show loading indicator while data is being fetched
        )}
      </div>
    </>
  );
};

export default EmployeeList;
