import React, { useState } from 'react';
import styled from "@emotion/styled";
import Typography from "@/components/display/Typography";
import { motion } from "framer-motion";

// Styled component for the accordion container
const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 50px auto;
`;

// Styled component for each accordion item
const AccordionItemContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

// Styled component for the accordion header with a horizontal line
const AccordionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-family: var(--primary-ff);
  cursor: pointer;
  position: relative;
  color: ${({ isOpen }) => (isOpen ? 'var(--primary-color)' : '#000')}; /* Change text color when open */

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ isOpen }) => (isOpen ? 'rgba(0, 125, 195, 0.5)' : '#ddd')};
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(0, 125, 195, 0.5);
  }

  &:hover {
    color: var(--primary-color); /* Change color on hover */

    span {
      color: var(--primary-color); /* Ensure the icon changes color on hover */
    }
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  transition: color 0.3s ease;
  text-align: left;
`;

const Icon = styled(motion.span)`
  font-size: 1.5rem;
  line-height: 1;
  transform-origin: 2px 10px 10px 0;
  transition: color 0.3s ease;
  color: ${({ isOpen }) => (isOpen ? 'var(--primary-color)' : '#000')};

  &:hover {
    color: #007bff;
  }
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: clamp(12rem, 2vw, 12rem);
    height: clamp(15rem, 2vw, 12rem);
    object-fit: cover;
    margin: 20px 0 10px 0;
  }
  h4 {
    margin: 10px 0 5px;
    font-size: 1.1rem;
  }
  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding: 0 1rem;
background-color: rgba(0, 125, 195, 0.04);
  border-top: 1px solid #ddd;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 20px;
  text-align: center;
  padding: 20px 0;

    @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageItemComponent = ({ src, alt, name, title }) => (
    <ImageItem>
        <img
            src={src}
            alt={alt}
        />
        <Typography
            as="p"
            type="h4"
            color="dark"
            initial={{ opacity: 0, y: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {name}
        </Typography>
        <Typography
            as="p"
            type="p"
            color="dark"
            initial={{ opacity: 0, y: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {title}
        </Typography>
    </ImageItem>
);

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <AccordionItemContainer>
            <AccordionHeader
                onClick={toggleOpen}
                isOpen={isOpen}
            >
                <Title>{title}</Title>
                <Icon
                    initial={false}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    isOpen={isOpen}
                >
                    +
                </Icon>
            </AccordionHeader>
            <AccordionContent
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <ImageGrid>
                    {children}
                </ImageGrid>
            </AccordionContent>
        </AccordionItemContainer>
    );
};

const Accordion = () => {
    return (
        <AccordionContainer>
            <AccordionItem title="Direction">
                <ImageItemComponent
                    src="../images/staff/Lory Abrakian.jpg"
                    alt="Lory Abrakian"
                    name="Lory Abrakian"
                    title="Directrice générale"
                />                
                <ImageItemComponent
                    src="../images/staff/Marika Langlois.jpg"
                    alt="Marika Langlois"
                    name="Marika Langlois"
                    title="Directrice adjointe pour les classes du 3e cycle du primaire et du secondaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Diane Baygin.jpg"
                    alt="Diane Baygin"
                    name="Diane Baygin"
                    title="Directrice adjointe au préscolaire et primaire C1 & C2"
                />
            </AccordionItem>
            <AccordionItem title="Enseignants">
                <ImageItemComponent
                    src="../images/staff/Alik Boulgarian.jpg"
                    alt="Alik Boulgarian"
                    name="Alik Boulgarian"
                    title="Enseignante d'éthique et culture religieuse"
                />                             
                <ImageItemComponent
                    src="../images/staff/Aline Abou Rgess.jpg"
                    alt="Aline Abou Rgess"
                    name="Aline Abou Rgess"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Amélie Lévesque.jpg"
                    alt="Amélie Lévesque"
                    name="Amélie Lévesque"
                    title="Enseignante de primaire"
                />
                <ImageItemComponent
                    src="../images/staff/Annie Barbeau.jpg"
                    alt="Annie Barbeau"
                    name="Annie Barbeau"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Arlyne Polosajian"
                    name="Arlyne Polosajian"
                    title="Enseignante de préscolaire"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Arman Dubois-Ranjbaran"
                    name="Arman Dubois-Ranjbaran"
                    title="Enseignant d'histoire"
                />                
                <ImageItemComponent
                    src="../images/staff/Arminee Yaghejian.jpg"
                    alt="Arminée Yaghejian"
                    name="Arminée Yaghejian"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Charlotte Jamblin.jpg"
                    alt="Charlotte Jamblin"
                    name="Charlotte Jamblin"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Christian Baygin.jpg"
                    alt="Christian Baygin"
                    name="Christian Baygin"
                    title="Enseignant d'éducation physique primaire/secondaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Clement Amphyon.jpg"
                    alt="Clément Amphyon"
                    name="Clément Amphyon"
                    title="Enseignant de la langue française"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Djedjiga Attil"
                    name="Djedjiga Attil"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Elise Caron.jpg"
                    alt="Élise Caron-Guillemette"
                    name="Élise Caron-Guillemette"
                    title="Enseignante de la langue française"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Elizabeth Tahanian"
                    name="Elizabeth Tahanian"
                    title="Enseignante de sciences"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Erjon Alikaj"
                    name="Erjon Alikaj"
                    title="Enseignant de mathématiques"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Gacia Demerdjian"
                    name="Gacia Demerdjian"
                    title="Enseignante de la langue arménienne"
                />                
                <ImageItemComponent
                    src="../images/staff/Gacia Lakhoyan.jpg"
                    alt="Gacia Lakhoyan"
                    name="Gacia Lakhoyan"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Horik Yapoudjian.jpg"
                    alt="Houry Karadjian-Yapoudjian"
                    name="Houry Karadjian-Yapoudjian"
                    title="Enseignante de sciences"
                />
                <ImageItemComponent
                    src="../images/staff/Houry Dalalian.jpg"
                    alt="Houry Dalalian"
                    name="Houry Dalalian"
                    title="Enseignante d'arts plastiques"
                />                
                <ImageItemComponent
                    src="../images/staff/Isabelle Flammia.jpg"
                    alt="Isabelle Flammia"
                    name="Isabelle Flammia"
                    title="Enseignante d'éducation physique de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Jimmy Lew.jpg"
                    alt="Jimmy Lew"
                    name="Jimmy Lew"
                    title="Enseignant de la langue anglaise"
                />                
                <ImageItemComponent
                    src="../images/staff/Karine Arakelian.jpg"
                    alt="Karine Arakelian"
                    name="Karine Arakelian"
                    title="Enseignante de sciences"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Karine Paquette"
                    name="Karine Paquette"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Kelly Cohen.jpg"
                    alt="Kelly Cohen"
                    name="Kelly Cohen"
                    title="Enseignante de mathématiques"
                />                
                <ImageItemComponent
                    src="../images/staff/Lara Naim.jpg"
                    alt="Lara Naim"
                    name="Lara Naim"
                    title="Enseignante d'entrepreneuriat"
                />                
                <ImageItemComponent
                    src="../images/staff/Laura Tawetian.jpg"
                    alt="Laura Tawetian"
                    name="Laura Tawetian"
                    title="Enseignante de la langue anglaise de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Lena Keusseyan"
                    name="Lena Keusseyan"
                    title="Enseignante de la langue arménienne"
                />                          
                <ImageItemComponent
                    src="../images/staff/Lily Margossian.jpg"
                    alt="Lily Margossian"
                    name="Lily Margossian"
                    title="Enseignante de primaire"
                />
                <ImageItemComponent
                    src="../images/staff/Svetlana Racu.jpg"
                    alt="Svetlana Racu"
                    name="Svetlana Racu"
                    title="Enseignante de primaire"
                />  
                <ImageItemComponent
                    src="../images/staff/Svetlana Racu.jpg"
                    alt="Svetlana Racu"
                    name="Svetlana Racu"
                    title="Enseignante de primaire"
                />                  
                <ImageItemComponent
                    src="../images/staff/Loucine Jebamkoussi.jpg"
                    alt="Loucine Jebamkoussi"
                    name="Loucine Jebamkoussi"
                    title="Enseignante de le langue arménienne de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Magali Hajibalian.jpg"
                    alt="Magali Hajibalian"
                    name="Magali Hajibalian"
                    title="Enseignante de le langue arménienne de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Maral Antablian.jpg"
                    alt="Maral Antablian"
                    name="Maral Antablian"
                    title="Enseignante de le langue arménienne primaire/secondaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Marie Hovannessian.jpg"
                    alt="Marie Hovannessian"
                    name="Marie Hovannessian"
                    title="Enseignante de le langue anglaise"
                />                
                <ImageItemComponent
                    src="../images/staff/Marie Choueiry.jpg"
                    alt="Marie Choueiry"
                    name="Marie Choueiry"
                    title="Enseignante de le langue anglaise de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Marina Kurkjian"
                    name="Marina Kurkjian"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Mher Karakachian.jpg"
                    alt="Mher Karakashian"
                    name="Mher Karakashian"
                    title="Enseignant d'histoire arménienne"
                />                
                <ImageItemComponent
                    src="../images/staff/Mireille Assi.jpg"
                    alt="Mireille Assi"
                    name="Mireille Assi"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Lauzon Miriam.jpg"
                    alt="Miriam Lauzon"
                    name="Miriam Lauzon"
                    title="Enseignante de la langue française"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Mirna Abou Rgess"
                    name="Mirna Abou Rgess"
                    title="Enseignante de préscolaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Nacim Atroune.jpg"
                    alt="Nacim Atroune"
                    name="Nacim Atroune"
                    title="Enseignant de mathémathiques"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Nathalie Burkulian"
                    name="Nathalie Burkulian"
                    title="Enseignante d'histoire arménienne de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Nelly Allassia.jpg"
                    alt="Nelly Allassia"
                    name="Nelly Allassia"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Octavian Savu.jpg"
                    alt="Octavian Savu"
                    name="Octavian Savu"
                    title="Enseignant d'éducation physique"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Patil Darakjian"
                    name="Patil Darakjian"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Patrick Gionet.jpg"
                    alt="Patrick Gionet"
                    name="Patrick Gionet"
                    title="Enseignant d'histoire"
                />                
                <ImageItemComponent
                    src="../images/staff/Sarah Timuroglu.jpg"
                    alt="Sarah Timuroglu"
                    name="Sarah Timuroglu"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Sarine Andonian.jpg"
                    alt="Sarine Andonian"
                    name="Sarine Andonian"
                    title="Enseignante d'éducation physique préscolaire"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Seta Basmadjian"
                    name="Seta Basmadjian"
                    title="Enseignante de préscolaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Sonia Papakhian.jpg"
                    alt="Sonia Papakhian"
                    name="Sonia Papakhian"
                    title="Enseignante de la langue arménienne de préscolaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Sossy Assadourian.jpg"
                    alt="Sossy Assadourian"
                    name="Sossy Assadourian"
                    title="Enseignante d'arts de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Souna Kilajian.jpg"
                    alt="Sona Kilajian"
                    name="Sona Kilajian"
                    title="Enseignante de la langue arménienne"
                />                                
                <ImageItemComponent
                    src="../images/staff/Svetlana Racu.jpg"
                    alt="Svetlana Racu"
                    name="Svetlana Racu"
                    title="Enseignante de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/Talar Harboyan.jpg"
                    alt="Talar Harboyan"
                    name="Talar Harboyan"
                    title="Enseignante d'arts de primaire"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Talia Bachekdjian"
                    name="Talia Bachekdjian"
                    title="Enseignante de la langue arménienne"
                />                
                <ImageItemComponent
                    src="../images/staff/Touria Mhaifid.jpg"
                    alt="Touria Mhaifed"
                    name="Touria Mhaifed"
                    title="Enseignante de la langue arménienne"
                />                
                <ImageItemComponent
                    src="../images/staff/Vanessa Legrand.jpg"
                    alt="Vanessa Legrand"
                    name="Vanessa Legrand"
                    title="Enseignante de la langue française"
                />                
                <ImageItemComponent
                    src="../images/staff/Zepur Hadjian.jpg"
                    alt="Zepur Hadjian"
                    name="Zepur Hadjian"
                    title="Enseignante de la langue arménienne de primaire"
                />
                
            </AccordionItem>
            <AccordionItem title="Services aux élèves">
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Anne-Sophie Assad"
                    name="Anne-Sophie Assad"
                    title="Orthopédagogue"
                /> 
                <ImageItemComponent
                    src="../images/staff/Emma Jeghelian.jpg"
                    alt="Emma Jeghelian"
                    name="Emma Jeghelian"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/Haroutioun Kouzoujian.jpg"
                    alt="Harout Kouzoujian"
                    name="Harout Kouzoujian"
                    title="Intervenant"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Lory Harboyan"
                    name="Lory Harboyan"
                    title="Orthophoniste"
                />                
                <ImageItemComponent
                    src="../images/staff/Lucie Boyajian.jpg"
                    alt="Lucie Boyajian"
                    name="Lucie Boyajian"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Marian Sabonjian"
                    name="Marian Sabonjian"
                    title="Technicienne en éducation spécialisée"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Pauline Krozian"
                    name="Pauline Krozian"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Pauline Tchekemian"
                    name="Pauline Tchekemian"
                    title="Technicienne en éducation spécialisée"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Rozalin Ghislian"
                    name="Rozalin Ghislian"
                    title="Technicienne en éducation spécialisée"
                />                             
                <ImageItemComponent
                    src="../images/staff/Sarkis Nokhoudian.jpg"
                    alt="Sarkis Nokhoudian"
                    name="Sarkis Nokhoudian"
                    title="Intervenant"
                />                
                <ImageItemComponent
                    src="../images/staff/Seta Mankeshian.jpg"
                    alt="Seta Mankeshian"
                    name="Seta Mankeshian"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/Sossy Kharaboyan.jpg"
                    alt="Sossy Kharaboyan"
                    name="Sossy Kharaboyan"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/Talin Dabbaghian.jpg"
                    alt="Talin Dabbaghian"
                    name="Talin Dabbaghian"
                    title="Intervenante"
                />                
                <ImageItemComponent
                    src="../images/staff/Tenny Apkarian.jpg"
                    alt="Tenny Apkarian"
                    name="Tenny Apkarian"
                    title="Technicienne en éducation spécialisée"
                />
            </AccordionItem>
            <AccordionItem title="Vie scolaire">
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Gaby Matossian"
                    name="Gaby Matossian"
                    title="Chaffeur d'autobus"
                /> 
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Anush Stepanyan"
                    name="Anush Stepanyan"
                    title="Cuisine - Propreté"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Azadouhi Mardirossian"
                    name="Azadouhi Mardirossian"
                    title="Cuisine - Alimentation"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Dzovinar Manoukian"
                    name="Dzovinar Manoukian"
                    title="Cuisine - Propreté"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Hripsime Davidyan"
                    name="Hripsime Davidyan"
                    title="Cuisine - Alimentation"
                />                  
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Madeleine Hanachian"
                    name="Madeleine Hanachian"
                    title="Cuisine - Alimentation"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Maral Bali"
                    name="Maral Bali"
                    title="Cuisine - Service"
                />                   
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Maria Wartanian"
                    name="Maria Wartanian"
                    title="Cuisine - Service"
                />                     
                <ImageItemComponent
                    src="../images/staff/Osan Soulian.jpg"
                    alt="Osan Soulian"
                    name="Osan Soulian"
                    title="Cuisine - Propreté"
                />                    
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Rita Bali"
                    name="Rita Bali"
                    title="Cuisine - Service"
                />                 
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Sergio Carcenac"
                    name="Sergio Carcenac"
                    title="Cuisine - Plonge"
                />                   
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Tamar Kazal Gozian"
                    name="Tamar Kazal Gozian"
                    title="Cuisine - Propreté"
                />                   
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Vicky Liakakos"
                    name="Vicky Liakakos"
                    title="Chaffeur d'autobus"
                />                     
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Victor Jbeili"
                    name="Victor Jbeili"
                    title="Chaffeur d'autobus"
                />       
            </AccordionItem>
            <AccordionItem title="Secrétariat et communications">
                <ImageItemComponent
                    src="../images/staff/Diane Mouradian.jpg"
                    alt="Diane Mouradian"
                    name="Diane Mouradian"
                    title="Secrétaire"
                />
                <ImageItemComponent
                    src="../images/staff/Sarine Mikaelian.jpg"
                    alt="Sarine Mikaelian"
                    name="Sarine Mikaelian"
                    title="Secrétaire"
                />
                <ImageItemComponent
                    src="../images/staff/Sarine Sabounjian.jpg"
                    alt="Sarine Sabounjian"
                    name="Sarine Sabounjian"
                    title="Agente de communications"
                />                
                <ImageItemComponent
                    src="../images/staff/Silva Yessayan.jpg"
                    alt="Silva Yessayan"
                    name="Silva Yessayan"
                    title="Secrétaire"
                />
            </AccordionItem>
            <AccordionItem title="Ressources humaines et Finances">
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Anna Manoukian"
                    name="Anna Manoukian"
                    title="Agente de comptabilité"
                />
                <ImageItemComponent
                    src="../images/staff/Houry Andonian.jpg"
                    alt="Houry Andonian"
                    name="Houry Andonian"
                    title="Agente de comptabilité"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Maral Nazarian"
                    name="Maral Nazarian"
                    title="Agente de comptabilité"
                />                
                <ImageItemComponent
                    src="../images/staff/Tamar Yaghejian.jpg"
                    alt="Tamar Yeghejian"
                    name="Tamar Yeghejian"
                    title="Agente de comptabilité"
                />
            </AccordionItem>
            <AccordionItem title="Services au bâtiment">
                <ImageItemComponent
                    src="../images/staff/Emma Leventakis.jpg"
                    alt="Emma Leventakis"
                    name="Emma Leventakis"
                    title="Agente de services au bâtiment"
                />
                <ImageItemComponent
                    src="../images/staff/Harout Sayegh.jpg"
                    alt="Harout Sayegh"
                    name="Harout Sayegh"
                    title="Agent de services au bâtiment"
                />
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Hovanness Bazarbachian"
                    name="Hovanness Bazarbachian"
                    title="Agent de services au bâtiment"
                />                
                <ImageItemComponent
                    src="../images/staff/_default.jpg"
                    alt="Sarkis Khachkhachyan"
                    name="Sarkis Khachkhachyan"
                    title="Préposé à l'entretien ménager"
                />
            </AccordionItem>

        </AccordionContainer>
    );
};

export default Accordion;
