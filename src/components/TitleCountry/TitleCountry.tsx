import { Box } from "@mui/material";

const TitleCountry = ({ title }: { title: string }) => {
  return (
    <>
      <Box
        component="header"
        id="target-scroll"
        className="header-title"
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          className="font-default section-spacing fc-primary-dark"
          sx={{
            mt: 1,
            textTransform: "uppercase",
            fontSize: {
              xs: "3rem",
              md: "6rem",
            },
          }}
        >
          {title}
        </Box>
      </Box>

      <Box />
    </>
  );
};

export default TitleCountry;
