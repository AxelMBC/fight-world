// const fetchMainVideo = useCallback(async (retryCount = 0) => {
  //   if (retryCount > 3) {
  //     setError(
  //       "No se encontraron videos de combate disponibles. Intenta de nuevo."
  //     );
  //     setLoading(false);
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const boxer1 =
  //       topFightersData[Math.floor(Math.random() * topFightersData.length)].name;
  //     const keywords = [
  //       "full fight",
  //       "boxeo profesional",
  //       "pelea completa",
  //       "campeonato mundial",
  //       "full fight",
  //       "combate completo",
  //       "título mundial",
  //       "pelea estelar",
  //       "combate estelar",
  //       "boxeo profesional",
  //       "sparring",
  //     ];
  //     const excludeTerms =
  //       "-reaccion -resumen -highlights -'mejores momentos' -historia -homenaje -debate -analisis -entrevista -documental -podcast -noticias -vlog -trending";

  //     const query = `"${boxer1}" (${keywords.join(" | ")}) ${excludeTerms}`;

  //     const key = import.meta.env.VITE_GOOGLE_API_KEY;
  //     if (!key)
  //       throw new Error("La llave del API de YouTube no está configurada.");

  //     const categoryId = "17"; // Deportes
  //     const videoDuration = "long"; // > 20 minutos

  //     const maxResults = "25";

  //     const apiUrlURLSearchParams = new URLSearchParams({
  //       part: "snippet",
  //       q: query,
  //       type: "video",
  //       maxResults: maxResults,
  //       order: "viewCount",
  //       videoCategoryId: categoryId,
  //       videoDuration: videoDuration,
  //       videoDefinition: "high",
  //       regionCode: "MX",
  //       key: key,
  //     });

  //     const youTubeSearchApi = `https://www.googleapis.com/youtube/v3/search?${apiUrlURLSearchParams}`;
  //     const res = await fetch(youTubeSearchApi);
  //     console.log("API URL:", res);
  //     const data = await res.json();

  //     if (!res.ok)
  //       throw new Error(
  //         data.error.message || `Error del servidor: ${res.statusText}`
  //       );
  //     const validVideos = isNoiseWordPresent(data);

  //     if (validVideos.length === 0) {
  //       console.warn(
  //         "Búsqueda no encontró videos, reintentando con otros parámetros..."
  //       );
  //       fetchMainVideo(retryCount + 1);
  //       return;
  //     }

  //     const newMainVideo =
  //       validVideos[Math.floor(Math.random() * validVideos.length)];

  //     setMainVideo(newMainVideo);
  //   } catch (e) {
  //     setError((e as Error).message);
  //     fetchMainVideo(retryCount + 1);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);