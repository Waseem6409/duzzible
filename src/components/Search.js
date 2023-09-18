import React, { useContext } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import { GistContext } from "../App";

const Search = () => {
  const data = useContext(GistContext);

  const { search, setSearch, getGistsByUser, setIsUserGist } = data;

  return (
    <Wrapper>
      <InputBox>
        <Input
          placeholder="Search Gists for the username"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.length === 0) {
              setIsUserGist(false);
            }
          }}
        />
        <Octicon
          name="search"
          style={{ color: "#000000", cursor: "pointer" }}
          onClick={() => getGistsByUser(search)}
        />
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

export default Search;
