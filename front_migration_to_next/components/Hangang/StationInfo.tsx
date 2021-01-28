import moment from "moment";
import styled from "styled-components";
import { IHangangTemp, IHangangStation } from "../../interfaces";
interface IStationInfoprops {
  tempertureData: IHangangTemp;
  station: IHangangStation;
}
function StationInfo({ tempertureData, station }: IStationInfoprops) {
  return (
    <div>
      <StationInfoTime>
        <div>
          <span className="date">
            {tempertureData
              ? moment(tempertureData.MSR_DATE).format("YYYY년 MM월 DD일")
              : "--"}
          </span>
        </div>
        <div className="measure-time">
          {tempertureData ? tempertureData.MSR_TIME : "--"}
        </div>
      </StationInfoTime>

      <StationInfoContainer>
        <div>
          측정소 <span className="station-name">{station && station.name}</span>
        </div>
        <div>
          측정소까지{" "}
          <span className="station-distance">
            {station && `${station.distance / 1000}km`}
          </span>
        </div>
      </StationInfoContainer>
    </div>
  );
}
const StationInfoTime = styled.div`
  text-align: center;

  .date {
    font-size: 2rem;
  }
  .measure-time {
    font-size: 3rem;
    color: #d3f9d8;
  }
`;

const StationInfoContainer = styled.div`
  text-align: center;
  font-size: 2rem;
  .station-name {
    font-size: 2rem;
  }
  .station-distance {
    font-size: 2rem;
  }
`;

export default StationInfo;
