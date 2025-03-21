import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

const PdfGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    education: "",
    cgpa: "",
    skills: "",
    projects: "",
    experience: "",
    achievements: "",
    leadership: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const generatePdf = () => {
    const docDefinition: any = {
      pageSize: "A4",
      pageMargins: [30, 20, 30, 20],
      content: [
        { text: formData.name, style: "name" },
        { text: "Entry-Level Software Developer", style: "subtitle" },
        { text: `📧 ${formData.email} | 📱 ${formData.phone} | 🔗 ${formData.linkedin}`, style: "contact" },
        { text: "Education", style: "sectionHeader" },
        {
          columns: [
            { text: `🎓 ${formData.education}`, bold: true },
            { text: `CGPA: ${formData.cgpa}`, alignment: "right" },
          ],
        },
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
        contact: { fontSize: 10, alignment: "center", margin: [0, 0, 0, 15] },
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
            <h4>Personal Information</h4>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="form-control mb-3" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-3" required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="form-control mb-3" required />
            <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="form-control mb-3" required />
          </>
        )}

        {step === 2 && (
          <>
            <h4>Education</h4>
            <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="form-control mb-3" required />
            <input type="text" name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} className="form-control mb-3" required />
          </>
        )}

        {step === 3 && (
          <>
            <h4>Technical Skills & Projects</h4>
            <textarea name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} className="form-control mb-3" required />
            <textarea name="projects" placeholder="Projects" value={formData.projects} onChange={handleChange} className="form-control mb-3" required />
          </>
        )}

        {step === 4 && (
          <>
            <h4>Experience</h4>
            <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="form-control mb-3" required />
          </>
        )}

        {step === 5 && (
          <>
            <h4>Achievements & Leadership</h4>
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
