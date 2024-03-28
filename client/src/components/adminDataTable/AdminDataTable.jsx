import React, { useEffect, useState } from "react";
import apiService from "../../service/apiService";
import Swal from "sweetalert2";
import { getUserData } from "../../utility/utlis";
import './AdminDataTable.scss'
import Loader from '../../components/loader/Loader'

export default function AdminDataTable() {
  const [data, setData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading

  const userDetails = getUserData();

  const fetchData = async () => {
    try {
      const response = await apiService.getAllUserData();
      setData(response.data);
      setLoading(false); // Once data is fetched, set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          apiService.deleteUserData(id).then(() => {
            Swal.fire("Deleted!", "Link has been deleted.", "success");
            fetchData();
          });
        }
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleRowDoubleClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveRow = async (id) => {
    try {
      const updatedRow = data.find((row) => row._id === id);
      await apiService.updateUserData(id, updatedRow);
      setEditableRow(null);
      fetchData();
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <div className="data-table">
      <h1>Admin User Data Table</h1>
      {loading ? (
        <Loader /> // Render loader if data is still loading
      ) : (
        <table>
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.filter((filteritem)=>filteritem._user[0]._id!==userDetails._id).map((item, index) => (
              <tr key={item._id}>
                <td data-label="Organization Name">
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={item.organizationName}
                      onChange={(e) => {
                        item.organizationName = e.target.value;
                        setData([...data]); // Update state to trigger re-render
                      }}
                    />
                  ) : (
                    item.organizationName
                  )}
                </td>
                <td data-label="First Name">
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={item._user[0]?.firstName}
                      onChange={(e) =>{
                        item._user[0].firstName=e.target.value
                        setData([...data]);
                      } }
                    />
                  ) : (
                    item._user[0]?.firstName
                  )}
                </td>
                <td data-label="Last Name">
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={item._user[0]?.lastName}
                      onChange={(e) =>{
                        item._user[0].lastName=e.target.value
                        setData([...data]);
                      } }
                    />
                  ) : (
                    item._user[0]?.lastName
                  )}
                </td>
                <td data-label="email">{item._user[0]?.email}</td>

                <td data-label="Role">
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={item._user[0]?.role}
                      onChange={(e) =>{
                        item._user[0].role=e.target.value
                        setData([...data]);
                      } }
                    />
                  ) : (
                    item._user[0]?.role
                  )}
                </td>
                <td>
                  {editableRow === index ? (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around", width:"100%"}}>
                      <button onClick={() => handleSaveRow(item._id)}>Save</button>
                      <button onClick={() => setEditableRow(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around", width:"100%"}}>
                      <button onClick={() => handleRowDoubleClick(index)}>
                        Edit
                      </button>
                      <button onClick={() => handleUserDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
