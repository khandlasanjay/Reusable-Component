import React, { useState } from "react";

function ImageUpload() {

    const [image, setImaje] = useState(null)
    const uploadImage = async () => {
        const formData: any = new FormData()
        formData.append("file", image)
        try {
            const response = await fetch("http://localhost:3003/api/auth/register", { method: "post", body: formData })
            if (response) {
                console.log("image is uploaded")
            } else {
                console.log("not uploaded")
            }
        } catch (error) {
            console.log("error ============== ", error)
        }
    }


    return (
        <div>
            <input type="file" onChange={(e: any) => {
                setImaje(e.target.files[0])
            }}></input>
            <button onClick={uploadImage}>upload</button>
        </div>
    );
}

export default ImageUpload;
