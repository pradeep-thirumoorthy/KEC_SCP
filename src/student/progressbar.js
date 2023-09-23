
import React, { useState } from "react";
import MultiStepProgressBar from "./MultiStepProgressBar";

function App() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div className="App">
      Hello
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: "HEllo",
          pagetwo: "HEllo",
          pagethree: "HEllowefkde",
          pagefour: "HEllowefkde",
        }[page]
      }
    </div>
  );
}

export default App;
