import React, { useState, useEffect } from 'react';
import ProfileUpdateForm from './ProfileUpdateForm';
// require('dotenv').config()

function DataFetchingComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/userListing`;
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (recordId: any) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/deleteUser/${recordId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setData((prevData) => prevData.filter((record: any) => record._id !== recordId));
            })
            .catch((error) => {
                console.error('Error deleting record:', error);
            });
    };

    const handleUpdateProfile = (updatedData: any) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/updateUser/${updatedData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success (e.g., display a success message or update the user's data)
            // You may also want to fetch the updated user data and refresh the user list
            // to reflect the changes.
            setIsUpdateFormVisible(false); // Hide the update form
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            // Handle error (e.g., display an error message)
        });
    };

    const toggleUpdateForm = (user: any) => {
        console.log("user =================== ",user)
        setIsUpdateFormVisible(!isUpdateFormVisible);
        setSelectedUser(user);
    };

    return (
        <div>
            {isUpdateFormVisible ? (
                <ProfileUpdateForm user={selectedUser} onUpdate={handleUpdateProfile} />
            ) : (
                // Display your table and buttons
                <table>
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>email</th>
                            <th>contactNumber</th>
                            <th>profileImage</th>
                            <th>status</th>
                            <th>createdAt</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value: any) => (
                            <tr key={value._id}>
                                <td>{value._id}</td>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                                <td>{value.email}</td>
                                <td>{value.contactNumber}</td>
                                <td><img src={process.env.REACT_APP_IMAGE_URL + value.profileImage} alt="" width={100} /></td>
                                <td>{value.status}</td>
                                <td>{value.createdAt}</td>
                                <td>
                                    <button onClick={() => handleDelete(value._id)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => toggleUpdateForm(value)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default DataFetchingComponent;
