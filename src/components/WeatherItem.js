import React from "react";

const WeatherItem = ({weather_id, weather_img , weather_descript, onClick, isSelected}) => {
    return (
        <div className={["WeatherItem",isSelected?`WeatherItem_on` : `WeatherItem_off`].join(" ")} 
            onClick={() =>onClick(weather_id)}>
            <img src={weather_img} />
            <span>{weather_descript}</span>
        </div>
    );
}

export default React.memo(WeatherItem);