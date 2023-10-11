import React, { useState } from 'react';

function ProfileUpdateForm(user: any, onUpdate: any) {
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log("object")
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onUpdate(formData); // Send the updated data to the parent component
    };
    console.log("form data ================= ", formData)
    console.log("firstName ================= ", formData.user.firstName)
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formData.user.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formData.user.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                contactNumber:
                <input
                    type="text"
                    name="contactNumber"
                    value={formData.user.contactNumber}
                    onChange={handleChange}
                />
            </label>
            <label>
                profileImage:
                <input
                    type="file"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                />
            </label>
            {/* Add similar input fields for other user profile properties */}
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default ProfileUpdateForm;
