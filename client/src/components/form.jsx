import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const ClientIdeaSubmission = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        idea: "",
        budget: "",
        work_type: "",
        file: null,
        termsAccepted: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            alert("You must accept the terms before submitting.");
            return;
        }

        setIsSubmitting(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/submissions", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Submission Successful!");
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-gold p-8 max-w-fit mx-auto rounded-2xl shadow-lg text-center">
            <img src={logo} alt="Company Logo" className="w-36 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-6">Submit Your Construction Idea</h2>
            <form id="ideaForm" onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="phone">Phone Number:</label></td>
                            <td><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="email">Email ID:</label></td>
                            <td><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="idea">Describe Your Idea:</label></td>
                            <td><textarea id="idea" name="idea" rows="4" value={formData.idea} onChange={handleChange} required className="w-full p-2 rounded"></textarea></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="budget">Budget:</label></td>
                            <td><input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left">Type of Work:</td>
                            <td>
                                <input type="radio" id="residential" name="work_type" value="Residential" checked={formData.work_type === "Residential"} onChange={handleChange} required />
                                <label htmlFor="residential" className="ml-2">Residential</label>
                                <input type="radio" id="commercial" name="work_type" value="Commercial" checked={formData.work_type === "Commercial"} onChange={handleChange} className="ml-4" />
                                <label htmlFor="commercial" className="ml-2">Commercial</label>
                                <input type="radio" id="restore" name="work_type" value="Restore" checked={formData.work_type === "Restore"} onChange={handleChange} className="ml-4" />
                                <label htmlFor="restore" className="ml-2">Restore</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="file">Upload File:</label></td>
                            <td><input type="file" id="file" name="file" accept="image/*, .pdf, .doc, .docx" onChange={handleChange} className="w-full p-2 rounded" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-left mt-4">
                    <input type="checkbox" id="terms" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
                    <label htmlFor="terms" className="ml-2">
                        The form will be sent to the engineer for validation. Once validated, the engineer will visit the site, and you will be required to pay an engineer fee.
                    </label>
                </div>
                <button type="submit" className="bg-gold text-black w-full py-2 mt-6 rounded-lg" disabled={!formData.termsAccepted || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ClientIdeaSubmission;
