/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Comments from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../Redux/actions/CommentsAction";
import { Box } from "@mui/material";
import { GET_PRODUCTS } from "../../Redux/actionsTypes/ProductsActionTypes";
import { getProducts } from "../../Redux/actions/productsActions";
import Circularprogress from "../../components/CircularProgress";

const Admin = () => {
  const dispatch = useDispatch();
  const AllComments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    try {
      const persistedData = localStorage.getItem("persist:root");

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);

        const localProducts =
          parsedData.products && JSON.parse(parsedData.products).products;

        if (localProducts || localProducts.length > 0) {
          dispatch({ type: GET_PRODUCTS, payload: localProducts });
        }
      }

      dispatch(getProducts());
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    dispatch(allComments());
  }, []);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    setComments(AllComments);
  }, [AllComments]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (comments !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [AllComments]);

  return (
    <Box>
      {isLoading ? (
        <Circularprogress />
      ) : (
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("/fondoChat.jpg")`, // URL de la imagen de fondo
              filter: "blur(3px)", // Aplicar desenfoque al fondo
              zIndex: -1,
            }}
          />
          <Comments comments={comments} />
        </Box>
      )}
    </Box>
  );
};

export default Admin;
// useEffect(() => {
//   const persistedData = localStorage.getItem("persist:root");

//   if (persistedData) {
//     const parsedData = JSON.parse(persistedData);

//     const localComments =
//       parsedData.comments && JSON.parse(parsedData.comments).comments;

//     if (localComments || localComments.length > 0) {
//       if (!comments || comments.length === 0) {
//         dispatch({ type: ALL_COMMENTS, payload: localComments });
//       }
//     }
//   }

//   dispatch(allComments());
// }, []);
