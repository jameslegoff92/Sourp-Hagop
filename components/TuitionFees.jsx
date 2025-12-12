"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: left;
  padding: 10px 0 150px;
  position: relative;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 90%;
  max-width: 1200px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const TableContainer = styled.div`
  background: transparent;
  overflow-x: auto;
  margin: 40px 0;
  border: 1px solid #e8f4fd;

  @media (max-width: 768px) {
    border: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCardContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileCard = styled(motion.div)`
  background: transparent;
  border: 1px solid #e8f4fd;
  margin-bottom: 16px;
  padding: 0;

  &.header-card {
    background: #f8fbff;
    border-left: 4px solid var(--primary-color);
    padding: 16px;
    text-align: center;
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }

  &.total-card {
    border-left: 4px solid var(--primary-color);
    background: #f0f8ff;
  }

  &.special-card {
    border-left: 4px solid #f59e0b;
    background: #fffbf0;
  }
`;

const MobileCardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e8f4fd;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;

  &.total-header {
    font-weight: 700;
    color: #1f2937;
    font-size: 1.05rem;
  }

  &.special-header {
    color: #92400e;
  }
`;

const MobilePriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: #e8f4fd;
`;

const MobilePriceItem = styled.div`
  background: white;
  padding: 12px 8px;
  text-align: center;

  &.total-price {
    background: #f0f8ff;
  }

  &.special-price {
    background: #fffbf0;
  }
`;

const MobilePriceLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  font-weight: 500;
`;

const MobilePriceValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);

  &.total-value {
    color: #1f2937;
    font-size: 1.1rem;
  }

  &.special-value {
    color: #92400e;
  }

  &.empty-value {
    color: #9ca3af;
  }
`;

const TableHeader = styled.thead`
  background: transparent;
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 24px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  border-bottom: 1px solid #e8f4fd;

  &:first-of-type {
    background: #f0f8ff;
    color: var(--primary-color);
    width: 45%;
  }

  &:not(:first-of-type) {
    background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid #f0f8ff;

  &:last-child {
    border-bottom: none;
  }

  &.header-row {
    background: #f8fbff;
  }

  &.total-row {
    background: #f0f8ff;
    border-top: 2px solid var(--primary-color);
    border-bottom: none;
  }

  &.special-row {
    background: #fffbf0;
    border-left: 3px solid #f59e0b;
  }
`;

const TableCell = styled.td`
  padding: 20px;
  vertical-align: middle;
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;

  &.header-cell {
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }

  &.total-cell {
    font-weight: 700;
    font-size: 1.05rem;
    color: #1f2937;
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
    font-weight: 700;
    font-size: 1.2rem;
    color: #1f2937;
  }

  &.special-price {
    color: #92400e;
  }

  &.empty-price {
    color: #9ca3af;
  }
`;

export default function TuitionFees({ data }) {
  // Format price: add $ if it's a number
  const formatPrice = (value) => {
    if (!value) return '—';
    
    // Check if the value contains a number (with optional commas, spaces, or decimals)
    const hasNumber = /[\d]/.test(value);
    
    // If it already has $, return as is
    if (value.includes('$')) return value;
    
    // If it has a number, add $ at the end
    if (hasNumber) return `${value} $`;
    
    // Otherwise return as is (for things like "—" or text)
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
        headerText={data?.headerText}
        headerTextTop="70%"
      />

      <StyledDiv>
        <MotionDiv>
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
              {data?.introText}
            </Typography>
          </TextContainer>

          <TableContainer>
            {/* Desktop Table */}
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableHeaderCell>{data?.tableTitle}</TableHeaderCell>
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
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

            {/* Mobile Cards */}
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
        </MotionDiv>
      </StyledDiv>
      <Footer />
    </>
  );
}