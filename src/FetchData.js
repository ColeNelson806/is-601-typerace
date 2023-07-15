const FetchData = async () => {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films?limit=3");
    const filmsData = await response.json();
    console.log("Inside")
    console.log(filmsData);
    console.log(typeof filmsData);
    return filmsData;
  } catch (err) {
    return true;
  };
};

export { FetchData };