import { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import Gist from "./components/Gist";
import { getPublicGists, getGistForUser } from "./services/gistService";
import { getUniqueGists } from "./utils/utils";
import toast, { Toaster } from "react-hot-toast";

export const GistContext = createContext();

const App = () => {
  const [gists, setGists] = useState([]);
  const [search, setSearch] = useState("");
  const [isUserGist, setIsUserGist] = useState(false);

  const getGists = async () => {
    try {
      const data = await getPublicGists();

      setGists(data?.data);
    } catch (error) {
      toast.error("An error occured while fetching data");
    }
  };

  const getGistsByUser = async (username) => {
    setIsUserGist(true);
    try {
      const data = await getGistForUser(username);

      let array = JSON.parse(JSON.stringify(gists));
      array = array.concat(data?.data);
      setGists([...getUniqueGists(array)]);
    } catch (error) {
      if (error?.message) {
        toast.error("No user found with this name");
      } else {
        toast.error("An error occured while fetching data");
      }
    }
  };

  useEffect(() => {
    getGists();
  }, []);

  return (
    <Wrapper className="App" data-testid="app">
      <Toaster />
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
