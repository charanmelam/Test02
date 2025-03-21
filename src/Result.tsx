import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FaPlus, FaMinus } from "react-icons/fa"; // Icons for add/remove
pdfMake.vfs = pdfFonts.vfs;

const PdfGenerator: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        currentRole: "",
        email: "",
        phone: "",
        socials: [{ label: "", url: "" }],
        education: [
            { college: "", cgpa: "", duration: "" }, // Default first entry
        ],
        skills: "",
        projects: "",
        experience: "",
        achievements: "",
        leadership: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;
        if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;
        if (index !== undefined) {
            // Update socials array
            const newSocials = [...formData.socials];
            newSocials[index] = { ...newSocials[index], [name]: value };
            setFormData({ ...formData, socials: newSocials });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.education];
    
        // Explicitly tell TypeScript that `name` is one of the education object keys
        updatedEducation[index][name as keyof typeof updatedEducation[number]] = value;
    
        setFormData({ ...formData, education: updatedEducation });
    };
    
    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { college: "", cgpa: "", duration: "" }],
        });
    };
    
    const removeEducation = (index: number) => {
        const updatedEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: updatedEducation });
    };
    
    const addSocial = () => {
        setFormData({ ...formData, socials: [...formData.socials, { label: "", url: "" }] });
    };

    const removeSocial = (index: number) => {
        const newSocials = [...formData.socials];
        newSocials.splice(index, 1);
        setFormData({ ...formData, socials: newSocials });
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const generatePdf = () => {
        const docDefinition: any = {
            pageSize: "A4",
            pageMargins: [30, 20, 30, 20],
            content: [
                { text: formData.name, style: "name" },
                { text: formData.currentRole, style: "subtitle" },
    
                // Contact details with Socials directly inside `text`
                {
                    text: [
                        { text: `📧 ${formData.email} | 📱 ${formData.phone}`, style: "contact" },
                        ...formData.socials
                            .filter(social => social.label && social.url)
                            .map(social => ({
                                text: ` | ${social.label}`,
                                link: social.url,
                                color: "blue",
                                decoration: "underline",
                            })),
                    ],
                    alignment: "center",
                    margin: [0, 0, 0, 10],
                },
    
                { text: "Education", style: "sectionHeader" },
                ...formData.education.map((edu) => [
                    {
                        columns: [
                            { text: `🎓 ${edu.college}`, bold: true },
                            { text: `${edu.duration}`, alignment: "right", italics: true },
                        ],
                    },
                    { text: `CGPA: ${edu.cgpa}`, margin: [0, 2, 0, 5] },
                ]),
                { text: "Technical Skills", style: "sectionHeader" },
                { text: formData.skills, margin: [0, 2, 0, 5] },
                { text: "Projects", style: "sectionHeader" },
                { text: formData.projects, margin: [0, 2, 0, 5] },
                { text: "Experience", style: "sectionHeader" },
                { text: formData.experience, margin: [0, 2, 0, 5] },
                { text: "Achievements", style: "sectionHeader" },
                { text: formData.achievements, margin: [0, 2, 0, 5] },
                { text: "Leadership & Activities", style: "sectionHeader" },
                { text: formData.leadership, margin: [0, 2, 0, 5] },
            ],
            styles: {
                name: { fontSize: 18, bold: true, alignment: "center", margin: [0, 0, 0, 5] },
                subtitle: { fontSize: 12, italics: true, alignment: "center", margin: [0, 0, 0, 10] },
                contact: { fontSize: 10, alignment: "center" },
                sectionHeader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5], color: "#007acc" },
            },
        };
        pdfMake.createPdf(docDefinition).download("resume.pdf");
    };
    
    
    return (
        <div className="container mt-5">
            <h2 className="text-center">Submit Your Resume Details</h2>
            <form className="p-4 border rounded shadow-sm bg-light">
            {step === 1 && (
                    <>
                        <h4 className="text-center">Personal Information</h4>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="form-control mb-3" required />
                        <input type="text" name="currentRole" placeholder="Current Role" value={formData.currentRole} onChange={handleChange} className="form-control mb-3" required />

                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-3" required />
                        <input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="form-control mb-3" required />

                        <h5>Social Links</h5>
                        {formData.socials.map((social, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <input type="text" name="label" placeholder="Label (e.g., LinkedIn, GitHub)" value={social.label} onChange={(e) => handleChange(e, index)} className="form-control me-2" required />
                                <input type="url" name="url" placeholder="URL (https://...)" value={social.url} onChange={(e) => handleChange(e, index)} className="form-control me-2" required />
                                {index > 0 && (
                                    <button type="button" className="btn btn-danger me-2" onClick={() => removeSocial(index)}>
                                        <FaMinus />
                                    </button>
                                )}
                                {index === formData.socials.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={addSocial}>
                                        <FaPlus />
                                    </button>
                                )}
                            </div>
                        ))}
                    </>
                )}

                {step === 2 && (
                    <>
                    <h4 className="text-center">Education</h4>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="mb-3 border p-3 rounded position-relative">
                            <input
                                type="text"
                                name="college"
                                placeholder="College Name"
                                value={edu.college}
                                onChange={(e) => handleEducationChange(index, e)}
                                className="form-control mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="cgpa"
                                placeholder="CGPA"
                                value={edu.cgpa}
                                onChange={(e) => handleEducationChange(index, e)}
                                className="form-control mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duration (e.g., 2019 - 2023)"
                                value={edu.duration}
                                onChange={(e) => handleEducationChange(index, e)}
                                className="form-control mb-2"
                                required
                            />
                            <div className="d-flex">
                                {index > 0 && (
                                    <button type="button" className="btn btn-danger me-2" onClick={() => removeEducation(index)}>
                                       <FaMinus />
                                    </button>
                                )}
                                {index === formData.education.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={addEducation}>
                                       <FaPlus />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
                
                )}

                {step === 3 && (
                    <>
                        <h4 className="text-center">Technical Skills & Projects</h4>
                        <textarea name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} className="form-control mb-3" required />
                        <textarea name="projects" placeholder="Projects" value={formData.projects} onChange={handleChange} className="form-control mb-3" required />
                    </>
                )}

                {step === 4 && (
                    <>
                        <h4 className="text-center">Experience</h4>
                        <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="form-control mb-3" required />
                    </>
                )}

                {step === 5 && (
                    <>
                        <h4 className="text-center">Achievements & Leadership</h4>
                        <textarea name="achievements" placeholder="Achievements" value={formData.achievements} onChange={handleChange} className="form-control mb-3" required />
                        <textarea name="leadership" placeholder="Leadership & Activities" value={formData.leadership} onChange={handleChange} className="form-control mb-3" required />
                    </>
                )}

                <div className="d-flex justify-content-between mt-3">
                    {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
                    {step < 5 ? <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button> : <button type="button" className="btn btn-success" onClick={generatePdf}>Generate PDF</button>}
                </div>
            </form>
        </div>
    );
};

export default PdfGenerator;
