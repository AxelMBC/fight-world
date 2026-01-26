import type { mainEventType } from "@/types/fightEventType";

// MUI
import { Box } from "@mui/material";

interface EventCardProps {
  video: mainEventType;
  onVideoSelect: (event: mainEventType) => void;
}

const CardEvent = ({ video, onVideoSelect }: EventCardProps) => {
  return (
    <Box
      onClick={() => onVideoSelect(video)}
      sx={{
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        border: "4px solid #000",
        boxShadow: "8px 8px 0 #000",
        maxWidth: 384,
        cursor: "pointer",
        transition: "all 300ms ease",
        "&:hover": {
          boxShadow: "12px 12px 0 #ca2626",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          overflow: "hidden",
          borderBottom: "4px solid #000",
        }}
      >
        <Box
          component="img"
          src={video.thumbnail}
          alt={video.title}
          sx={{
            width: "100%",
            height: 192,
            objectFit: "cover",
            transition: "all 300ms ease",
            filter: {
              lg: "grayscale(100%)",
            },
            "&:hover": {
              filter: "grayscale(0%)",
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          component="h3"
          className=" font-anton"
          sx={{
            fontSize: "0.875rem",
            mb: 2,
            flexGrow: 1,
          }}
        >
          {video.title}
        </Box>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {video.tags.map((tag, index) => (
            <Box
              key={index}
              component="span"
              className={
                index % 3 === 0
                  ? "fc-white"
                  : index % 3 === 1
                    ? "fc-black"
                    : "fc-white"
              }
              sx={{
                px: 1,
                py: 0.5,
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "2px solid #000",
                boxShadow: "1px 1px 0 #000",
                bgcolor:
                  index % 3 === 0
                    ? "primary.main"
                    : index % 3 === 1
                      ? "#fff"
                      : "secondary.dark",
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        {/* CTA */}
        <Box
          className=" font-anton fc-primary"
          sx={{
            mt: "auto",
            fontWeight: 700,
            textTransform: "uppercase",
            alignSelf: "flex-end",
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "gap 300ms ease",
            "&:hover": {
              gap: 1.5,
            },
          }}
        >
          Ver Video
          <Box
            component="span"
            sx={{
              transition: "transform 300ms ease",
              "&:hover": {
                transform: "translateX(4px)",
              },
            }}
          >
            →
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardEvent;
