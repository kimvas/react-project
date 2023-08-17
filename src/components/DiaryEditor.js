import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import MyHeader from "./MyHeader";
import Mybutton from "./Mybutton";
import EmotionItem from "./EmotionItem";
import WeatherItem from "./WeatherItem";

import { DiaryDispatchContext } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { weatherList } from "../util/weather";


const DiaryEditor = ({isEdit, originData}) => {
    // 감정 값
    const [emotion,setEmotion] = useState(3);
    // 날씨 값
    const [weather,setWeather] = useState(1);

    const [date , setDate] = useState(getStringDate(new Date()));
    // text값
    const [content, setContent] = useState("");
    // text에 focus 주기 위해
    const contentRef = useRef();

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);


    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[])

    const handleClickWeather = useCallback((weather) => {
        setWeather(weather);
    },[])

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date, content, emotion, weather);
            }else{
                onEdit(originData.id, date, content, emotion, weather)
            }
        }
        
        // home으로 돌아갈때 , 뒤로가기 못하게 막는 옵션주기
        navigate('/',{replace:true})
    }

    const handleRemove = () => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate('/',{replace:true});
        }
    }

    // isEdit과 originDate 값이 바뀔때만 실행
    useEffect(() => {
        // 원래 값 넣어주기
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion);
            setContent(originData.content);
            setWeather(originData.weather);
        }
    },[isEdit,originData])

    return(
        <div className="DiaryEditor">
            <MyHeader headText={isEdit? "일기 수정하기" :"새로운 일기 쓰기"}
                leftChild={<Mybutton text={"< 뒤로가기"}
                onClick={()=> navigate(-1)} />}
                rightChild={isEdit && 
                    <Mybutton text={"삭제하기"} type={"negative"} onClick={handleRemove}/>
                }
            />
            
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" 
                        type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>
                </section>

                <section>
                    <h4>오늘의 날씨는?</h4>
                    <div className="weather_wrapper">
                        {weatherList.map((it) => (
                            <WeatherItem key={it.weather_id} {...it} onClick={handleClickWeather} 
                            isSelected = {it.weather_id === weather} />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))} 
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea ref={contentRef} value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            placeholder="오늘은 어땠나요"
                        />
                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <Mybutton text={"취소하기"} onClick={()=>navigate(-1)} />
                        <Mybutton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>

        </div>
    );
}

export default DiaryEditor;