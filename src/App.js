import { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import Gist from "./components/Gist";
import { getPublicGists, getGistForUser } from "./services/gistService";
import { getUniqueGists } from "./utils/utils";

export const GistContext = createContext();

const App = () => {
  const [gists, setGists] = useState([]);
  const [search, setSearch] = useState("");
  const [isUserGist, setIsUserGist] = useState(false);

  const getGists = async () => {
    try {
      const data = await getPublicGists();

      setGists(data?.data);
    } catch (error) {}
  };

  const getGistsByUser = async (username) => {
    setIsUserGist(true);
    try {
      const data = await getGistForUser(username);

      let array = JSON.parse(JSON.stringify(gists));
      array = array.concat(data?.data);
      setGists([...getUniqueGists(array)]);
    } catch (error) {}
  };

  useEffect(() => {
    getGists();
  }, []);

  return (
    <Wrapper className="App" data-testid="app">
      <GistContext.Provider
        value={{
          gists,
          getGistsByUser,
          search,
          setSearch,
          isUserGist,
          setIsUserGist,
        }}
      >
        <Header />
        <GlobalStyles />
        <Gist />
      </GistContext.Provider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
