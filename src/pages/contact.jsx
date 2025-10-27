import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // --- Consistent Contact Information ---
  const contactEmail = "eventmanagement@aifcreative.com";
  const contactAddress = "Jalan Kemang Timur Raya No 29 Bangka Mampang Prapatan, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730";
  const contactPhone = "6281311565794"; // tanpa '+' agar valid untuk wa.me
  const contactInstagram = "https://www.instagram.com/aifcreative/";

  // Web3Forms Access Key (baru)
  const WEB3FORMS_ACCESS_KEY = "3e33e49b-561a-48dc-83be-b06a8e84c305";

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject || "New Inquiry from AIF Creative");
    formData.append("message", data.message);
    formData.append("from_name", "AIF Creative Website Form");
    formData.append("replyto", data.email);
    formData.append("botcheck", data.botcheck || "");

    try {
      const res = await axios.post("https://api.web3forms.com/submit", formData);
      if (res.data?.success) {
        setSubmissionStatus('success');
        reset();
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-24 font-space text-cream overflow-hidden">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Kolom Kiri: Informasi Kontak */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Get in <span className="text-cream">Touch.</span>
                </h1>
                <p className="mt-4 text-lg text-cream/70 font-thin leading-relaxed">
                  We're ready to listen. Whether you have a groundbreaking idea, a question about our services, or just want to say hello—we're all ears. Let's create something amazing together.
                </p>
              </div>

              <div className="space-y-6">
                {/* Clickable Email */}
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 group">
                  <MdEmail className="text-cream text-2xl group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-light group-hover:text-cream transition-colors">{contactEmail}</span>
                </a>

                {/* Clickable Address */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <MdLocationOn className="text-cream text-4xl group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-light group-hover:text-cream transition-colors">{contactAddress}</span>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-6 pt-4">
                <motion.a
                  href={`https://wa.me/${contactPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-cream/70 hover:text-cream text-3xl transition-colors"
                >
                  <FaWhatsapp />
                </motion.a>
                <motion.a
                  href={contactInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-cream/70 hover:text-cream text-3xl transition-colors"
                >
                  <FaInstagram />
                </motion.a>
              </div>
            </motion.div>

            {/* Kolom Kanan: Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={itemVariants}
              className="w-full bg-white/5 p-8 mb-8 rounded-2xl border border-white/10 space-y-6"
            >
              {/* Honeypot (hidden) */}
              <input
                type="checkbox"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                {...register("botcheck")}
              />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cream/80 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Full name is required" })}
                  className="w-full bg-black p-3 rounded-md border border-white/20 focus:ring-2 focus:ring-white focus:outline-none transition"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-neutral-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cream/80 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  className="w-full bg-black p-3 rounded-md border border-white/20 focus:ring-2 focus:ring-white focus:outline-none transition"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-neutral-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Subject Field (baru) */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-cream/80 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full bg-black p-3 rounded-md border border-white/20 focus:ring-2 focus:ring-white focus:outline-none transition"
                  placeholder="Project / Inquiry subject"
                />
                {errors.subject && <p className="text-neutral-400 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cream/80 mb-2">How can we help?</label>
                <textarea
                  id="message"
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  className="w-full bg-black p-3 rounded-md border border-white/20 focus:ring-2 focus:ring-white focus:outline-none transition"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-neutral-400 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 text-lg font-bold text-black bg-cream rounded-lg disabled:bg-neutral-400 disabled:cursor-wait transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
              </motion.button>

              {/* Submission Status Message */}
              <div className="h-6 text-center">
                {submissionStatus === 'success' && (
                  <p className="text-yellow-300">Message sent successfully! We’ll get back to you soon.</p>
                )}
                {submissionStatus === 'error' && (
                  <p className="text-red-300">An error occurred. Please try again.</p>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      <div className="font-space relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="relative px-8 py-2 text-cream text-3xl md:text-4xl font-bold overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #FF5554, #FF0057, #5C32AE, #4A29FE, #35EA77, #FFC101)',
            backgroundSize: '200% 200%',
            borderRadius: '0px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            backgroundPosition: {
              repeat: Infinity,
              duration: 4,
              ease: 'linear',
            },
          }}
        >
          <motion.div
            className="whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                ease: "linear",
              },
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="inline-block mx-4">
                BREAK IT <span className="mx-2">→</span> MAKE IT <span className="mx-2">→</span> FLUX IT<span className="mx-2">→</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
