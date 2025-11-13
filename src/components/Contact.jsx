import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_akl72g7",
        "template_sfl5b0q",
        form.current,
        "Kv_n4s6R3hpdaFBOc"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <h2 className="text-4xl font-semibold mb-10 text-center dark:text-white text-gray-900">
        Contact Me
      </h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-xl mx-auto flex flex-col gap-6"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={6}
          className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-all"
        >
          Send Message
        </button>

        {done && (
          <p className="text-green-500 mt-2 text-center">
            Your message has been sent successfully!
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
