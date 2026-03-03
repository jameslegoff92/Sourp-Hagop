"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// --- STYLED COMPONENTS ---

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) { padding: 5rem 3rem 6rem; }
  @media (min-width: 1024px) { padding: 6rem 4rem 8rem; }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionSubtitle = styled(motion.span)`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #007dc3;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #007dc3;
  }
`;

const TitleWrapper = styled(motion.div)`
  margin-top: 1.5rem;
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const TableContainer = styled(motion.div)`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 125, 195, 0.08);
  overflow: hidden;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    background: transparent;
    box-shadow: none;
    border: none;
    border-radius: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableHeader = styled.thead`
  background: rgba(0, 125, 195, 0.04);
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 24px 20px;
  font-weight: 700;
  font-size: 1rem;
  color: var(--primary-color);
  border-bottom: 2px solid rgba(0, 125, 195, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:first-of-type {
    width: 40%;
    text-align: left;
  }
  &:not(:first-of-type) {
    text-align: center;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 125, 195, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }

  &.header-row {
    background: #f8fafc;
  }

  &.total-row {
    background: rgba(0, 125, 195, 0.05);
    border-top: 2px solid rgba(0, 125, 195, 0.2);
  }

  &.special-row {
    background: #fffbf0;
    border-left: 4px solid #f59e0b;
  }
`;

const TableCell = styled.td`
  padding: 20px;
  vertical-align: middle;
  font-size: 1rem;
  color: #475569;
  font-weight: 500;

  &.header-cell {
    font-weight: 700;
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  &.total-cell {
    font-weight: 700;
    color: #1e293b;
  }

  &.special-cell {
    color: #92400e;
  }
`;

const PriceCell = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);

  &.total-price {
    font-weight: 800;
    font-size: 1.15rem;
    color: #1e293b;
  }

  &.special-price {
    color: #92400e;
  }

  &.empty-price {
    color: #9ca3af;
  }
`;

// --- MOBILE COMPONENTS ---

const MobileCardContainer = styled.div`
  display: none;
  gap: 1.5rem;
  flex-direction: column;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 125, 195, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  padding: 0;

  &.header-card {
    background: #f8fafc;
    border-left: 4px solid var(--primary-color);
    padding: 16px;
    text-align: center;
    font-weight: 700;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }

  &.total-card {
    border-left: 4px solid var(--primary-color);
    background: rgba(0, 125, 195, 0.03);
  }

  &.special-card {
    border-left: 4px solid #f59e0b;
    background: #fffbf0;
  }
`;

const MobileCardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 600;
  color: #475569;
  font-size: 1rem;

  &.total-header {
    font-weight: 800;
    color: #1e293b;
    font-size: 1.1rem;
  }

  &.special-header {
    color: #92400e;
  }
`;

const MobilePriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #f1f5f9;
  gap: 1px; /* Creates the border effect between items */
