"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send, ShieldCheck } from "lucide-react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  productRequirement: "",
  message: "",
  website: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s().-]{5,24}$/;

function validate(values) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = "Please enter a valid email, for example name@company.com.";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Please enter your phone or WhatsApp number.";
  } else if (!phonePattern.test(values.phone.trim())) {
    nextErrors.phone = "Please include country code if possible, for example +1 555 123 4567.";
  }

  return nextErrors;
}

export default function B2BInquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const { [name]: _removed, ...rest } = current;
      return rest;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Please complete the required fields before submitting."
      });
      return;
    }

    setStatus({ type: "loading", message: "Submitting your inquiry..." });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pageUrl: window.location.href
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Submission failed. Please try again.");
      }

      setValues(initialValues);
      setErrors({});
      setStatus({
        type: "success",
        message: result.message || "Thank you. Your inquiry has been submitted successfully."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Submission failed. Please email us directly."
      });
    }
  }

  return (
    <form className="b2b-inquiry-form" noValidate onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        className="form-honeypot"
        name="website"
        onChange={updateField}
        tabIndex="-1"
        type="text"
        value={values.website}
      />

      <div className="inquiry-form-grid">
        <label>
          <span>
            Name <strong>*</strong>
          </span>
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            name="name"
            onChange={updateField}
            placeholder="Your full name"
            required
            type="text"
            value={values.name}
          />
          {errors.name && <small id="name-error">{errors.name}</small>}
        </label>

        <label>
          <span>
            Email <strong>*</strong>
          </span>
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            name="email"
            onChange={updateField}
            placeholder="name@company.com"
            required
            type="email"
            value={values.email}
          />
          {errors.email && <small id="email-error">{errors.email}</small>}
        </label>

        <label>
          <span>
            Phone / WhatsApp <strong>*</strong>
          </span>
          <input
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            name="phone"
            onChange={updateField}
            placeholder="+1 555 123 4567"
            required
            type="tel"
            value={values.phone}
          />
          {errors.phone && <small id="phone-error">{errors.phone}</small>}
        </label>

        <label>
          <span>Company Name</span>
          <input
            autoComplete="organization"
            name="company"
            onChange={updateField}
            placeholder="Your company or organization"
            type="text"
            value={values.company}
          />
        </label>

        <label>
          <span>Country / Region</span>
          <input
            autoComplete="country-name"
            name="country"
            onChange={updateField}
            placeholder="United States, Germany, UAE..."
            type="text"
            value={values.country}
          />
        </label>

        <label>
          <span>Product Requirement</span>
          <select
            name="productRequirement"
            onChange={updateField}
            value={values.productRequirement}
          >
            <option value="">Select a product or project type</option>
            <option value="Kinetic Lighting System">Kinetic Lighting System</option>
            <option value="XL Winch System">XL Winch System</option>
            <option value="LED Lifting Ball">LED Lifting Ball</option>
            <option value="X-K16C PRO Beam Ring">X-K16C PRO Beam Ring</option>
            <option value="Kinetic LED Bar">Kinetic LED Bar</option>
            <option value="OEM / ODM Project">OEM / ODM Project</option>
          </select>
        </label>

        <label className="full">
          <span>Message</span>
          <textarea
            name="message"
            onChange={updateField}
            placeholder="Tell us venue type, quantity, lifting height, deadline, target country or any project details..."
            value={values.message}
          />
        </label>
      </div>

      <div className="inquiry-form-footer">
        <p>
          <ShieldCheck size={16} aria-hidden="true" />
          Your information will only be used for quotation and project communication.
        </p>
        <button className="button button-primary" disabled={status.type === "loading"} type="submit">
          {status.type === "loading" ? (
            <>
              <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
              Submitting
            </>
          ) : (
            <>
              Submit Inquiry
              <Send size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {status.message && (
        <div className={`form-status form-status-${status.type}`} role="status" aria-live="polite">
          {status.type === "loading" ? (
            <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
          ) : status.type === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
}
