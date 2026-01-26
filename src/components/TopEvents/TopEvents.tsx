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
    <Box component="section" marginTop={4}>
      <Box
        className="font-anton fc-primary-dark"
        textAlign="center"
        textTransform="uppercase"
        marginBottom={5}
        fontSize={{
          xs: "3rem",
          md: "6rem",
        }}
      >
        {title}
      </Box>

      <Grid container spacing={8}>
        {videos.map(
          (video) =>
            video.idYt && (
              <Grid key={video.idYt} size={{ xs: 12, sm: 6, lg: 4 }}>
                <CardEvent video={video} onVideoSelect={onVideoSelect} />
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};

export default TopEvents;