`;

const MobilePriceItem = styled.div`
  background: white;
  padding: 16px 8px;
  text-align: center;

  &.total-price { background: rgba(0, 125, 195, 0.02); }
  &.special-price { background: #fffbf0; }
`;

const MobilePriceLabel = styled.div`
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 600;
`;

const MobilePriceValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-color);

  &.total-value {
    color: #1e293b;
    font-size: 1.15rem;
  }

  &.special-value { color: #92400e; }
  &.empty-value { color: #9ca3af; }
`;

export default function TuitionFees({ data }) {
  // Format price: add $ if it's a number
  const formatPrice = (value) => {
    if (!value) return '—';
    const hasNumber = /[\d]/.test(value);
    if (value.includes('$')) return value;
    if (hasNumber) return `${value} $`;
    return value;
  };

  const getRowClass = (rowType) => {
    switch (rowType) {
      case 'header': return 'header-row';
      case 'total': return 'total-row';
      case 'special': return 'special-row';
      default: return '';
    }
  };

  const getCellClass = (rowType) => {
    switch (rowType) {
      case 'header': return 'header-cell';
      case 'total': return 'total-cell';
      case 'special': return 'special-cell';
      default: return '';
    }
  };

  const getPriceClass = (rowType, value) => {
    if (rowType === 'total') return 'total-price';
    if (rowType === 'special') return 'special-price';
    if (!value) return 'empty-price';
    return '';
  };

  const getCardClass = (rowType) => {
    switch (rowType) {
      case 'header': return 'header-card';
      case 'total': return 'total-card';
      case 'special': return 'special-card';
      default: return '';
    }
  };

  const getHeaderClass = (rowType) => {
    switch (rowType) {
      case 'total': return 'total-header';
      case 'special': return 'special-header';
      default: return '';
    }
  };

  const getPriceItemClass = (rowType) => {
    switch (rowType) {
      case 'total': return 'total-price';
      case 'special': return 'special-price';
      default: return '';
    }
  };

  const getPriceValueClass = (rowType, value) => {
    if (rowType === 'total') return 'total-value';
    if (rowType === 'special') return 'special-value';
    if (!value) return 'empty-value';
    return '';
  };

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImageUrl}
        headerText={data?.headerText || "FRAIS DE SCOLARITÉ"}
        headerTextTop="70%"
      />

      <Section>
        <ContentContainer>
          
          {/* SECTION HEADER */}
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Grille tarifaire
            </SectionSubtitle>
            
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {data?.tableTitle || "Grille tarifaire"}
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          {/* INTRO TEXT */}
          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography as="p" type="h6" color="dark">
              {data?.introText}
            </Typography>
          </TextContainer>

          {/* DESKTOP TABLE */}
          <TableContainer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableHeaderCell>Catégorie</TableHeaderCell>
                  <TableHeaderCell>{data?.prescolaireLabel}</TableHeaderCell>
                  <TableHeaderCell>{data?.primaireLabel}</TableHeaderCell>
                  <TableHeaderCell>{data?.secondaireLabel}</TableHeaderCell>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                {data?.fees?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={getRowClass(item.rowType)}
                  >
                    <TableCell className={getCellClass(item.rowType)}>
                      {item.category}
                    </TableCell>
                    <PriceCell className={getPriceClass(item.rowType, item.prescolaire)}>
                      {formatPrice(item.prescolaire)}
                    </PriceCell>
                    <PriceCell className={getPriceClass(item.rowType, item.primaire)}>
                      {formatPrice(item.primaire)}
                    </PriceCell>
                    <PriceCell className={getPriceClass(item.rowType, item.secondaire)}>
                      {formatPrice(item.secondaire)}
                    </PriceCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* MOBILE CARDS */}
            <MobileCardContainer>
              {data?.fees?.map((item, index) => {
                if (item.rowType === 'header') {
                  return (
                    <MobileCard
                      key={index}
                      className="header-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {item.category}
                    </MobileCard>
                  );
                }

                return (
                  <MobileCard
                    key={index}
                    className={getCardClass(item.rowType)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <MobileCardHeader className={getHeaderClass(item.rowType)}>
                      {item.category}
                    </MobileCardHeader>
                    <MobilePriceGrid>
                      <MobilePriceItem className={getPriceItemClass(item.rowType)}>
                        <MobilePriceLabel>{data?.prescolaireLabel}</MobilePriceLabel>
                        <MobilePriceValue className={getPriceValueClass(item.rowType, item.prescolaire)}>
                          {formatPrice(item.prescolaire)}
                        </MobilePriceValue>
                      </MobilePriceItem>
                      <MobilePriceItem className={getPriceItemClass(item.rowType)}>
                        <MobilePriceLabel>{data?.primaireLabel}</MobilePriceLabel>
                        <MobilePriceValue className={getPriceValueClass(item.rowType, item.primaire)}>
                          {formatPrice(item.primaire)}
                        </MobilePriceValue>
                      </MobilePriceItem>
                      <MobilePriceItem className={getPriceItemClass(item.rowType)}>
                        <MobilePriceLabel>{data?.secondaireLabel}</MobilePriceLabel>
                        <MobilePriceValue className={getPriceValueClass(item.rowType, item.secondaire)}>
                          {formatPrice(item.secondaire)}
                        </MobilePriceValue>
                      </MobilePriceItem>
                    </MobilePriceGrid>
                  </MobileCard>
                );
              })}
            </MobileCardContainer>
          </TableContainer>

        </ContentContainer>
      </Section>
      <Footer />
    </>
  );
}