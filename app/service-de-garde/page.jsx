"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";

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
  <div ref={containerRef} className="flex items-stretch gap-8 h-auto lg:flex-row flex-col items-center text-left">
    {children}
  </div>
);

const OrderContainer = ({ children }) => (
  <div className="lg:order-none order-1">
    {children}
  </div>
);

const Image = motion.img;

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

export default function ServiceParascolaire() {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const controls5 = useAnimation();

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const containerRef3 = useRef(null);
    const containerRef4 = useRef(null);
    const containerRef5 = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case containerRef1.current:
                            controls1.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef2.current:
                            controls2.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef3.current:
                            controls3.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef4.current:
                            controls4.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef5.current:
                            controls5.start({ x: 0, opacity: 1 });
                            break;
                        default:
                            break;
                    }
                }
            });
        };

        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (containerRef1.current) observer.observe(containerRef1.current);
        if (containerRef2.current) observer.observe(containerRef2.current);
        if (containerRef3.current) observer.observe(containerRef3.current);
        if (containerRef4.current) observer.observe(containerRef4.current);
        if (containerRef5.current) observer.observe(containerRef5.current);

        return () => {
            if (containerRef1.current) observer.unobserve(containerRef1.current);
            if (containerRef2.current) observer.unobserve(containerRef2.current);
            if (containerRef3.current) observer.unobserve(containerRef3.current);
            if (containerRef4.current) observer.unobserve(containerRef4.current);
            if (containerRef5.current) observer.unobserve(containerRef5.current);
        };
    }, [controls1, controls2, controls3, controls4, controls5]);

    return (
        <>
            <Header
                animate={false}
                imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                headerText="SERVICE PARASCOLAIRE"
                headerTextTop="70%"
            />

            <StyledDiv>
                {/* Introduction Section */}
                <MotionDiv className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                    <ContentContainer containerRef={containerRef1}>
                        <Image 
                            src="../../images/SDG/sdg1.jpg" 
                            alt="Service parascolaire"
                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls1}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                        <TextBlock
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls1}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Service Enrichi
                            </Typography>
                            <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    L'école arménienne Sourp Hagop offre un service de garde enrichi d'activités parascolaires pour les élèves du primaire. Conformément aux normes et aux valeurs de l'école, ce service propose une variété d'activités pour les jeunes du primaire entre 16h20 et 18h00 tous les jours d'école.
                                </Typography>
                            </TextContainer>
                        </TextBlock>
                    </ContentContainer>
                </MotionDiv>

                {/* Pricing Section */}
                <MotionDiv className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                    <ContentContainer containerRef={containerRef2}>
                        <OrderContainer>
                            <PricingContainer
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={controls2}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" style={{ color: "white", marginBottom: "20px" }}>
                                    Tarifs et Inscription
                                </Typography>
                                <TextContainer>
                                    <Typography as="p" type="h6" style={{ color: "white", marginBottom: "20px" }}>
                                        L'inscription peut se faire sur une base quotidienne, hebdomadaire ou mensuelle via le portail Parents.
                                    </Typography>
                                    <PriceItem>
                                        <PriceCircle>8$</PriceCircle>
                                        <Typography as="p" type="p" style={{ color: "white" }}>
                                            Hebdomadaire/Mensuel par jour
                                        </Typography>
                                    </PriceItem>
                                    <PriceItem>
                                        <PriceCircle>10$</PriceCircle>
                                        <Typography as="p" type="p" style={{ color: "white" }}>
                                            Quotidien par jour
                                        </Typography>
                                    </PriceItem>
                                    <Typography as="p" type="caption" style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "15px", fontStyle: "italic" }}>
                                        Date limite: 11h00 le matin même. Aucun remboursement en cas d'absence.
                                    </Typography>
                                </TextContainer>
                            </PricingContainer>
                        </OrderContainer>
                        <Image 
                            src="../../images/SDG/sdg3.jpg" 
                            alt="Inscription service parascolaire"
                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                        />
                    </ContentContainer>
                </MotionDiv>

                {/* Student Process Section */}
                <MotionDiv className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                    <ContentContainer containerRef={containerRef3}>
                        <Image 
                            src="../../images/SDG/sdg2.jpg" 
                            alt="Activités élèves"
                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                        />
                        <ProcessContainer
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls3}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Procédure Élèves
                            </Typography>
                            <StepsList>
                                <StepItem>
                                    <StepNumber>1</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            <strong>16h10:</strong> Accompagnement au local 114 pour la prise de présence
                                        </Typography>
                                    </div>
                                </StepItem>
                                <StepItem>
                                    <StepNumber>2</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            Activités variées: sports, arts plastiques, jeux coopératifs, activités culturelles et lecture animée
                                        </Typography>
                                    </div>
                                </StepItem>
                                <StepItem>
                                    <StepNumber>3</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            Période de devoirs en autonomie
                                        </Typography>
                                    </div>
                                </StepItem>
                            </StepsList>
                        </ProcessContainer>
                    </ContentContainer>
                </MotionDiv>

                {/* Parent Process Section */}
                <MotionDiv className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                    <ContentContainer containerRef={containerRef4}>
                        <OrderContainer>
                            <TextBlock
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={controls4}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Procédure Parents
                                </Typography>
                                <TextContainer>
                                    <Typography as="p" type="h6" color="dark">
                                        Les parents devront se présenter à la porte d'entrée des autobus scolaires et se présenter au local 114 pour récupérer leur enfant. Une signature sera exigée du parent lors de la récupération.
                                    </Typography>
                                </TextContainer>
                            </TextBlock>
                        </OrderContainer>
                        <Image 
                            src="../../images/SDG/sdg5.jpg" 
                            alt="Récupération des enfants"
                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                        />
                    </ContentContainer>
                </MotionDiv>

                {/* Important Information Section */}
                <MotionDiv className="flex gap-8 flex-col mt-12 mx-auto w-4/5">
                    <ContentContainer containerRef={containerRef5}>
                        <Image 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Informations importantes"
                            className="w-1/2 h-auto object-cover lg:w-1/2 w-full"
                        />
                        <InfoHighlight
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls5}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "var(--spacing-4)" }}>
                                Informations Importantes
                            </Typography>
                            <TextContainer>
                                <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-4)" }}>
                                    En cas d'absence, envoyez un courriel avant 11h00 à serviceparascolaire@ecolesourphagop.com avec le nom, la classe et la date d'absence.
                                </Typography>
                                <Typography as="p" type="p" color="dark" style={{ marginBottom: "var(--spacing-2)" }}>
                                    <strong>Contact:</strong>
                                </Typography>
                                <Typography as="p" type="p" color="dark">
                                    514 332-1373 poste 249
                                </Typography>
                            </TextContainer>
                        </InfoHighlight>
                    </ContentContainer>
                </MotionDiv>
            </StyledDiv>

            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Footer />
        </>
    );
}