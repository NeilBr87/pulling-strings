import React, { useEffect, useState } from "react";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "https://members-api.parliament.uk/api/Posts/Departments/0",
          {
            headers: {
              Accept: "text/plain",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <p className="text-gray-600">Loading departments...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {departments.map((dept) => (
        <div
          key={dept.id}
          className="p-4 rounded-2xl shadow-md bg-white flex items-center space-x-4"
        >
          
          <div>
            <h3 className="text-lg font-semibold">{dept.name}</h3>
            {dept.url && (
              <a
                href={dept.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentsList;
