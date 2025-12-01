"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ContactForm() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact-form" className="w-full max-w-4xl mx-auto px-4 pb-12">
            <div className={`rounded-2xl p-8 md:p-12 border backdrop-blur-md ${
                isDark 
                    ? 'border-[rgb(44,44,46)] bg-white/5' 
                    : 'border-gray-200 bg-gray-50/90 shadow-lg'
            }`}>
                <div className="text-center mb-10">
                    <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h2>
                    <div className={`w-24 h-1 mx-auto mb-6 ${isDark ? 'bg-orange-500' : 'bg-[#48B4FF]'}`}></div>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Have questions or want to get involved? Send us a message!
                    </p>
                </div>

                {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-600 text-center">
                        Thank you for your message! We&apos;ll get back to you soon.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-600 text-center">
                        Something went wrong. Please try again later.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className={`w-full rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-1 ${
                                    isDark 
                                        ? 'bg-[rgb(18,18,20)] border border-[rgb(44,44,46)] text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500' 
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#48B4FF] focus:ring-[#48B4FF]'
                                }`}
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Last Name <span className={`font-normal ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-1 ${
                                    isDark 
                                        ? 'bg-[rgb(18,18,20)] border border-[rgb(44,44,46)] text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500' 
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#48B4FF] focus:ring-[#48B4FF]'
                                }`}
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-1 ${
                                    isDark 
                                        ? 'bg-[rgb(18,18,20)] border border-[rgb(44,44,46)] text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500' 
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#48B4FF] focus:ring-[#48B4FF]'
                                }`}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Phone Number <span className={`font-normal ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(Optional)</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-1 ${
                                    isDark 
                                        ? 'bg-[rgb(18,18,20)] border border-[rgb(44,44,46)] text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500' 
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#48B4FF] focus:ring-[#48B4FF]'
                                }`}
                                placeholder="(123) 456-7890"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className={`w-full rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-1 resize-none ${
                                isDark 
                                    ? 'bg-[rgb(18,18,20)] border border-[rgb(44,44,46)] text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500' 
                                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#48B4FF] focus:ring-[#48B4FF]'
                            }`}
                            placeholder="Your message..."
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                                isDark 
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-500/25' 
                                    : 'bg-[#48B4FF] text-white hover:bg-[#3AA0E8] hover:shadow-[#48B4FF]/25'
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
