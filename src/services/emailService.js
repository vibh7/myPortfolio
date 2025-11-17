import emailjs from "@emailjs/browser";

// Initialize EmailJS (replace with your actual public key)
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send an email using EmailJS
 * @param {object} formData - { name, email, subject, message }
 * @returns {Promise}
 */
export const sendEmail = async (formData) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: "your-email@example.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
    );
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
