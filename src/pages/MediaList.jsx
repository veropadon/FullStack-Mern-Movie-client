import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast }  from "react-toastify";



const MediaList = () => {
    const { mediaType } = useParams();

    const [medias, setMedias] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [currCategory, setCurrCategory] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const prevMediaType = useState(mediaType);


    const dispatch = useDispatch();

    const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
    const category = ["popular", "top rated"]

    useEffect(() => {
        dispatch(setAppState(mediaType));
        window.scrollTo(0,0)
    }, [mediaType, dispatch])

    useEffect(()  => {
        const getMedias = async () => {
            console.log("asdasdasd");
            if(currPage === 1) dispatch(setGlobalLoading(true));
            setMediaLoading(true);
            
            const { response, err} = await mediaApi.getList({
               mediaType,
               mediaCategory: mediaCategories[currCategory],
               page: currPage
            })

            setMediaLoading(false)
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message)
            if (response) {
              if(currPage !== 1)  setMedias(m => [...m, ...response.results])

              else setMedias([...response.results])
            }

            };
           
        
             
            

            getMedias();
            }, [
               mediaType,
               currCategory,
               currPage,
               mediaCategories,
               dispatch


            ]);

            const onCategoryChange = (categoryIndex) => {
                if (currCategory === categoryIndex) return 
                setMedias([]);
                setCurrPage(1);
                setCurrCategory(categoryIndex);

            }

            const  onLoadMore = () => setCurrPage(currPage + 1)

    
    return (
        <>
        <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories
        [currCategory]} />

        <Box  sx={{ ...uiConfigs.style.mainContent }}>
            <Stack 
            spacing={2}
            direction={{ xs: "column", md: "row"}}
            alignItems="center"
            justifyContent="space-between"


            
            >
                <Typography fontWeight="700" variant="h5" >
                {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}    
                </Typography>
                <Stack direction="row" spacing={2}>
                    {category.map((cate, index )  => (
                        <Button
                        key={index}
                        size="large"
                        variant={currCategory === index  ? "contained" : "text"}
                        sx={{
                            color: currCategory === index ?  "primary.contrastText" : "text.primary"

                        }}
                        onClick={() => onCategoryChange(index)}

                        >
                            {cate}

                        </Button>

                    ))}

                </Stack>
            </Stack>

            <MediaGrid
            medias={medias}
            mediaType={mediaType}
   
            />
            <LoadingButton
            sx={{ marginTop: 8 }}
            fullWidth
            color="primary"
            loading={mediaLoading}
            onClick={onLoadMore}

            
            >
                load more 
            </LoadingButton>


        </Box>

       

        
        </>
    );
};

export default MediaList;