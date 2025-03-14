import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

const PdfGenerator: React.FC = () => {
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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
      {!submitted ? (
        <>
          <h2 className="text-center">Submit Your Resume Details</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">LinkedIn Profile</label>
              <input type="text" className="form-control" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Education</label>
              <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">CGPA</label>
              <input type="text" className="form-control" name="cgpa" value={formData.cgpa} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Technical Skills</label>
              <textarea className="form-control" name="skills" value={formData.skills} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Projects</label>
              <textarea className="form-control" name="projects" value={formData.projects} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Experience</label>
              <textarea className="form-control" name="experience" value={formData.experience} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Achievements</label>
              <textarea className="form-control" name="achievements" value={formData.achievements} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Leadership & Activities</label>
              <textarea className="form-control" name="leadership" value={formData.leadership} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h3>Preview</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
          <p><strong>Education:</strong> {formData.education} (CGPA: {formData.cgpa})</p>
          <p><strong>Skills:</strong> {formData.skills}</p>
          <p><strong>Projects:</strong> {formData.projects}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Achievements:</strong> {formData.achievements}</p>
          <p><strong>Leadership & Activities:</strong> {formData.leadership}</p>
          <button onClick={generatePdf} className="btn btn-success mt-3">Generate PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
