import React from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import { formatDate } from "../utils/utils";

const GistList = ({ gists }) => (
  <Wrapper>
    {gists?.map((item, i) => {
      return (
        <ListItem
          key={i}
          onClick={() => {
            const newWindow = window.open(
              item?.url,
              "_blank",
              "noopener,noreferrer"
            );
            if (newWindow) newWindow.opener = null;
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={item?.owner?.avatar_url}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                }}
                alt={item?.id}
              />
              <h6 style={{ marginLeft: "10px" }}>{item?.owner?.login}</h6>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Octicon name="file" />
              <h6>
                {item?.files ? Object.keys(item?.files)?.length : null}{" "}
                {item?.files
                  ? Object.keys(item?.files)?.length > 1
                    ? "Files"
                    : "File"
                  : null}
              </h6>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <h6 style={{ margin: 0 }}>
              Created at {formatDate(item?.created_at)}
            </h6>
            <h6 style={{ margin: 0, marginLeft: 10 }}>
              Updated at {formatDate(item?.updated_at)}
            </h6>
          </div>
          <div>
            <h6
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item?.description !== null
                ? item?.description
                : "No description"}
            </h6>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(item?.files).map((item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                    overflow: "hidden",
                  }}
                  key={i}
                >
                  <Octicon name="file" />
                  <h6 style={{ margin: "10px 0" }}>{item}</h6>
                </div>
              );
            })}
          </div>
        </ListItem>
      );
    })}
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ListItem = styled.div`
  width: 50%;
  border: 1px solid #d3d3d3;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
`;

export default GistList;
