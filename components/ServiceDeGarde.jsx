// components/ServiceDeGarde.jsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Typography = ({ as: Component = 'p', type, color, children, style, className, ...props }) => {
    const getClasses = () => {
        let classes = 'm-4 font-sans ';

        const typeClasses = {
            h1: 'text-4xl font-bold ',
            h2: 'text-3xl font-bold ',
            h3: 'text-2xl font-bold ',
            h4: 'text-xl font-bold ',
            h5: 'text-lg font-bold ',
            h6: 'text-lg font-light ',
            body: 'text-base ',
            p: 'text-base ',
            caption: 'text-sm '
        };

        classes += typeClasses[type] || '';
        classes += className || '';

        return classes.trim();
    };

    const getColorStyle = () => {
        const colorStyles = {
            primary: { color: 'var(--primary-color)' },
            secondary: { color: 'var(--secondary-color)' },
            dark: { color: 'var(--secondary-darkcolor)' },
            light: { color: 'white' }
        };

        return { ...style, ...colorStyles[color] };
    };

    return <Component className={getClasses()} style={getColorStyle()} {...props}>{children}</Component>;
};

const StyledDiv = ({ children }) => (
    <div className="text-left py-2 pb-40 relative">
        {children}
    </div>
);

const TextContainer = ({ children }) => (
    <div className="w-full text-left">
        {children}
    </div>
);

const MotionDiv = motion.div;

const ContentContainer = ({ children, containerRef }) => (
    <div ref={containerRef} className="flex items-stretch gap-8 lg:flex-row flex-col text-left">
        {children}
    </div>
);

