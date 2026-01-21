import type { fighterType } from "@/types/fighterType";

// MUI
import { Box, Grid } from "@mui/material";

// Components
import CardFighter from "./CardFighter";

interface TopFightersProps {
  title: string;
  topFightersData: fighterType[];
  onFighterSelect: (fighter: fighterType) => void;
}

const TopFighters = ({
  title,
  topFightersData,
  onFighterSelect,
}: TopFightersProps) => {
  return (
    <Box component="section" className="section-spacing">
      <Box
        component="h2"
        className="font-default fc-primary-dark"
        textAlign="center"
        textTransform="uppercase"
        marginBottom={2}
        sx={{
          fontSize: {
            xs: "3rem",
            md: "6rem",
          },
        }}
        
        
      >
        {title}
      </Box>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          {topFightersData[0] && (
            <CardFighter
              boxer={topFightersData[0]}
              rank={1}
              onSelect={onFighterSelect}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          {topFightersData[1] && (
            <CardFighter
              boxer={topFightersData[1]}
              rank={2}
              onSelect={onFighterSelect}
            />
          )}
        </Grid>

        {topFightersData.slice(2).map((b, i) => (
          <Grid key={b.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <CardFighter
              boxer={b}
              rank={i + 3}
              onSelect={onFighterSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopFighters;
