import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData, setOriginDate] = useState();

    // 의도적으로 페이지 이동 시킬 수 있다.
    const navigate = useNavigate();
    const {id} = useParams();

    const diaryList = useContext(DiaryStateContext);

    useEffect(()=>{
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
            
            // 값이 있으면
            if(targetDiary){
                setOriginDate(targetDiary);
            }else {
                navigate("/",{replace : true});
            }
        }
        
    },[id,diaryList])

    // originData가 있으면 DiaryEditor 렌더해주기 => 원본 데이터가 안들어와서 props로 넘겨줌
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
}

export default Edit;