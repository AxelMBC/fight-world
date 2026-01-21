import type { fighterType } from "@/types/fighterType";

// MUI
import { Box } from "@mui/material";

interface FighterCardProps {
  boxer: fighterType;
  rank: number;
  onSelect: (fighter: fighterType) => void;
}

const CardFighter = ({ boxer, rank, onSelect }: FighterCardProps) => {
  return (
    <Box
      onClick={() => onSelect(boxer)}
      sx={{
        position: "relative",
        cursor: "pointer",
        "&:hover .card-root": {
          boxShadow: "12px 12px 0 #ca2626",
        },
        "&:hover img": {
          filter: { lg: "grayscale(0%)" },
        },
      }}
    >
      <Box
        className="card-root"
        sx={{
          position: "relative",
          backgroundColor: "#fff",
          border: "4px solid #000",
          boxShadow: "10px 10px 0 #000",
          transition: "all 0.2s ease",
        }}
      >
        {/* Rank */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            px: 1.5,
            zIndex: 1,
          }}
          className="fc-white font-anton"
        >
          <Box component="span" sx={{ fontSize: "3rem" }}>
            #{rank}
          </Box>
        </Box>

        {/* Image */}
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={boxer.image}
            alt={boxer.name}
            sx={{
              width: "100%",
              height: 320,
              objectFit: "cover",
              objectPosition: "top",
              filter: { lg: "grayscale(100%)" },
              transition: "all 0.3s ease",
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 2.5,
            borderTop: "4px solid #000",
          }}
        >
          <Box
            component="h3"
            className="font-anton fc-black"
            sx={{
              fontSize: "1.875rem",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {boxer.name}
          </Box>

          <Box
            component="p"
            className="fc-gray"
            sx={{ mt: 0.5, fontSize: "1rem" }}
          >
            RÉCORD: {boxer.record}
          </Box>

          <Box
            component="p"
            className="fc-primary"
            sx={{
              mt: 1,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {boxer.achievements}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardFighter;
