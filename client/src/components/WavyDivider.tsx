import { Box, type BoxProps } from "@mui/material";

const WavyDivider = ({ width = "100%", sx }: BoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: width,
        height: "20px", // Altura do divisor
        overflow: "hidden",
        ...sx,
      }}
    >
      <svg
        viewBox="0 0 300 20" // Ajuste a largura e altura da viewBox
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M0 10 Q 30 0, 60 10 T 120 10 T 180 10 T 240 10 T 300 10 T 360 10 T 420 10 T 480 10 T 540 10 T 600 10 T 660 10 T 720 10 T 780 10 T 840 10 T 900 10 T 960 10 T 1020 10 T 1080 10 T 1140 10 T 1200 10"
          stroke="#9a8ac2" // Cor da linha
          strokeWidth="2" // Espessura da linha
          fill="transparent" // Sem preenchimento
        />
      </svg>
    </Box>
  );
};

export default WavyDivider;
