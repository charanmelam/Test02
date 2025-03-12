import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Result(){
    const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateForm = (step: number) => {
    setCurrentStep(step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`step rounded-circle d-flex align-items-center justify-content-center ${
              currentStep === step ? "bg-primary text-white" : "bg-secondary text-light"
            }`}
            style={{ width: 30, height: 30 }}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="card p-4">
        {currentStep === 1 && (
          <div>
            <h4>Step 1</h4>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h4>Step 2</h4>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h4>Step 3</h4>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
        )}
      </div>

      <div className="mt-3 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => updateForm(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Prev
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (currentStep < 3) {
              updateForm(currentStep + 1);
            } else {
              generatePDF();
            }
          }}
        >
          {currentStep === 3 ? "Generate PDF" : "Next"}
        </button>
      </div>

      {currentStep === 3 && (
        <div className="mt-4 p-3 border" ref={contentRef}>
          <h4>Form Preview</h4>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Password:</strong> {formData.password}</p>
        </div>
      )}

      {pdfUrl && (
        <div className="mt-4">
          <h5>PDF Preview:</h5>
          <iframe src={pdfUrl} width="100%" height="400px"></iframe>
          <a href={pdfUrl} download="FormData.pdf" className="btn btn-success mt-2">Download PDF</a>
        </div>
      )}
    </div>
  );

};
export default Result