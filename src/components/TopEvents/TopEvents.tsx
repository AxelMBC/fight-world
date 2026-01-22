import type { mainEventType } from "@/types/fightEventType";

// MUI
import { Box, Grid } from "@mui/material";

// Components
import CardEvent from "./CardEvent";

type TopVideosProps = {
  title: string;
  videos: mainEventType[];
  onVideoSelect: (event: mainEventType) => void;
};

const TopEvents = ({ title, videos, onVideoSelect }: TopVideosProps) => {
  return (
    <Box component="section" sx={{ mt: "120px" }}>
      <Box
        component="h2"
        className="font-default fc-primary-dark"
        textAlign="center"
        textTransform="uppercase"
        marginBottom={5}
        sx={{
          fontSize: {
            xs: "3rem",  // text-5xl
            md: "4.5rem" // text-7xl
          },
        }}
      >
        {title}
      </Box>

      <Grid container spacing={8}>
        {videos.map(
          (video) =>
            video.idYt && (
              <Grid
                key={video.idYt}
                size={{ xs: 12, sm: 6, lg: 4 }}
              >
                <CardEvent
                  video={video}
                  onVideoSelect={onVideoSelect}
                />
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};

export default TopEvents;