const Image = styled(motion.img)`
  width: 50%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

const OrderContainer = ({ children }) => (
    <div className="lg:order-none order-1">
        {children}
    </div>
);

const TextBlock = ({ children, ...motionProps }) => (
    <motion.div
        className="flex flex-col p-24 items-start flex-1 overflow-hidden xl:p-24 lg:py-12 lg:px-12 md:py-12 md:px-8"
        style={{ backgroundColor: 'var(--secondary-color)' }}
        {...motionProps}
    >
        {children}
    </motion.div>
);

const PricingContainer = ({ children, ...motionProps }) => (
    <motion.div
        className="text-white p-16 rounded-none flex flex-col justify-center items-start xl:p-16 lg:py-10 lg:px-12 md:py-10 md:px-8"
        style={{ backgroundColor: 'var(--secondary-darkcolor)' }}
        {...motionProps}
    >
        {children}
    </motion.div>
);

const PriceItem = ({ children }) => (
    <div className="my-4 flex items-center gap-4">
        {children}
    </div>
);

const PriceCircle = ({ children }) => (
    <div className="w-16 h-16 flex items-center justify-center text-sm rounded-full"
        style={{
            backgroundColor: 'var(--secondary-color)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            color: 'white'
        }}>
        {children}
    </div>
);

const ProcessContainer = ({ children, ...motionProps }) => (
    <motion.div
        className="p-16 flex flex-col justify-center items-start xl:p-16 lg:py-10 lg:px-12 md:py-10 md:px-8"
        style={{ backgroundColor: 'var(--secondary-color)' }}
        {...motionProps}
    >
        {children}
    </motion.div>
);

const StepsList = ({ children }) => (
    <div className="flex flex-col gap-5 mt-5 w-full">
        {children}
    </div>
);

const StepItem = ({ children }) => (
    <div className="flex items-start gap-4">
        {children}
    </div>
);

const StepNumber = ({ children }) => (
    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0"
        style={{ backgroundColor: 'var(--primary-color)' }}>
        {children}
    </div>
);

const InfoHighlight = ({ children, ...motionProps }) => (
    <motion.div
        className="p-16 flex flex-col justify-center items-start xl:p-16 lg:py-10 lg:px-12 md:py-10 md:px-8"
        style={{
            backgroundColor: 'var(--secondary-color)',
            borderLeft: '4px solid var(--primary-color)'
        }}
        {...motionProps}
    >
        {children}
    </motion.div>
);

export default function ServiceDeGarde({ data }) {
    const headerImageUrl = data?.headerImageUrl;
    const headerText = data?.headerText;
    const sections = Array.isArray(data?.sections) ? data.sections : [];

    const sectionRefs = useRef([]);

    // Initialize controls at the top level based on sections count
    const sectionsCount = sections.length;
    const sectionControls = useRef(
        Array.from({ length: sectionsCount }, () => useAnimation())
    );

    // Update controls when sections count changes
    useEffect(() => {
        if (!sections.length) return;

        const newCount = sections.length;
        const currentCount = sectionControls.current.length;

        if (newCount !== currentCount) {
            sectionControls.current = Array.from({ length: newCount }, () => useAnimation());
        }
    }, [sections.length]);

    useEffect(() => {
        if (!sections.length) return;

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.indexOf(entry.target);
                    if (index !== -1 && sectionControls.current[index]) {
                        sectionControls.current[index].start({ x: 0, opacity: 1 });
                    }
                }
            });
        };

        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [sections]);

    const renderSection = (section, index) => {
        // Automatically alternate: even indices = left, odd indices = right
            console.log(`Section ${index}:`, section.imagePosition); // Debug line

        const isLeft = section.imagePosition === 'left';

        switch (section.sectionType) {
            case 'introduction':
                return (
                    <MotionDiv key={index} className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                        <ContentContainer containerRef={(el) => (sectionRefs.current[index] = el)}>
                            {isLeft ? (
                                <>
                                    {section.imageUrl && (
                                        <motion.img
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                    <TextBlock
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={sectionControls.current[index]}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Typography as="h3" type="h3" color="primary">
                                            {section.title}
                                        </Typography>
                                        <TextContainer>
                                            <Typography as="p" type="h6" color="dark">
                                                {section.content}
                                            </Typography>
                                        </TextContainer>
                                    </TextBlock>
                                </>
                            ) : (
                                <>
                                    <OrderContainer>
                                        <TextBlock
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Typography as="h3" type="h3" color="primary">
                                                {section.title}
                                            </Typography>
                                            <TextContainer>
                                                <Typography as="p" type="h6" color="dark">
                                                    {section.content}
                                                </Typography>
                                            </TextContainer>
                                        </TextBlock>
                                    </OrderContainer>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                </>
                            )}
                        </ContentContainer>
                    </MotionDiv>
                );

            case 'pricing':
                return (
                    <MotionDiv key={index} className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                        <ContentContainer containerRef={(el) => (sectionRefs.current[index] = el)}>
                            {isLeft ? (
                                <>
                                    <OrderContainer>
                                        <PricingContainer
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Typography as="h3" type="h3" style={{ color: "white", marginBottom: "20px" }}>
                                                {section.title}
                                            </Typography>
                                            <TextContainer>
                                                <Typography as="p" type="h6" style={{ color: "white", marginBottom: "20px" }}>
                                                    {section.content}
                                                </Typography>
                                                {section.pricingItems?.map((item, i) => (
                                                    <PriceItem key={i}>
                                                        <PriceCircle>{item.price}</PriceCircle>
                                                        <Typography as="p" type="p" style={{ color: "white" }}>
                                                            {item.description}
                                                        </Typography>
                                                    </PriceItem>
                                                ))}
                                                {section.pricingNote && (
                                                    <Typography as="p" type="caption" style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "15px", fontStyle: "italic" }}>
                                                        {section.pricingNote}
                                                    </Typography>
                                                )}
                                            </TextContainer>
                                        </PricingContainer>
                                    </OrderContainer>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                    <PricingContainer
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={sectionControls.current[index]}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Typography as="h3" type="h3" style={{ color: "white", marginBottom: "20px" }}>
                                            {section.title}
                                        </Typography>
                                        <TextContainer>
                                            <Typography as="p" type="h6" style={{ color: "white", marginBottom: "20px" }}>
                                                {section.content}
                                            </Typography>
                                            {section.pricingItems?.map((item, i) => (
                                                <PriceItem key={i}>
                                                    <PriceCircle>{item.price}</PriceCircle>
                                                    <Typography as="p" type="p" style={{ color: "white" }}>
                                                        {item.description}
                                                    </Typography>
                                                </PriceItem>
                                            ))}
                                            {section.pricingNote && (
                                                <Typography as="p" type="caption" style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "15px", fontStyle: "italic" }}>
                                                    {section.pricingNote}
                                                </Typography>
                                            )}
                                        </TextContainer>
                                    </PricingContainer>
                                </>
                            )}
                        </ContentContainer>
                    </MotionDiv>
                );

            case 'studentProcess':
                return (
                    <MotionDiv key={index} className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                        <ContentContainer containerRef={(el) => (sectionRefs.current[index] = el)}>
                            {isLeft ? (
                                <>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                    <ProcessContainer
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={sectionControls.current[index]}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Typography as="h3" type="h3" color="primary">
                                            {section.title}
                                        </Typography>
                                        <StepsList>
                                            {section.processSteps?.map((step, i) => (
                                                <StepItem key={i}>
                                                    <StepNumber>{step.stepNumber}</StepNumber>
                                                    <div>
                                                        <Typography as="p" type="body" color="dark">
                                                            {step.stepContent}
                                                        </Typography>
                                                    </div>
                                                </StepItem>
                                            ))}
                                        </StepsList>
                                    </ProcessContainer>
                                </>
                            ) : (
                                <>
                                    <OrderContainer>
                                        <ProcessContainer
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Typography as="h3" type="h3" color="primary">
                                                {section.title}
                                            </Typography>
                                            <StepsList>
                                                {section.processSteps?.map((step, i) => (
                                                    <StepItem key={i}>
                                                        <StepNumber>{step.stepNumber}</StepNumber>
                                                        <div>
                                                            <Typography as="p" type="body" color="dark">
                                                                {step.stepContent}
                                                            </Typography>
                                                        </div>
                                                    </StepItem>
                                                ))}
                                            </StepsList>
                                        </ProcessContainer>
                                    </OrderContainer>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                </>
                            )}
                        </ContentContainer>
                    </MotionDiv>
                );

            case 'parentProcess':
                return (
                    <MotionDiv key={index} className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                        <ContentContainer containerRef={(el) => (sectionRefs.current[index] = el)}>
                            {isLeft ? (
                                <>
                                    <OrderContainer>
                                        <TextBlock
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Typography as="h3" type="h3" color="primary">
                                                {section.title}
                                            </Typography>
                                            <TextContainer>
                                                <Typography as="p" type="h6" color="dark">
                                                    {section.content}
                                                </Typography>
                                            </TextContainer>
                                        </TextBlock>
                                    </OrderContainer>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                    <TextBlock
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={sectionControls.current[index]}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Typography as="h3" type="h3" color="primary">
                                            {section.title}
                                        </Typography>
                                        <TextContainer>
                                            <Typography as="p" type="h6" color="dark">
                                                {section.content}
                                            </Typography>
                                        </TextContainer>
                                    </TextBlock>
                                </>
                            )}
                        </ContentContainer>
                    </MotionDiv>
                );

            case 'importantInfo':
                return (
                    <MotionDiv key={index} className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                        <ContentContainer containerRef={(el) => (sectionRefs.current[index] = el)}>
                            {isLeft ? (
                                <>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                    <InfoHighlight
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={sectionControls.current[index]}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "var(--spacing-4)" }}>
                                            {section.title}
                                        </Typography>
                                        <TextContainer>
                                            <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-4)" }}>
                                                {section.content}
                                            </Typography>
                                            {section.contactInfo && (
                                                <>
                                                    <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-2)" }}>
                                                        <strong>Contact:</strong>
                                                    </Typography>
                                                    {section.contactInfo.email && (
                                                        <Typography as="p" type="p" color="dark">
                                                            {section.contactInfo.email}
                                                        </Typography>
                                                    )}
                                                    {section.contactInfo.phone && (
                                                        <Typography as="p" type="p" color="dark">
                                                            {section.contactInfo.phone}
                                                        </Typography>
                                                    )}
                                                </>
                                            )}
                                        </TextContainer>
                                    </InfoHighlight>
                                </>
                            ) : (
                                <>
                                    <OrderContainer>
                                        <InfoHighlight
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "var(--spacing-4)" }}>
                                                {section.title}
                                            </Typography>
                                            <TextContainer>
                                                <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-4)" }}>
                                                    {section.content}
                                                </Typography>
                                                {section.contactInfo && (
                                                    <>
                                                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-2)" }}>
                                                            <strong>Contact:</strong>
                                                        </Typography>
                                                        {section.contactInfo.email && (
                                                            <Typography as="p" type="p" color="dark">
                                                                {section.contactInfo.email}
                                                            </Typography>
                                                        )}
                                                        {section.contactInfo.phone && (
                                                            <Typography as="p" type="p" color="dark">
                                                                {section.contactInfo.phone}
                                                            </Typography>
                                                        )}
                                                    </>
                                                )}
                                            </TextContainer>
                                        </InfoHighlight>
                                    </OrderContainer>
                                    {section.imageUrl && (
                                        <Image
                                            src={section.imageUrl}
                                            alt={section.title || ""}
                                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                                            initial={{ x: "100%", opacity: 0 }}
                                            animate={sectionControls.current[index]}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    )}
                                </>
                            )}
                        </ContentContainer>
                    </MotionDiv>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Header
                animate={false}
                imageSrc={headerImageUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                headerText={headerText || "SERVICE DE GARDE"}
                headerTextTop="70%"
            />

            <StyledDiv>
                {sections.map((section, index) => renderSection(section, index))}
            </StyledDiv>

            <Footer />
        </>
    );
}