import { useState } from "react";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [lyrics, setLyrics] = useState(null);

  const getResults = () => {
    const queryParams = new URLSearchParams({ title });

    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchQuery}&${queryParams}&per_page=6&page=1`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e060a60726mshe5602813a1f51bfp1e1c1cjsn1a1a27a0dcff",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.hits);
        console.log(data.hits);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="app">
      <h1 className="title">
        <span>Lyrics</span> App
      </h1>
      <h2 className="sub-title">Get the Lyrics for any song</h2>
      <form
        onSubmit={(e) => {
          getResults(); // Trigger the getResults function to fetch API
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="Enter Artist"
        />

        <button type="submit">Submit</button>
      </form>

      {title && (
        <div>
          <div className="wrapper">
            {title.map((song) => (
              <div key={song.result.id}>
                <div>
                  <div className="song-box">
                    <div>
                      <span>
                        <img
                          src={song.result.song_art_image_thumbnail_url}
                          alt={song.result.song_art_image_thumbnail_url}
                        />
                      </span>
                    </div>
                    <div className="box-info">
                      <h3>{song.result.title}</h3>
                      <span>{song.result.artist_names}</span>
                      <button className="btn">Get Lyrics &rarr;</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
