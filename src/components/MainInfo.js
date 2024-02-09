import React from "react";
import styled from "styled-components";

// Define styled components
const MainInfoContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  margin-top:40px;
`;

const MainInfoImage = styled.img`
  max-width: 100%;
`;

const MainInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MainInfoListItem = styled.li`
  margin-bottom: 10px;
`;

const MainInfoListItemName = styled.li`
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const MainInfoListItemTitle = styled.li`
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
`;

function MainInfo({ mainInfo }) {
  return (
    <MainInfoContainer>
      <MainInfoImage src={mainInfo.headshot} alt="Headshot" />
      <MainInfoList>
        <MainInfoListItemName>
         {mainInfo.name}
        </MainInfoListItemName>
        <MainInfoListItemTitle>
        {mainInfo.title}
        </MainInfoListItemTitle>
        <MainInfoListItem>
          <strong>Location:</strong> {mainInfo.location}
        </MainInfoListItem>
        <MainInfoListItem>
          <strong>Email:</strong> <a href={"mailto:"+mainInfo.email} >{mainInfo.email}</a>
        </MainInfoListItem>
        <MainInfoListItem>
          <strong>Phone:</strong> {mainInfo.phone}
        </MainInfoListItem>
      </MainInfoList>
    </MainInfoContainer>
  );
}

export default MainInfo;
