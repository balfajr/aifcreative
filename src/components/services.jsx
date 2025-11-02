import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";


const Services = () => {
    const [activeService, setActiveService] = useState(null);


    const ourServices = [
        {
            id: '01',
            title: 'Custom Production',
            description: "We don't just plan events; we build experiences. From the initial spark of an idea to the flawless execution, our custom production services bring your vision to life. Whether it's a high-profile corporate event, an immersive product launch, or a breathtaking private celebration, we meticulously craft every detail. Our expertise spans everything from designing and constructing custom stages and elegant tent systems to sourcing unique furniture and managing all the behind-the-scenes logistics. We handle it all, so you can focus on enjoying the moment.",
        },
        {
            id: '02',
            title: 'Creative Concept',
            description: "Innovation is at the heart of everything we do. Our creative team thrives on transforming ordinary events into extraordinary experiences. We delve deep into understanding your objectives, target audience, and brand identity to develop a concept that resonates. From brainstorming groundbreaking themes to crafting compelling narratives, we infuse every project with imagination and artistry. Our services encompass 3D visualizations, captivating multimedia content, and impactful video teasers and aftermovies, ensuring your message is delivered with maximum impact.",
        },
        {
            id: '03',
            title: 'MICE (Meetings, Incentives, Conferences, Exhibitions)',
            description: "We understand the intricacies of the M.I.C.E. industry. Whether you're planning an intimate board meeting, a large-scale conference, or an engaging exhibition, we provide comprehensive solutions tailored to your specific needs. Our expertise extends to venue selection, logistics management, delegate registration, and on-site support. We ensure seamless execution, allowing you to focus on your business objectives while we handle the details.",
        },
        {
            id: '04',
            title: 'Audio & Visual',
            description: "Immerse your audience in a world of captivating sights and sounds. Our audio & visual services are designed to elevate your event to the next level. From state-of-the-art sound systems and dynamic lighting designs to vibrant LED screens and immersive video mapping, we create sensory experiences that leave a lasting impression. We also offer professional live streaming services to extend your reach and engage a wider audience.",
        },
        {
            id: '05',
            title: 'Print & Merchandising',
            description: "Make a tangible impact with our print & merchandising services. We create high-quality promotional materials that reinforce your brand and message. From eye-catching banners and flyers to elegant invitations and personalized souvenirs, we ensure every piece is crafted with precision and attention to detail. Our services also include designing and producing professional ID cards and wristbands for seamless event access and security.",
        },
        {
            id: '06',
            title: 'Talent & Entertainment',
            description: "Elevate the energy of your event with captivating talent and entertainment. We curate a diverse roster of performers, from engaging masters of ceremony and mesmerizing musicians to dynamic dancers and electrifying DJs. Whether you're looking for a sophisticated ambiance or a high-energy celebration, we'll find the perfect talent to create an unforgettable experience for your guests.",
        },
        {
            id: '07',
            title: 'Man Power Event',
            description: "Behind every successful event, there’s a team that builds, moves, and makes it happen. AjagIjig Familia is the movement behind the stage — the people who turn preparation into performance, and effort into experience.",
            cta: {
            href: '/team#manpower-team',
            label: 'Meet Ajagijig Familia',
  },
        },
    ];

    const arrowVariants = {
        collapsed: { rotate: 0 },
        expanded: { rotate: -45 }
    };

    const descVariants = {
        collapsed: { 
            opacity: 0, 
            height: 0,
        },
        expanded: { 
            opacity: 1, 
            height: "auto",
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="min-h-[100dvh] min-h-dvh bg-black px-4 py-4 font-space text-cream px-safe pb-safe">
            <motion.div 
                className="max-w-7xl mx-auto flex md:flex-row flex-col items-center justify-between mb-16"
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <h1 className="text-2xl md:text-5xl font-thin text-start self-start md:self-start md:w-fit mb-8 md:mb-0">
                    (<span className="font-bold">Our</span> Services)
                </h1>
                <p className="text-justify text-cream/50 md:max-w-[600px]">
                    We're not just event planners — we're architects of experiences. From concept to curtain call, we orchestrate every element of your event with precision and passion.
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto flex flex-col space-y-3">
                {ourServices.map((service) => (
                    <motion.div
                        key={service.id}
                        className="relative border border-white/20 rounded-xl overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        <div 
                            className="p-8 cursor-pointer"
                            onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-baseline gap-5">
                                    <span className="text-cream/50 text-sm">{service.id}</span>
                                    <h3 className="text-2xl font-medium">{service.title}</h3>
                                </div>
                                
                                <motion.div 
                                    variants={arrowVariants}
                                    animate={activeService === service.id ? "expanded" : "collapsed"}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MdArrowForward  className="w-6 h-6 mt-1" />
                                </motion.div>
                            </div>
                            
                            <AnimatePresence>
                                {activeService === service.id && (
                                    <motion.p 
                                        className="text-cream/80 text-sm leading-relaxed mt-4"
                                        variants={descVariants}
                                        initial="collapsed"
                                        animate="expanded"
                                        exit="collapsed"
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.description}
                                        {service.cta && (
                                        <Link
                                            to={service.cta.href}
                                            className="mt-4 md:ml-2 inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 underline"
                                        > 
                                            {service.cta.label}
                                            <MdArrowForward className="w-4 h-4" />
                                        </Link>
                                        )}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
