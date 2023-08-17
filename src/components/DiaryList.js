import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import Mybutton from "./Mybutton";
import DiaryItem from "./DiaryItem";

const sortOptionList =[
    {value:"latest", name : "최신순"},
    {value:"oldest", name : "오래된 순"},
]

const filterOptionList = [
    {value : "all" ,name :"전부 다"},
    {value : "good" ,name :"좋은 감정만"},
    {value : "bad" ,name :"안좋은 감정만"}
]

// 고착 컴포넌트로 변환. 전달 받은 props가 바뀌지 않으면 리렌더 안함
const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return <select className="ControlMenu" 
            value = {value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it,idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
});


const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter,setFilter] = useState("all");

    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if(filter === "good") {
                return parseInt(item.emotion) <= 3;
            }else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a,b) => {
            if(sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            }else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        
        // diaryList 배열를 JSon화 시켜서 문자로 변환시키고, 다시 배열로 복호화시킴
        const copyList = JSON.parse(JSON.stringify(diaryList));
        
        const fillteredList = 
                            filter === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it))
        const sortedList = fillteredList.sort(compare);
    
        return sortedList;
    }

    return (
        <div className="DiaryList">
            <div className="menu-wrapper">
                <div className="left_col">
                    <ControlMenu value = {sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />

                    <ControlMenu value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList} />
                </div>

                <div className="right_col">
                    <Mybutton type={'positive'} text={'새 일기쓰기'} onClick={()=>navigate("/new")} />
                </div>
            </div>
            
            {getProcessedDiaryList().map((it)=>(
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList : [],
};

export default DiaryList;