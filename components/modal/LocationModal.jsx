"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "../ui/Button";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 80vw;
  max-width: 1000px;
  min-height: 700px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px 30px 30px;
  position: relative;
  box-shadow: 0 25px 40px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  margin-bottom: 15px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--secondary-darkcolor);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
  &:hover {
    color: #333;
  }
`;

// Carousel
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  width: calc(100% - 170px);
  height: 40vh;
  overflow: hidden;
  position: relative;
  margin: 8px auto;
  border-radius: 8px;
`;

const CarouselInner = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;

  &:active {
    transform: translateY(-50%) scale(0.9);
  }

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
  
  &:active {
    transform: translateY(-50%) translateX(-10px) scale(0.9);
  }
`;

const RightArrow = styled(Arrow)`
  right: 10px;
  
  &:active {
    transform: translateY(-50%) translateX(10px) scale(0.9);
  }
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e8f4fd;
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 10px 15px;
  &:first-child {
    font-weight: 600;
    color: #333;
    width: 60%;
  }
  &:last-child {
    color: #555;
    text-align: right;
  }
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// Form Styles
const FormContainer = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  border-top: 2px solid var(--secondary-color);
`;

const FormTitle = styled.h3`
  color: var(--secondary-darkcolor);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e8f4fd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--secondary-darkcolor);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--secondary-darkcolor);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--secondary-darkcolor);
  }
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  position: relative;
`;

const BackLink = styled.a`
  color: var(--secondary-darkcolor);
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  background: none;
  border: none;
  bottom: 0;
  
  &:hover {
    text-decoration: none;
  }
`;

const CenteredButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 40px;
  min-height: 300px;
`;

const SuccessTitle = styled.h3`
  color: var(--secondary-darkcolor);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SuccessText = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const LocationModal = ({ isOpen, onClose, space }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        eventType: '',
        comments: ''
    });

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => (document.body.style.overflow = "unset");
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Create FormData object for W3Forms
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', process.env.NEXT_PUBLIC_W3F_CONTACT_KEY);
            formDataToSend.append('subject', `Nouvelle demande de réservation - ${space.title}`);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('eventType', formData.eventType);
            formDataToSend.append('comments', formData.comments);
            formDataToSend.append('space', space.title);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                setShowSuccessMessage(true);
                setShowForm(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    date: '',
                    eventType: '',
                    comments: ''
                });
            } else {
                alert('Erreur lors de l\'envoi. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erreur lors de l\'envoi. Veuillez réessayer.');
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setShowSuccessMessage(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            date: '',
            eventType: '',
            comments: ''
        });
    };

    if (!isOpen || !space) return null;

    // Mock images
    const images = [
        "https://picsum.photos/800/400?random=1",
        "https://picsum.photos/800/400?random=2",
        "https://picsum.photos/800/400?random=3",
    ];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
<ModalOverlay onClick={onClose}>
  <ModalContent onClick={(e) => e.stopPropagation()}>
    <CloseButton onClick={onClose}>&times;</CloseButton>
    <ModalHeader>
      <ModalTitle>{space.title}</ModalTitle>
    </ModalHeader>

    {showSuccessMessage ? (
      // === SUCCESS MESSAGE ===
      <SuccessMessage>
        <SuccessTitle>Envoyé avec succès!</SuccessTitle>
        <SuccessText>
          Nous avons bien reçu votre demande de réservation.<br />
          Nous vous recontacterons bientôt avec la confirmation.
        </SuccessText>
      </SuccessMessage>
    ) : showForm ? (
      // === STEP 2: FORM PAGE ===
      <FormContainer>
        <FormTitle>Formulaire de Réservation</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input type="text" id="firstName" name="firstName"
                value={formData.firstName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Nom de famille *</Label>
              <Input type="text" id="lastName" name="lastName"
                value={formData.lastName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input type="email" id="email" name="email"
                value={formData.email} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Date de réservation *</Label>
              <Input type="date" id="date" name="date"
                value={formData.date} onChange={handleInputChange} 
                min={new Date().toISOString().split('T')[0]}
                required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="eventType">Type d'événement *</Label>
              <Select id="eventType" name="eventType"
                value={formData.eventType} onChange={handleInputChange} required>
                <option value="">Sélectionnez un type</option>
                <option value="conference">Conférence</option>
                <option value="meeting">Réunion</option>
                <option value="event">Événement</option>
                <option value="other">Autre</option>
              </Select>
            </FormGroup>
            <FormGroup className="full-width">
              <Label htmlFor="comments">Commentaires (optionnel)</Label>
              <TextArea id="comments" name="comments"
                value={formData.comments} onChange={handleInputChange}
                placeholder="Ajoutez des détails supplémentaires..." />
            </FormGroup>
          </FormGrid>

          <FormActions>
            <BackLink
              onClick={(e) => {
                e.preventDefault();
                setShowForm(false);
              }}
            >
              ← Retour aux détails
            </BackLink>
            <CenteredButtonWrapper>
              <Button type="submit">ENVOYER LA DEMANDE</Button>
            </CenteredButtonWrapper>
          </FormActions>
        </form>
      </FormContainer>
    ) : (
      // === STEP 1: CAROUSEL + DETAILS ===
      <>
        <CarouselContainer>
          <LeftArrow onClick={prevSlide}><FaChevronLeft /></LeftArrow>
          <CarouselWrapper>
            <CarouselInner
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {images.map((img, idx) => (
                <Slide key={idx} style={{ backgroundImage: `url(${img})` }} />
              ))}
            </CarouselInner>
          </CarouselWrapper>
          <RightArrow onClick={nextSlide}><FaChevronRight /></RightArrow>
        </CarouselContainer>

        <DetailsTable>
          <tbody>
            <TableRow>
              <TableCell>Capacité</TableCell>
              <TableCell>200 personnes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Équipements</TableCell>
              <TableCell>Audio, vidéo, scène</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prix</TableCell>
              <TableCell>1350 $ (+taxes)</TableCell>
            </TableRow>
          </tbody>
        </DetailsTable>

        <ContactSection>
          <Button onClick={() => setShowForm(true)}>
            DEMANDE DE RÉSERVATION
          </Button>
        </ContactSection>
      </>
    )}
  </ModalContent>
</ModalOverlay>

    );
};

export default LocationModal;