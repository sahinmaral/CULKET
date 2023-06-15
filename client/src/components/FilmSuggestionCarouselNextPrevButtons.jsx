import React from "react";

function FilmSuggestionCarouselNextPrevButtons({
  films,
  index,
  currentIndex,
  setCurrentIndex,
}) {
  const setNavigatePrevButtonObject = () => {
    if (index === 0) {
      return { url: `#suggestedFilm_${films[4].id}`,index:4 };
    } else if (index === films.length - 1) {
      return { url: `#suggestedFilm_${films[3].id}`,index:3 };
    } else {
      return { url: `#suggestedFilm_${films[index - 1].id}`,index: index - 1};
    }
  };

  const setNavigateNextButtonObject = () => {
    if (index === 0) {
      return { url: `#suggestedFilm_${films[1].id}`,index:1 };
    } else if (index === films.length - 1) {
      return { url: `#suggestedFilm_${films[0].id}`,index:0 };
    } else {
      return { url: `#suggestedFilm_${films[index + 1].id}`,index: index + 1};
    }
  };

  return (
    <div
      className={`absolute ${
        currentIndex === index ? "flex" : "hidden"
      } justify-between transform -translate-y-1/2 left-5 right-5 top-1/4`}
    >
      <a
        onClick={() => {
          window.location.href = `${setNavigatePrevButtonObject().url}`;
          setCurrentIndex(setNavigatePrevButtonObject().index);
        }}
        className="btn btn-circle"
      >
        ❮
      </a>
      <a
        onClick={() => {
          window.location.href = `${setNavigateNextButtonObject().url}`;
          setCurrentIndex(setNavigateNextButtonObject().index);
        }}
        className="btn btn-circle"
      >
        ❯
      </a>
    </div>
  );
}

export default FilmSuggestionCarouselNextPrevButtons;
