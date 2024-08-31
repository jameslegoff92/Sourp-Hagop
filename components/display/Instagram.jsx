"use client";

//Third party imports
import styled from "@emotion/styled";

//Local Imports
import Typography from "../display/Typography";

//CSS For the following Section
const StyledDiv = styled.div`
  text-align: center;
  padding: 40px 0 40px;
  position relative;
`;

const StyledDiv2 = styled(StyledDiv)`
  padding: 40px 0 100px;
`;

//News Item Component
const NewsItem = ({ imageSrc, title, description, isLast }) => (
  <div className={`flex flex-col ${!isLast ? "pr-4 md:pr-8" : ""}`}>
    <div className="relative w-full h-48 md:h-[350px] mb-4">
      <img src={imageSrc} alt={title} style={{ objectFit: "cover" }} fill="true" />
    </div>
    <h3 className="font-normal text-left mb-2">{title}</h3>
    <div className="flex-grow" />
    <button className="text-[#007DC3] border border-[#007DC3] px-4 py-2 rounded text-sm self-start hover:bg-[#007DC3] hover:text-white transition-colors mt-4">
      EN SAVOIR PLUS
    </button>
  </div>
);

//Instagram Feed Component
const InstagramFeed = () => {
  const newsItems = [
    {
      imageSrc: "/images/blogimg1.jpg",
      title:
        "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
      description:
        "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
    },
    {
      imageSrc: "/images/blogimg2.jpg",
      title:
        "Les élèves de 4e secondaire préparent leurs projets « stop motion » au Créalab, dans le cadre de leur cours d'ÉCR.",
      description:
        "Les élèves de 4e secondaire préparent leurs projets « stop motion » au Créalab, dans le cadre de leur cours d'ÉCR.",
    },
    {
      imageSrc: "/images/blogimg3.jpg",
      title:
        "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
      description:
        "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
    },
  ];

  return (
    <StyledDiv2>
      <div className="container mx-auto px-4 py-8">
        <Typography as="h1" type="h2" color="primary">
          DERNIÈRES NOUVELLES
        </Typography>
        <div className="flex flex-col md:flex-row md:space-x-8 mt-[60px]">
          {newsItems.map((item, index) => (
            <div key={index} className="flex-1 mb-8 md:mb-0">
              <NewsItem {...item} isLast={index === newsItems.length - 1} />
            </div>
          ))}
        </div>
      </div>
    </StyledDiv2>
  );
};

export default InstagramFeed;
