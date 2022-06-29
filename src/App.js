import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import "./App.scss";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const url = "https://api.punkapi.com/v2/beers";
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp));
  }, []);

  //Load More
  const [visible, setVisible] = useState(5);

  const loadMoreItems = () => {
    setVisible((prevVaalue) => prevVaalue + 10);
  };

  //React Tooltip not supporting React 18 properly!
  const [tooltip, showTooltip] = useState(true);

  return (
    <div className="container mt-4 pb-4">
      <h5 className="text-muted">Beers</h5>
      <div className="row">
        {posts.slice(0, visible).map((post) => (
          //`${console.log(post)}`,
          <div
            className="col-lg-12 card beer-card  mb-4 shadow border-0"
            key={post.id}
          >
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  className="image-100"
                  src={post.image_url}
                  data-tip
                  data-for={post.id}
                  onMouseEnter={() => showTooltip(true)}
                  onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                  }}
                />
                {tooltip && (
                  <ReactTooltip id={`${post.id}`} effect="solid">
                    <span>{console.log(post.ingredients)}</span>
                    <span>
                      {[post.ingredients].map((sub) => {
                        console.log(
                          "Malt: " + sub.malt.map((maltMap) => maltMap["name"])
                        );
                        return (
                          <React.Fragment>
                            <div>
                              Malt:
                              <ul>
                                {sub.malt.map((maltMap, i) => (
                                  <li>{maltMap.name}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              Hops:
                              <ul>
                                {sub.hops.map((hopsMap, i) => (
                                  <li>{hopsMap.name}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              Yeast:
                              <ul>
                                <li>{sub.yeast}</li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </span>
                  </ReactTooltip>
                )}
              </div>
              <div className="flex-grow-1 ms-3 mw-0">
                <h5>{post.name}</h5>
                <h6 className="text-warning">{post.tagline}</h6>
                <p className="beer-card__description">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={loadMoreItems}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
