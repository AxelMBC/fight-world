import { Box, Typography } from "@mui/material";

const TitleCountry = ({ title }: { title: string }) => {
  return (
    <>
      <Box id="target-scroll" className="header-title" textAlign="center">
        <Typography
          variant="h1"
          className="section-spacing"
          mt={1}
          sx={{
            textTransform: "uppercase",
            color: "primary.dark",
            fontSize: {
              xs: "3rem",
              md: "6rem",
            },
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box />
    </>
  );
};

export default TitleCountry;
