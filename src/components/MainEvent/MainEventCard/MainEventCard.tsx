import type { mainEventType } from "@/types/fightEventType";

// MUI
import { Box } from "@mui/material";

const MainEventVideo: React.FC<{ video: mainEventType }> = ({ video }) => (
  <Box
    sx={{
      backgroundColor: "#fff",
      p: 2,
      border: "4px solid #000",
      boxShadow: "10px 10px 0 #000",
    }}
  >
    <Box sx={{ border: "4px solid #000" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      >
        <Box
          component="iframe"
          id="main-event-video"
          src={`https://www.youtube.com/embed/${video.idYt}?autoplay=1&mute=1${
            video.startTime ? `&start=${video.startTime}` : ""
          }`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
    </Box>

    <Box sx={{ mt: 4 }}>
      <Box
        className="font-anton"
        sx={{
          
          fontSize: {
            xs: "1.5rem",   // text-2xl
            md: "2.25rem",  // text-4xl
          },
        }}
      >
        {video.title}
      </Box>

      <Box
        component="p"
        sx={{
          mt: 2,
          fontFamily: "inherit",
        }}
      >
        {video.description}
      </Box>
    </Box>
  </Box>
);

export default MainEventVideo;
