import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState<any>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log("New image selected:", e.target.files[0]);
            setImage(e.target.files[0]);
        }
    };  

    const uploadImage = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);

            try {
                const response = await fetch("http://localhost:3003/api/auth/register", {
                    method: "POST",
                    body: formData,
                });

                if (response.status === 200) {
                    console.log("Image is uploaded");
                    setImage(''); // Clear the image state after successful upload
                    const imageInput: any = document.getElementById('imageInput');
                    if (imageInput) {
                        imageInput.value = ''; // Clear the file input
                    }
                } else {
                    console.log("Image not uploaded");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.log("No image selected to upload");
        }
    };

    return (
        <div>
            <input type="file" id="imageInput" onChange={handleImageChange} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
}

export default ImageUpload;
