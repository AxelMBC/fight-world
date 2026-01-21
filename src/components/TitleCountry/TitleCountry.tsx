import { Box } from "@mui/material";

const TitleCountry = ({ title }: { title: string }) => {
  return (
    <>
      <Box
        component="header"
        id="target-scroll"
        className="text-center header-title"
      >
        <Box
          component="h1"
          className="font-default section-spacing text-5xl md:text-8xl fc-primary-dark pt-2 uppercase mb-3"
          >
          {title}
        </Box>
      </Box>

      <Box />
    </>
  );
};

export default TitleCountry;
