import { motion } from "framer-motion";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiPaperAirplane,
  HiSparkles,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // null | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "a723f59c-d1be-44a1-b942-a27a15c862c6");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);
    // Optional: Add subject line
    formDataToSend.append("subject", `Portfolio Contact from ${formData.name}`);
    // Optional: Add redirect after success
    formDataToSend.append("redirect", "false");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult("success");
        setFormData({ name: "", email: "", message: "" });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitResult(null);
        }, 5000);
      } else {
        console.error("Form submission error:", data);
        setSubmitResult("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitResult("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: HiMail,
      label: "Email",
      value: "info@mohammadshoaibkhan.com",
      link: "mailto:info@mohammadshoaibkhan.com",
    },
    {
      icon: HiPhone,
      label: "Phone",
      value: "+91 73102 49234",
      link: "tel:+917310249234",
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: "India",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      link: "https://github.com/mohdshoaibkhan72",
      color: "hover:bg-gray-700",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/mohdshoaibkhan72",
      color: "hover:bg-blue-600",
    },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4"
          >
            <HiSparkles className="text-indigo-400 w-5 h-5" />
            <span className="text-indigo-300 text-sm font-medium">
              Let's Connect
            </span>
          </motion.div>

          <h2 className="mb-4 text-white text-4xl font-bold">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base leading-relaxed">
            Have a project in mind or want to collaborate? I'm always excited to
            discuss new opportunities and ideas!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-white text-2xl font-semibold">
                Contact Information
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                Feel free to reach out through any of the following channels. I
                typically respond within 24 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/30">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-slate-400 text-sm font-medium">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white hover:text-indigo-400 transition-colors text-sm font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-slate-300 mb-4 font-medium">
                Connect with me on social:
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 ${social.color} hover:border-transparent text-white transition-all shadow-lg group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <p className="text-2xl font-bold text-white mb-1">24h</p>
                <p className="text-slate-400 text-sm">Response Time</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                <p className="text-2xl font-bold text-white mb-1">100%</p>
                <p className="text-slate-400 text-sm">Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Custom Card */}
            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-3 ${
                    submitResult === "success"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                      : submitResult === "error"
                      ? "bg-gradient-to-r from-red-600 to-rose-600"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  } disabled:from-slate-600 disabled:to-slate-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : submitResult === "success" ? (
                    <>
                      <HiCheckCircle className="w-5 h-5" />
                      Sent Successfully!
                    </>
                  ) : submitResult === "error" ? (
                    <>
                      <HiXCircle className="w-5 h-5" />
                      Failed - Try Again
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                {submitResult === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                  >
                    <p className="text-emerald-400 text-sm text-center">
                      Thank you! I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
                {submitResult === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-400 text-sm text-center">
                      Oops! Something went wrong. Please try again or email me
                      directly.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
