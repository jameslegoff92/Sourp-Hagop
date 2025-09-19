"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
import CustomButton from "../../components/inputs/Button";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`;

const StyledParagraph = styled(Typography)`
  text-align: left;
  background-color: var(--secondary-color);
  padding: 25px;
  margin-bottom: -20px;
`;

export default function ConseilAdministration() {
  return (
    <>
      <Header
        animate={false}
        imageSrc="../images/header/pne-header.jpg"
        headerText="PROTECTEUR NATIONAL DE L'ÉLÈVE"
        headerTextTop="70%"
        mobileRight="5px"
      />

      <StyledDiv>
        <MotionDiv>
          <Typography as="h1" type="h1" color="primary">
            Processus de traitement des plaintes
          </Typography>
          <TextContainer>
            <Typography as="p" type="h5" color="dark">
              Depuis le 28 août 2023, une nouvelle procédure uniforme de traitement des plaintes est en vigueur dans toutes les écoles publiques et privées du Québec, y compris l'École arménienne Sourp Hagop.
            </Typography>
          </TextContainer>

          <Typography as="h4" type="h4" color="primary" style={{ textAlign: "left" }}>
            Qu'est-ce que le Protecteur National de l'Élève (PNE) ?
          </Typography>
          <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Le Protecteur National de l'Élève protège les droits des élèves et de leurs parents en leur permettant de signaler leurs insatisfactions concernant les services scolaires. Il dirige une équipe de protecteurs régionaux, qui sont indépendants des écoles et des centres de services scolaires. Le premier PNE, Me Jean-François Bernier, a été nommé par le gouvernement le 29 juin 2022.
          </Typography>

          <Typography as="h4" type="h4" color="primary" style={{ textAlign: "left" }}>
            Quel est le rôle du PNE dans la protection des droits des élèves et des parents ?
          </Typography>
          <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Le Protecteur National de l'Élève (PNE) est responsable de l'application uniforme de la procédure de traitement des plaintes et des signalements dans le milieu scolaire. Les protecteurs régionaux, présents partout au Québec, veillent au respect des droits des élèves et des parents, et contribuent ainsi à l'amélioration des services éducatifs.
          </Typography>

          <Typography as="h4" type="h4" color="primary" style={{ textAlign: "left" }}>
            Comment déposer une plainte ?
          </Typography>
          <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            En cas d’insatisfaction au regard des services scolaires qu’il a reçus, qu’il reçoit, qu’il aurait dû recevoir ou qu’il requiert, un élève ou ses parents peuvent formuler une plainte selon une procédure comportant au plus trois étapes :
          </Typography>

          <Typography as="h5" type="h5" color="primary" style={{ textAlign: "left", fontWeight: 450 }}>
            Étape 1 - Personne directement concernée ou son supérieur à l’École
          </Typography>
          <StyledParagraph>
            L’élève ou son parent s’adresse tout d’abord à la personne directement concernée ou à son supérieur immédiat. La plainte peut être verbale, mais il est préférable de la faire par écrit. La personne qui reçoit la plainte a un délai de 10 jours ouvrables pour y répondre.
          </StyledParagraph>

          <Typography as="h5" type="h5" color="primary" style={{ textAlign: "left", fontWeight: 450 }}>
            Étape 2 - Responsable du traitement des plaintes à l’École
          </Typography>
          <StyledParagraph>
            Si l’élève ou son parent demeure insatisfait du traitement de leur plainte ou si le délai de 10 jours ouvrables est dépassé, il peut ensuite s’adresser au responsable du traitement des plaintes de l’établissement d’enseignement privé.
          </StyledParagraph>
          <StyledParagraph>
            La plainte peut être verbale, mais il est préférable de la faire par écrit en remplissant le formulaire de plainte.
          </StyledParagraph>
          <StyledParagraph>
            La personne responsable du traitement des plaintes à l'École arménienne Sourp Hagop est <a href="mailto:lory.abakian@ecolesourphagop.com" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>Lory Abrakian</a>, la directrice générale. Elle dispose de 15 jours ouvrables pour répondre à la plainte soumise.
          </StyledParagraph>
        </MotionDiv>

        <CustomButton
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ marginTop: "50px" }}
        >
          <a href="https://pne.gouv.qc.ca/formulaire" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            Formulaire de plainte
          </a>
        </CustomButton>

        <MotionDiv>
          <Typography as="h5" type="h5" color="primary" style={{ textAlign: "left", fontWeight: 450 }}>
            Étape 3 - Protecteur régional de l’élève
          </Typography>
          <StyledParagraph>
            Si l’élève ou son parent est toujours insatisfait du traitement de sa plainte, ou si le délai de 15 jours ouvrables est dépassé, il peut communiquer avec le protecteur régional de l’élève de sa région. Celui-ci assistera l’élève ou son parent dans la formulation écrite de sa plainte.
          </StyledParagraph>
          <StyledParagraph>
            L’élève ou son parent peut choisir le mode de communication qui lui convient le mieux entre :
            <div style={{ paddingLeft: "40px", marginTop: "10px" }}>
                <span style={{ color: "var(--primary-color)" }}>● </span> Formulaire de plainte web : <a href="pne.gouv.qc.ca/formulaire" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>pne.gouv.qc.ca/formulaire</a><br />
                <span style={{ color: "var(--primary-color)" }}>●</span> Téléphone ou texto : <span style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>1 833 420-5233</span><br />
                <span style={{ color: "var(--primary-color)" }}>●</span> Courriel : <a href="mailto:plaintes-pne@pne.gouv.qc.ca" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>plaintes-pne@pne.gouv.qc.ca</a>
            </div>
          </StyledParagraph>
          <StyledParagraph>
            Le protecteur régional de l’élève dispose de 20 jours ouvrables pour examiner la plainte. S’il juge la plainte fondée, il pourra formuler des recommandations à l’établissement d’enseignement privé.
          </StyledParagraph>
          <StyledParagraph>
            Avant leur transmission, les conclusions sont examinées par le Protecteur national de l’élève, qui a 5 jours ouvrables pour décider de traiter la plainte lui-même. Dans ce cas, il dispose de 10 jours pour conclure et, si besoin, remplacer les recommandations du protecteur régional.
          </StyledParagraph>
          <StyledParagraph>
            Le protecteur régional de l’élève informe ensuite la personne plaignante et le centre de services scolaire, la commission scolaire ou l’établissement d’enseignement privé des conclusions, ainsi que des recommandations s’il y a lieu.
          </StyledParagraph>
          <StyledParagraph>
            L’établissement d’enseignement privé a 10 jours ouvrables pour informer la personne plaignante et le protecteur régional de l’élève des suites qu’il entend donner aux conclusions et aux recommandations et, le cas échéant, les motifs justifiant son refus d’y donner suite.
          </StyledParagraph>
          <a href="../images/pne-fr.jpg" target="_blank" rel="noopener noreferrer">
            <img 
              src="../images/pne-fr.jpg" 
              alt="Illustration related to the Protecteur National de l'Élève" 
              style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }} 
            />
          </a>
          <Typography as="h4" type="h4" color="primary" style={{ textAlign: "left", marginTop: "23px" }}>
            Comment signaler un acte de <a id="ref1" href="#definition1"> violence à caractère sexuel <sup>[1]</sup></a> ?
          </Typography>
          <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Un signalement, qui peut être fait par toute personne, n’est possible qu’en situation d’acte de violence à caractère sexuel1
            commis à l’endroit d’un élève qui fréquente un établissement d’enseignement.           
          </Typography>          
          <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Un tel signalement est <span style={{ fontWeight: "500" }}>effectué directement au protecteur régional de l’élève</span>, sans avoir à passer par les deux premières
            étapes du processus, par :         
          </Typography>
        <StyledParagraph>
            <span style={{ color: "var(--primary-color)" }}>●</span> Une enseignante ou un enseignant <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Une professionnelle ou un professionnel œuvrant en milieu scolaire <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Une employée ou un employé membre de la direction d’un établissement d’enseignement <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Un autre élève ou l’un de ses parents <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> etc.
        </StyledParagraph>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left", marginTop: "23px" }}>
            La personne signalante pourra choisir le mode de communication qui lui convient le mieux entre :  
        </Typography>
        <StyledParagraph>
            <span style={{ color: "var(--primary-color)" }}>● </span> Formulaire de plainte web : <a href="pne.gouv.qc.ca/formulaire" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>pne.gouv.qc.ca/formulaire</a><br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Téléphone ou texto : <span style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>1 833 420-5233</span><br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Courriel : <a href="mailto:plaintes-pne@pne.gouv.qc.ca" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>plaintes-pne@pne.gouv.qc.ca</a>
        </StyledParagraph>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left", marginTop: "23px" }}>
            Les signalements sont traités de façon <span style={{ fontWeight: "500" }}>urgente</span>. La confidentialité des renseignements identifiant la personne qui fait un
            signalement est préservée, sauf avec son consentement. Si requis par la loi, le protecteur régional de l’élève communique
            l’identité de cette personne au directeur de la protection de la jeunesse.
        </Typography>        
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Le protecteur régional de l’élève peut aussi traiter un cas d’acte de violence à caractère sexuel de sa propre initiative.
        </Typography>

        <Typography as="h4" type="h4" color="primary" style={{ textAlign: "left" }}>
            Comment êtes-vous protégé(e) contre les représailles ?
        </Typography>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            La Loi sur le protecteur national de l’élève protège contre toutes représailles ou menaces de représailles les personnes qui
            portent plainte ou qui font un signalement, collaborent au traitement d’une plainte ou d’un signalement ou accompagnent une
            personne qui formule une plainte ou un signalement.
        </Typography>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Il est également interdit de menacer une personne de mesures de représailles pour qu’elle s’abstienne de porter plainte ou de
            faire un signalement.
        </Typography>        
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left" }}>
            Pour l’élève ou ses parents formulant une plainte ou un signalement, sont présumées être des mesures de représailles :
        </Typography>
        <StyledParagraph>
            <span style={{ color: "var(--primary-color)" }}>● </span> Le fait de les priver de droits <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> L’application d’un traitement différent <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> La suspension ou l’expulsion de l’élève
        </StyledParagraph>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left", marginTop: "23px" }}>
            Pour le personnel d’un établissement d’enseignement effectuant un signalement ou collaborant à l’examen d’une plainte ou d’un
            signalement, sont présumées être des mesures de représailles :
        </Typography>
        <StyledParagraph>
            <span style={{ color: "var(--primary-color)" }}>● </span> Sa rétrogradation <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Sa suspension <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Son congédiement <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Son déplacement <br />
            <span style={{ color: "var(--primary-color)" }}>●</span> Toute sanction disciplinaire ou autre mesure portant atteinte à son emploi ou à ses conditions de travail
        </StyledParagraph>
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left", marginTop: "23px" }}>
            Les amendes pour une personne physique qui exercera des mesures de représailles ou menacera de le faire peuvent aller de
            2 000 $ à 20 000 $. Ces amendes peuvent aller de 10 000 $ à 250 000 $ pour les personnes morales.
        </Typography>
        <hr style={{ height: "1px", backgroundColor: "black", border: "none", width: "50%", }} />
        <Typography as="p" type="p" color="dark" style={{ textAlign: "left", fontSize: "14px" }}>
            <a href="#ref1"><span id="definition1" style={{ color: "var(--primary-color)", fontWeight: "700", textDecoration: "none" }}>[1]</span></a>
            <i> La violence à caractère sexuel est : « toute forme de violence commise par le biais de pratiques sexuelles ou en ciblant la sexualité, dont
            l’agression sexuelle. Cette notion s’entend également de toute autre inconduite qui se manifeste notamment par des gestes, paroles,
            comportements ou attitudes à connotation sexuelle non désirés, incluant celle relative aux diversités sexuelles ou de genre, exprimés
            directement ou indirectement, y compris par un moyen technologique. » Pour de plus amples renseignements sur les actes de violence à
            caractère sexuel, vous pouvez consulter la page du gouvernement du Québec sur les formes de violence.</i>
        </Typography>
        </MotionDiv>
      </StyledDiv>
      {/* <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }} /> */}
      <Footer />
    </>
  );
}
