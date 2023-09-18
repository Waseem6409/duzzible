import React, { useContext } from "react";
import { GistContext } from "../App";
import styled from "styled-components";
import GistList from "./GistList";

function Gist() {
  const data = useContext(GistContext);
  const { gists, isUserGist, search } = data;

  const filteredGists = isUserGist
    ? gists?.filter((item) => item?.owner?.login === search)
    : gists;

  return (
    <Wrapper>
      <GistList gists={filteredGists} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

export default Gist;
