import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const formSteps = [
    {
        title: "Personal Information",
        fields: [
            { name: "fullName", label: "Full Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone Number", type: "text" },
        ],
    },
    {
        title: "Address Details",
        fields: [
            { name: "street", label: "Street", type: "text" },
            { name: "city", label: "City", type: "text" },
            { name: "zip", label: "ZIP Code", type: "text" },
        ],
    },
    {
        title: "Job Details",
        fields: [
            { name: "company", label: "Company Name", type: "text" },
            { name: "position", label: "Position", type: "text" },
            { name: "experience", label: "Years of Experience", type: "number" },
        ],
    },
];

function Result() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
    const contentRef = useRef<HTMLDivElement>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    // Handle input change dynamically
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Move to next/previous step
    const updateFormStep = (step: number) => {
        setCurrentStep(step);
    };

    // Generate PDF from structured HTML
    const generatePDF = async () => {
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            setPdfUrl(URL.createObjectURL(pdf.output("blob")));
        }
    };

    return (
        <div className="container mt-5">
            {/* Step Indicators */}
            <div className="d-flex justify-content-between mb-3">
                {formSteps.map((_step, index) => (
                    <div
                        key={index}
                        className={`step rounded-circle d-flex align-items-center justify-content-center ${currentStep === index ? "bg-primary text-white" : "bg-secondary text-light"
                            }`}
                        style={{ width: 30, height: 30 }}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>

            {/* Form Fields */}
            <div className="card p-4">
                <h4>{formSteps[currentStep].title}</h4>
                {formSteps[currentStep].fields.map((field) => (
                    <div key={field.name} className="mb-3">
                        <label className="form-label">{field.label}</label>
                        <input
                            type={field.type}
                            className="form-control"
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => updateFormStep(currentStep - 1)} disabled={currentStep === 0}>
                    Prev
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => (currentStep < formSteps.length - 1 ? updateFormStep(currentStep + 1) : generatePDF())}
                >
                    {currentStep === formSteps.length - 1 ? "Generate PDF" : "Next"}
                </button>
            </div>

            {/* 📌 The HTML Content That Gets Converted to PDF */}
            {currentStep === formSteps.length - 1 && (
                <div className="mt-4 p-3 border" ref={contentRef}>
                    <h2 className="text-center"><b>User Information</b></h2>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>Full Name:</strong></td>
                                <td>{formData.fullName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{formData.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone Number:</strong></td>
                                <td>{formData.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Street:</strong></td>
                                <td>{formData.street}</td>
                            </tr>
                            <tr>
                                <td><strong>City:</strong></td>
                                <td>{formData.city}</td>
                            </tr>
                            <tr>
                                <td><strong>ZIP Code:</strong></td>
                                <td>{formData.zip}</td>
                            </tr>
                            <tr>
                                <td><strong>Company Name:</strong></td>
                                <td>{formData.company}</td>
                            </tr>
                            <tr>
                                <td><strong>Position:</strong></td>
                                <td>{formData.position}</td>
                            </tr>
                            <tr>
                                <td><strong>Years of Experience:</strong></td>
                                <td>{formData.experience}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            )}

            {/* PDF Preview & Download Button */}
            {pdfUrl && (
                <div className="mt-4">
                    <h5>PDF Preview:</h5>
                    <iframe src={pdfUrl} width="100%" height="400px"></iframe>
                    <a href={pdfUrl} download="UserDetails.pdf" className="btn btn-success mt-2">
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    );

};
export default Result