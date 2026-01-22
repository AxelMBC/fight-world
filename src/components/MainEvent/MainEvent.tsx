// TYPE
import type { mainEventType } from "../../types/fightEventType";

// MUI
import { Box, Button, Typography } from "@mui/material";

// Libreria Externa
import { motion } from "framer-motion";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";

// Components
import MainEventCard from "./MainEventCard";

type MainEventProps = {
  loading: boolean;
  error: string | null;
  mainVideo: mainEventType | null;
  fetchMainVideo: () => void;
};

const MotionButton = motion(Button);

const MainEvent = ({
  loading,
  error,
  mainVideo,
  fetchMainVideo,
}: MainEventProps) => {
  return (
    <Box
      component="section"
      className="section-spacing"
      sx={{
        borderTop: "8px solid #000",
        borderBottom: "8px solid #000",
        py: 5,
      }}
    >
      {loading && (
        <Typography
          className="fc-primary"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          BUSCANDO COMBATE...
        </Typography>
      )}

      {error && (
        <Typography
          className="fc-error"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            p: 4,
          }}
        >
          {error}
        </Typography>
      )}

      {mainVideo && <MainEventCard video={mainVideo} />}

      {!loading && mainVideo && (
        <Box
          sx={{
            textAlign: "center",
            my: 7,
          }}
        >
          <MotionButton
            id="fetch-another-fight"
            onClick={fetchMainVideo}
            className="fc-white font-anton"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            sx={{
              cursor: "pointer",
              textTransform: "uppercase",
              fontSize: "1.5rem",
              py: 1.5,
              px: 4,
              border: "4px solid #000",
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            <Box component="span" sx={{ mr: 1 }}>
              <FontAwesomeIcon icon={faDiceThree} />
            </Box>
            Otro Combate
          </MotionButton>
        </Box>
      )}
    </Box>
  );
};

export default MainEvent;
