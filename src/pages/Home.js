import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import Myheader from './../components/MyHeader';
import Mybutton from './../components/Mybutton';
import DiaryList from "../components/DiaryList";




const Home = () => {

    const diaryList = useContext(DiaryStateContext);
    const [data,setData] = useState(diaryList);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    useEffect(() =>{
        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            // 그달 마지막날의 시,분,초까지 셋팅해야 마지막날 일기가 추가됨
            const lastDay = new Date (
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0,23,59,59
            ).getTime();
    
            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
            }
        
        },[diaryList,curDate])

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    }

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
    }


    return(
        <div>
            <Myheader headText={headText} 
                leftChild={<Mybutton text={'<'} onClick={decreaseMonth} />}
                rightChild={<Mybutton text={'>'} onClick={increaseMonth} />}
            />

            <DiaryList diaryList={data}/>
        </div>
    );
}

export default Home;