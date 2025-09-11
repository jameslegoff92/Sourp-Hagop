"use client"

import { useState } from "react";
import Header from "../../components/ui/Header"
import Footer from "../../components/ui/Footer"
import styled from "@emotion/styled"
import Typography from "../../components/display/Typography"
import { motion } from "framer-motion"
import BackgroundLogo from "../../components/ui/BackgroundLogo"

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 200px;
  position: relative;
`

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin: 50px auto 0;
  width: 100%;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const ContactForm = styled(motion.div)`
  background: var(--secondary-color);
  padding: 40px;
  border: 1px solid #e8f4fd;
  text-align: left;
`

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 100px;
`

const InfoCard = styled.div`
  background: var(--secondary-color);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;

`

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: transparent;
  display: flex;
  justify-content: left;
  margin-bottom: 12px;
  font-size: 1.2rem;
`

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--secondary-darkcolor);
  margin: 0 0 8px 0;
`

const InfoText = styled.p`
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`

const FormSection = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--secondary-darkcolor);
  margin: 0 0 24px 0;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
`

const Input = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    border-color: var(--secondary-darkcolor);
    box-shadow: 0 0 0 3px rgba(0, 125, 195, 0.1);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  
  &:focus {
    border-color: var(--secondary-darkcolor);
    box-shadow: 0 0 0 3px rgba(0, 125, 195, 0.1);
  }
`

const SubmitButton = styled.button`
  background: var(--secondary-darkcolor);
  color: white;
  border-radius: 50px;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    color: var(--secondary-darkcolor);
    background: transparent;
    border: 1px solid var(--secondary-darkcolor);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondary-darkcolor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px;
`

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 500;
`
const MapContainer = styled.div`
  margin-top: 16px;
  position: relative;
  height: 200px;
  background: #f8fbff;
  border: 1px solid #e8f4fd;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    filter: grayscale(20%) contrast(1.1) brightness(1.1);
    
    &:hover {
      filter: grayscale(0%) contrast(1) brightness(1);
      transition: filter 0.3s ease;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 125, 195, 0.1), rgba(0, 71, 153, 0.05));
    pointer-events: none;
  }
`

const MapOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--secondary-darkcolor), transparent);
  color: white;
  padding: 12px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  pointer-events: none;
`

export default function Contact({ data }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  // Create FormData for Web3Forms
  const formDataToSend = new FormData();
  formDataToSend.append('access_key', process.env.NEXT_PUBLIC_W3F_CONTACT_KEY);
  formDataToSend.append('subject', `Contact: ${formData.subject}`);
  formDataToSend.append('from_name', `${formData.firstName} ${formData.lastName}`);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('message', formData.message);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();
    
    if (data.success) {
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setError(data.message || 'Erreur lors de l\'envoi.');
    }
  } catch (err) {
    setError('Impossible d\'envoyer le formulaire.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <Header
        imageSrc={data?.headerImageUrl || "../images/header/contact-header.jpg"}
        headerText={data?.headerText || "CONTACTEZ-NOUS"}
        headerTextTop="70%"
      />
      <StyledDiv>
        <MotionDiv>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {data?.introTitle || "Nous sommes là pour vous"}
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h6"
              color="dark"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {data?.introText || "Notre équipe est prête à répondre à toutes vos questions et à vous accompagner dans vos projets. N'hésitez pas à nous contacter pour discuter de vos besoins."}
            </Typography>
          </TextContainer>
          
          <ContactContainer>
            <ContactInfo
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
            <InfoCard>
            <InfoIcon><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#006096" d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0M12 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-2a2 2 0 1 1 0-4a2 2 0 0 1 0 4"/></svg></InfoIcon>
            <InfoTitle>Notre adresse</InfoTitle>
            <InfoText>
                3400 Rue Nadon<br />
                Montréal, QC H4J 1P6<br />
                Canada
            </InfoText>
            
            <MapContainer>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5589.880160757173!2d-73.69843852366428!3d45.53141132895166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9187f7d660177%3A0xf0c6d13f40348c40!2sSourp%20Hagop%20Armenian%20School!5e0!3m2!1sen!2sca!4v1757545560903!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Notre localisation"
                />
                <MapOverlay>Cliquez pour ouvrir dans Google Maps</MapOverlay>
            </MapContainer>
            </InfoCard>

              <InfoCard>
                <InfoIcon><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#006096" d="M21 16.42v3.536a1 1 0 0 1-.93.998Q19.415 21 19 21C10.163 21 3 13.837 3 5q0-.414.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45q.034.344.064.552A13.9 13.9 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.05 13.05 0 0 0 6.844 6.844l1.54-2.154a.46.46 0 0 1 .573-.149a13.9 13.9 0 0 0 4 1.205q.208.03.55.064a.5.5 0 0 1 .449.498"/></svg></InfoIcon>
                <InfoTitle>Téléphone</InfoTitle>
                <InfoText>
                  (514) 332-1373<br />
                  Lun - Ven: 9h00 - 16h00
                </InfoText>
              </InfoCard>
            </ContactInfo>

            <ContactForm
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {!isSubmitted ? (
                <div>
                  <FormSection>Envoyez-nous un message</FormSection>
                  
                <FormRow>
                <FieldWrapper>
                    <Label>Prénom *</Label>
                    <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Nom *</Label>
                    <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    />
                </FieldWrapper>
                </FormRow>

                <FormRow>
                <FieldWrapper>
                    <Label>Email *</Label>
                    <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Téléphone</Label>
                    <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                </FieldWrapper>
                </FormRow>
                  <FieldWrapper>
                    <Label>Sujet *</Label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label>Message *</Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre projet ou votre demande..."
                      required
                    />
                  </FieldWrapper>

                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </SubmitButton>
                </div>
              ) : (
                <SuccessMessage
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Message envoyé avec succès!</h3>
                  <p>
                    Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                  </p>
                  <SubmitButton 
                    onClick={() => setIsSubmitted(false)}
                    style={{ marginTop: '20px', maxWidth: '500px', margin: '20px auto 0' }}
                  >
                    Envoyer un autre message
                  </SubmitButton>
                </SuccessMessage>
              )}
            </ContactForm>
          </ContactContainer>
        </MotionDiv>
      </StyledDiv>
      <BackgroundLogo src="../images/logo-big.svg" />
      <Footer />
    </>
  )
}