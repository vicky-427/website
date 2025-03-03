import { useState } from 'react';
import logo from "../assets/logo.png"

const ClientIdeaSubmission = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    return (
        <div className=" text-gold p-8 max-w-fit mx-auto rounded-2xl shadow-lg text-center">
            <img src={logo} alt="Company Logo" className="w-36 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-6">Submit Your Construction Idea</h2>
            <form id="ideaForm" onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" name="name" required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="phone">Phone Number:</label></td>
                            <td><input type="tel" id="phone" name="phone" required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="email">Email ID:</label></td>
                            <td><input type="email" id="email" name="email" required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="idea">Describe Your Idea:</label></td>
                            <td><textarea id="idea" name="idea" rows="4" required className="w-full p-2 rounded"></textarea></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="budget">Budget:</label></td>
                            <td><input type="number" id="budget" name="budget" required className="w-full p-2 rounded" /></td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left">Type of Work:</td>
                            <td>
                                <input type="radio" id="residential" name="work_type" value="Residential" required />
                                <label htmlFor="residential" className="ml-2">Residential</label>
                                <input type="radio" id="commercial" name="work_type" value="Commercial" className="ml-4" />
                                <label htmlFor="commercial" className="ml-2">Commercial</label>
                                <input type="radio" id="restore" name="work_type" value="Restore" className="ml-4" />
                                <label htmlFor="restore" className="ml-2">Restore</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2 text-left"><label htmlFor="file">Upload File:</label></td>
                            <td><input type="file" id="file" name="file" accept="image/*, .pdf, .doc, .docx" className="w-full p-2 rounded" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-left mt-4">
                    <input type="checkbox" id="terms" name="terms" onChange={handleTermsChange} required />
                    <label htmlFor="terms" className="ml-2">
                        The form will be sent to the engineer for validation. Once validated, the engineer will visit the site, and you will be required to pay an engineer fee.
                    </label>
                </div>
                <button type="submit" className="bg-gold text-black w-full py-2 mt-6 rounded-lg" disabled={!termsAccepted}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ClientIdeaSubmission;