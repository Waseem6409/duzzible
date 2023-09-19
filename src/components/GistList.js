import React from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import { formatDate } from "../utils/utils";
import styles from "./GistList.module.css";

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
          <div className={styles.top}>
            <div className={styles.profileContainer}>
              <img src={item?.owner?.avatar_url} alt={item?.id} />
              <h6>{item?.owner?.login}</h6>
            </div>
            <div className={styles.fileContainer}>
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
          <div className={styles.dateContainer}>
            <h6>Created at {formatDate(item?.created_at)}</h6>
            <h6>Updated at {formatDate(item?.updated_at)}</h6>
          </div>
          <div className={styles.descriptionContainer}>
            <h6>
              {item?.description !== null
                ? item?.description
                : "No description"}
            </h6>
          </div>
          <div className={styles.fileListContainer}>
            {Object.keys(item?.files).map((item, i) => {
              return (
                <div
                className={styles.file}
                
                  key={i}
                >
                  <Octicon name="file" />
                  <h6 >{item}</h6>
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
