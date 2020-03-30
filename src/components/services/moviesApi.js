import axios from "axios";

const baseURL = "https://api.themoviedb.org";
const apiKey = "8e1c3dcacd1f528ad0a2008669c9d310";

const fetchPopularMovies = async () => {
  const URL = `${baseURL}/3/trending/all/day?api_key=${apiKey}`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data.results;
  } catch (error) {
    return console.error(error);
  }
  // try {
  //   const res = await fetch(URL);
  //   const data = await res.json();
  //   return data.results;
  // } catch (err) {
  //   console.log(err);
  //   return null;
  // }
};

const fetchMoviesWithQuery = async (searchQuery, pageNumber = 1) => {
  const URL = `${baseURL}/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageNumber}&include_adult=false`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data.results;
  } catch (error) {
    return console.error(error);
  }
};

const fetchDetailMovies = async id => {
  const URL = `${baseURL}/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (error) {
    return console.error(error);
  }
};

const fetchReviewsMovies = async id => {
  const URL = `${baseURL}/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data.results;
  } catch (error) {
    return console.error(error);
  }
};

const fetchCastMovies = async id => {
  const URL = `${baseURL}/3/movie/${id}/credits?api_key=${apiKey}`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data.cast;
  } catch (error) {
    return console.error(error);
  }
};


export default {
  fetchPopularMovies,
  fetchMoviesWithQuery,
  fetchDetailMovies,
  fetchReviewsMovies,
  fetchCastMovies
};
