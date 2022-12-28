import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, FestivalInfo, ModalCard } from "./FestivalListStyle";
import axios from "axios";
import TitleStyle from "../Title/TitleStyle";
import Title from "../Title/Title";

interface Item {
  [key: string]: string;
}

interface ItemObj {
  item: Item;
}

interface LocationProps {
  location: string;
}

const FestivalList: React.FC<LocationProps> = ({ location }) => {
  const [InfoList, setInfoList] = useState<Item[]>([]);
  const [itemInfo, setItemInfo] = useState<Item>({});
  const [festivalModal, setFestivalModal] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);

  const getInfo = async (infoType: string, location: string) => {
    const infoList = await axios
      .get(`http://34.64.156.80:3003/api/main/infoes/${infoType}`)
      .then((res) =>
        res.data.sort((a: Item, b: Item) => {
          return Number(a.eventstartdate) - Number(b.eventstartdate);
        }),
      );
    location === "/"
      ? setInfoList(infoList.slice(0, 8))
      : setInfoList(infoList);
    return;
  };

  useEffect(() => {
    getInfo("festival", location);
  }, [location]);

  const dateFormat = (date: string) => {
    return date.slice(0, 4) + "." + date.slice(4, 6) + "." + date.slice(6, 8);
  };

  const InfoModal: React.FC<ItemObj> = ({ item }) => {
    return (
      <ModalCard>
        <div className="modalCard">
          <img
            className="closeModal"
            src="https://res.cloudinary.com/dk9scwone/image/upload/v1671625307/free-icon-cancel-8532370_kuiqk1.png"
            onClick={(e) => {
              e.stopPropagation();
              setFestivalModal(false);
            }}
          />

          <img src={item.firstimage} className="festivalImg" />
          <div className="info">
            <div className="festivalTitle">{item.title}</div>
            <div className="festivalDate">
              {dateFormat(item.eventstartdate)}~{dateFormat(item.eventenddate)}
            </div>
            <div className="address">{item.addr1}</div>
            <div className="tel">{item.tel}</div>
          </div>
        </div>
      </ModalCard>
    );
  };

  return (
    <div>
      {location === "/" ? (
        <Title title="여행정보" location="/" />
      ) : (
        <TitleStyle>
          <h3>
            <span
              className={`${toggleOn}`}
              onClick={() => {
                getInfo("festival", location);
                setToggleOn(true);
              }}
            >
              축제정보
            </span>
            <span
              className={`${!toggleOn}`}
              onClick={() => {
                getInfo("stay", location);
                setToggleOn(false);
              }}
            >
              굿스테이정보
            </span>
          </h3>
        </TitleStyle>
      )}
      <Container>
        <FestivalInfo>
          {InfoList &&
            InfoList.map((item) => {
              return (
                <div
                  className="item"
                  key={item._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemInfo(item);
                    setFestivalModal(true);
                  }}
                >
                  <img src={item.firstimage} />
                  <div className="itemTitle">
                    {item.title.length > 29
                      ? item.title.slice(0, 29) + "..."
                      : item.title}
                  </div>
                  <div className="itemDate">
                    {dateFormat(item.eventstartdate)}~
                    {dateFormat(item.eventenddate)}
                  </div>
                </div>
              );
            })}
          {festivalModal && <InfoModal item={itemInfo} />}
        </FestivalInfo>
        {location === "festival" ? (
          <div className="shortCutBtn">
            <div>혼자 가기 외로울 땐?</div>
            <Link to="/match/write">
              <button>동행 신청 바로가기</button>
            </Link>
          </div>
        ) : (
          false
        )}
      </Container>
    </div>
  );
};

export default FestivalList;
