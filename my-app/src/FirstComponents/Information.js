import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Location} from "./SecondComponents/Location";

export function Information(){
    const [information, setInformation] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/information')
        .then((v) => {
            setInformation(v.data);
        });
    }, []);

    const handleUploadSubmit = (upload) => {
        const formData = new FormData();
        formData.append('image', upload);

        fetch('http://localhost:8080/api/v1/upload', {
            method: 'POST',
            body: formData,
        })
        .then(() => {
            axios.get('http://localhost:8080/api/v1/information')
            .then((variable) => {
                setInformation(variable.data);
            });
        })
        .catch((e) => {
            alert("서버 장애");
            console.error(e);
        });
    }

    return (
        <>
            <Location information={information} onUploadSubmit={handleUploadSubmit}/>
        </>
    )
}