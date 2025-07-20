import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import MovieCard from "./MovieCard";
import HrMovieCard from "./HrMovieCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

function MovieList({ genreId,index_ }) {
  const [MovieList, setMovieList] = useState([]);
  const elementRef = useRef(null);
  useEffect(() => {
    getMovieByGenreId();
  }, []);
  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      // console.log(resp.data.results);
      setMovieList(resp.data.results);
    });
  };

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className="relative">
      <IoChevronBackOutline
        onClick={() => slideLeft(elementRef.current)}
        className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
            hidden md:block absolute ${index_%3==0?'mt-[80px]' :'mt-[150px]'}`}
      />
      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth pt-5 px-3 pb-10"
      >
        {MovieList.map((items) => (
          <>
          {index_ % 3==0? <HrMovieCard movie={items}/>: <MovieCard movie={items} />}
          </>
        ))}
      </div>
      <IoChevronForwardOutline
        onClick={() => slideRight(elementRef.current)}
        className={`text-[50px] text-white
           p-2 z-10 cursor-pointer top-0
            hidden md:block absolute right-0 ${index_%3==0?'mt-[80px]' :'mt-[150px]'}`}
      />
    </div>
  );
}

export default MovieList;
