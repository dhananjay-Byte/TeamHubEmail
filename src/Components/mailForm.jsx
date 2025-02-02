import React, { useEffect, useState } from "react";
import axios from 'axios'

const SendMailForm = ({ toggleButton }) => {

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState();
    const apiURL = process.env.REACT_APP_API_URL_BASE


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault()
        toggleButton();
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            alert('Only PDF files are allowed!');
            return;
        }
        setFile(selectedFile);
    };


    const handleSendMail = async (e) => {
        e.preventDefault();

        const requiredFields = ['receiverMail', 'subject', 'content'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`${field} is required.`);
                return;
            }
        }

        const uploadData = new FormData();
        if (file) {
            uploadData.append('file', file);
        }

        Object.keys(formData).forEach((key) => {
            uploadData.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`${apiURL}/v1/api/mail/send-mail`, uploadData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Email Sent Successfully!');

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error sending email:', error);
            const errorMessage =
                error.response?.data?.message || 'An error occurred while sending the email.';

            alert(errorMessage); // Display the error message to the user
        }
    };


    return (
        <div >
            <div className="h-screen w-screen  flex items-center justify-center">
                <div className="w-[50%] py-4 px-4 shadow-sm shadow-slate-400 rounded-md bg-black text-white border border-white">
                    <h3 className="text-2xl font-semibold">Send Mail</h3>
                    <p>Enter details carefully!</p>
                    <form className="mt-[10px]">

                        <input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="w-full border text-black border-gray-300 rounded-md py-2 px-3"
                        />
                        <div className="mt-4">
                            <input
                                type="email"
                                placeholder="Receiver's Email"
                                name="receiverMail"
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="w-full text-black border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>



                        <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4">


                            <div className="md:col-span-2">
                                <label
                                    htmlFor="file"
                                    className="float-left block font-normal text-lg"
                                >
                                    Attach File *pdf only
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e)}
                                    className="peer block w-full appearance-none border-none bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:ring-0"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <textarea
                                    rows="5"
                                    placeholder="Body"
                                    name="content"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                    className="w-full text-black border border-gray-300 rounded-md py-2 px-3"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-4">


                                <button onClick={(e) => handleCancel(e)} className="py-3 text-base font-medium rounded text-black bg-white border  w-1/2 ">
                                    Cancel
                                </button>

                                <button onClick={(e) => handleSendMail(e)} className=" w-1/2 py-3 text-base font-medium rounded text-white border border-white bg-black">
                                    Send Mail
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default SendMailForm;
