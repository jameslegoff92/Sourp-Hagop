"use client";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const LAYOUTS = {
  leftPillar: {
    cols: "2fr 1.5fr 1.5fr",
    rows: "1fr 1fr",
    template: `"i0 i1 i2" "i0 i3 i4"`,
  },
  rightPillar: {
    cols: "1.5fr 1.5fr 2fr",
    rows: "1fr 1fr",
    template: `"i1 i2 i0" "i3 i4 i0"`,
  },
  centerPillar: {
    cols: "1fr 1.5fr 1fr",
    rows: "1fr 1fr",
    template: `"i1 i0 i2" "i3 i0 i4"`,
  },
  topBand: {
    cols: "repeat(4, 1fr)",
    rows: "1.5fr 1fr",
    template: `"i0 i0 i0 i0" "i1 i2 i3 i4"`,
  },
  bottomBand: {
    cols: "repeat(4, 1fr)",
    rows: "1fr 1.5fr",
    template: `"i1 i2 i3 i4" "i0 i0 i0 i0"`,
  },
  twoThree: {
    cols: "repeat(6, 1fr)",
    rows: "1fr 1fr",
    template: `"i0 i0 i0 i1 i1 i1" "i2 i2 i3 i3 i4 i4"`,
  },
  threeTwo: {
    cols: "repeat(6, 1fr)",
    rows: "1fr 1fr",
    template: `"i2 i2 i3 i3 i4 i4" "i0 i0 i0 i1 i1 i1"`,
  },
  featureTopLeft: {
    cols: "repeat(3, 1fr)",
    rows: "1fr 1fr",
    template: `"i0 i0 i1" "i2 i3 i4"`,
  },
  featureTopRight: {
    cols: "repeat(3, 1fr)",
    rows: "1fr 1fr",
    template: `"i1 i0 i0" "i2 i3 i4"`,
  },
mosaic: {
  cols: "1fr 1.5fr 1.5fr 1fr",
  rows: "1fr 1fr",
  template: `"i0 i1 i1 i2" "i0 i3 i4 i2"`,
},
};

const Grid = styled.div`
  display: grid;
  gap: 0.5rem;
  width: 100%;
  height: 500px;

  @media (min-width: 768px) {
    height: 600px;
  }
`;

const Cell = styled.div`
  overflow: hidden;
  border-radius: 12px;
  min-height: 0;
  min-width: 0;
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default function ImageGrid({ images = [], layoutKey = "leftPillar" }) {
  const layout = LAYOUTS[layoutKey] || LAYOUTS.leftPillar;

  return (
    <Grid
      style={{
        gridTemplateColumns: layout.cols,
        gridTemplateRows: layout.rows,
        gridTemplateAreas: layout.template,
      }}
    >
      {images.map((img, index) => (
        <Cell key={index} style={{ gridArea: `i${index}` }}>
          <Img
            src={img.url}
            alt={`image ${index + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          />
        </Cell>
      ))}
    </Grid>
  );
}
