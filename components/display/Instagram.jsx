"use client";

//Third party imports
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

//Local Imports
import Typography from "@/components/display/Typography";

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
const InstagramMedia = ({ imageSrc, title, isLast }) => {
  const t = useTranslations("Instagram");
  return (
    <div className={`flex flex-col ${!isLast ? "pr-4 md:pr-8" : ""}`}>
      <div className="relative w-full h-48 md:h-[350px] mb-4">
        <img
          className="h-full w-full"
          src={imageSrc}
          alt={title}
          style={{ objectFit: "cover" }}
          fill="true"
        />
      </div>
      <h3 className="font-normal text-left mb-2">{title}</h3>
      <button className="text-[#007DC3] border border-[#007DC3] px-4 py-2 rounded text-sm self-start hover:bg-[#007DC3] hover:text-white transition-colors mt-4">
        {t("learnMore")}
      </button>
    </div>
  );
};

//Instagram Feed Component
const InstagramFeed = ({ data }) => {
  const t = useTranslations("Instagram");
  const instagramList = data.map((item) => ({
    imageSrc: item.media_url,
    title: `${item.caption ? item.caption : t("fallbackCaption")}`,
  }));

  return (
    <StyledDiv2>
      <div className="container mx-auto px-4 py-8">
        <Typography as="h1" type="h2" color="primary">
          {t("title")}
        </Typography>
        <div className="flex flex-col md:space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0 mt-[60px]">
          {instagramList.map((item, index) => (
            <div key={index} className="flex-1 mb-8 md:mb-0">
              <InstagramMedia
                {...item}
                isLast={index === instagramList.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </StyledDiv2>
  );
};

export default InstagramFeed;
