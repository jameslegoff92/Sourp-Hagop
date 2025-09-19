"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
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
    position: relative;
    padding-left: 32px;

    &::before {
      position: absolute;
      left: 16px;
      color: #f59e0b;
      font-size: 1rem;
    }
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
    position: relative;
    padding-left: 32px;

    &::before {
      position: absolute;
      left: 20px;
      color: #f59e0b;
      font-size: 1rem;
    }
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

const InfoContainer = styled.div`
  background: transparent;
  padding: 32px;
  margin: 30px 0;
  border-left: 4px solid var(--primary-color);
`;

export default function TuitionFees() {
    const feesData = [
        {
            category: "Droits d'inscription – payable à la date d'inscription",
            prescolaire: "200 $",
            primaire: "200 $",
            secondaire: "200 $",
            isRegular: true
        },
        {
            category: "Droits de scolarité - payables en versements égaux",
            prescolaire: "",
            primaire: "",
            secondaire: "",
            isHeader: true
        },
        {
            category: "Droits – services éducatifs",
            prescolaire: "4,220 $",
            primaire: "3,963 $",
            secondaire: "4,925 $",
            isRegular: true
        },
        {
            category: "Frais afférents",
            prescolaire: "946 $",
            primaire: "1,018 $",
            secondaire: "823 $",
            isRegular: true
        },
        {
            category: "Sorties et activités éducatives",
            prescolaire: "160 $",
            primaire: "160 $",
            secondaire: "200 $",
            isRegular: true
        },
        {
            category: "Service alimentaire",
            prescolaire: "816 $",
            primaire: "816 $",
            secondaire: "816 $",
            isRegular: true
        },
        {
            category: "Frais – manuels",
            prescolaire: "0 $",
            primaire: "160 $",
            secondaire: "231 $",
            isRegular: true
        },
        {
            category: " Achat portable - 1re secondaire seulement",
            prescolaire: "—",
            primaire: "—",
            secondaire: "500 $",
            isSpecial: true
        },
        {
            category: "TOTAL",
            prescolaire: "6,142 $",
            primaire: "6,117 $",
            secondaire: "6,995 $",
            isTotal: true
        }
    ];

    return (
        <>
            <Header 
                animate={false} 
                imageSrc="../images/header/frais-header.jpg" 
                headerText="DROITS DE SCOLARITÉ ET AUTRES FRAIS" 
                headerTextTop="70%" 
            />

            <StyledDiv>
                <MotionDiv>
                    <InfoContainer>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ lineHeight: "1.6", fontSize: "1rem" }}
                        >
                            Voici la structure complète des frais de scolarité pour l'année scolaire. 
                            Les droits de scolarité peuvent être payés en versements égaux selon les modalités établies par l'école.
                        </Typography>
                    </InfoContainer>

                    <TableContainer>
                        {/* Desktop Table */}
                        <Table>
                            <TableHeader>
                                <TableHeaderRow>
                                    <TableHeaderCell>
                                        Droits de scolarité et autres frais
                                    </TableHeaderCell>
                                    <TableHeaderCell>
                                        Préscolaire
                                    </TableHeaderCell>
                                    <TableHeaderCell>
                                        Primaire
                                    </TableHeaderCell>
                                    <TableHeaderCell>
                                        Secondaire
                                    </TableHeaderCell>
                                </TableHeaderRow>
                            </TableHeader>
                            <TableBody>
                                {feesData.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className={
                                            item.isHeader ? 'header-row' : 
                                            item.isTotal ? 'total-row' : 
                                            item.isSpecial ? 'special-row' : ''
                                        }
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <TableCell
                                            className={
                                                item.isHeader ? 'header-cell' : 
                                                item.isTotal ? 'total-cell' : 
                                                item.isSpecial ? 'special-cell' : ''
                                            }
                                        >
                                            {item.category}
                                        </TableCell>
                                        <PriceCell
                                            className={
                                                item.isTotal ? 'total-price' : 
                                                item.isSpecial ? 'special-price' : 
                                                !item.prescolaire ? 'empty-price' : ''
                                            }
                                        >
                                            {item.prescolaire || '—'}
                                        </PriceCell>
                                        <PriceCell
                                            className={
                                                item.isTotal ? 'total-price' : 
                                                item.isSpecial ? 'special-price' : 
                                                !item.primaire ? 'empty-price' : ''
                                            }
                                        >
                                            {item.primaire || '—'}
                                        </PriceCell>
                                        <PriceCell
                                            className={
                                                item.isTotal ? 'total-price' : 
                                                item.isSpecial ? 'special-price' : 
                                                !item.secondaire ? 'empty-price' : ''
                                            }
                                        >
                                            {item.secondaire || '—'}
                                        </PriceCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Mobile Cards */}
                        <MobileCardContainer>
                            {feesData.map((item, index) => {
                                if (item.isHeader) {
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
                                        className={
                                            item.isTotal ? 'total-card' : 
                                            item.isSpecial ? 'special-card' : ''
                                        }
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <MobileCardHeader
                                            className={
                                                item.isTotal ? 'total-header' : 
                                                item.isSpecial ? 'special-header' : ''
                                            }
                                        >
                                            {item.category}
                                        </MobileCardHeader>
                                        <MobilePriceGrid>
                                            <MobilePriceItem
                                                className={
                                                    item.isTotal ? 'total-price' : 
                                                    item.isSpecial ? 'special-price' : ''
                                                }
                                            >
                                                <MobilePriceLabel>Préscolaire</MobilePriceLabel>
                                                <MobilePriceValue
                                                    className={
                                                        item.isTotal ? 'total-value' : 
                                                        item.isSpecial ? 'special-value' : 
                                                        !item.prescolaire ? 'empty-value' : ''
                                                    }
                                                >
                                                    {item.prescolaire || '—'}
                                                </MobilePriceValue>
                                            </MobilePriceItem>
                                            <MobilePriceItem
                                                className={
                                                    item.isTotal ? 'total-price' : 
                                                    item.isSpecial ? 'special-price' : ''
                                                }
                                            >
                                                <MobilePriceLabel>Primaire</MobilePriceLabel>
                                                <MobilePriceValue
                                                    className={
                                                        item.isTotal ? 'total-value' : 
                                                        item.isSpecial ? 'special-value' : 
                                                        !item.primaire ? 'empty-value' : ''
                                                    }
                                                >
                                                    {item.primaire || '—'}
                                                </MobilePriceValue>
                                            </MobilePriceItem>
                                            <MobilePriceItem
                                                className={
                                                    item.isTotal ? 'total-price' : 
                                                    item.isSpecial ? 'special-price' : ''
                                                }
                                            >
                                                <MobilePriceLabel>Secondaire</MobilePriceLabel>
                                                <MobilePriceValue
                                                    className={
                                                        item.isTotal ? 'total-value' : 
                                                        item.isSpecial ? 'special-value' : 
                                                        !item.secondaire ? 'empty-value' : ''
                                                    }
                                                >
                                                    {item.secondaire || '—'}
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
            {/* <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/> */}
            <Footer />
        </>
    );
}