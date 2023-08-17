import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommentsContext, DiaryDispatchContext, DiaryStateContext } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { weatherList } from "../util/weather";

import MyHeader from "../components/MyHeader";
import Mybutton from "../components/Mybutton";
import CommentList from "../components/CommentList";


const Diary = () => {
    const [commentTxt, setCommentTxt] = useState("");

    // 댓글 추가 할것인지
    const [isComm, setIsComm] = useState(false);
    // 댓글추가 버튼 누를 시
    const toggle = () => setIsComm(!isComm); 

    // 댓글 리스트 가져오기
    const commentList = useContext(CommentsContext);

    // 댓글추가 이벤트 가져오기
    const {onComment} = useContext(DiaryDispatchContext);

    const handleComments = () => {
        
        if(commentTxt.length < 1) {
            alert("내용을 입력해주세요.");
        }
        else if(window.confirm("댓글을 추가하시겠습니까?")){
            onComment(commentTxt);
            setCommentTxt("");
            toggle();
        }
    };

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=>{
        if(diaryList.length >=1) {
            const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));

            if(targetDiary) {
                // 일기가 존재할 때
                setData(targetDiary);
            }else {
                // 일기가 없을 때
                alert("없는 일기입니다.");
                navigate("/",{replace:true})
            }
        }
    },[id,diaryList])

        if(!data) {
            return <div className="DiaryPage">로딩중입니다...</div>
        }else {
            const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion))
            const curWeatherData = weatherList.find((it) => parseInt(it.weather_id) === parseInt(data.weather))

            return <div className="DiaryPage">
                <MyHeader  headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<Mybutton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
                    rightChild={<Mybutton text={"수정하기"} onClick={()=> navigate(`/edit/${data.id}`)} />}
                />

                <article>
                    <section>
                        <div className="weather_img_wrapper">
                            <div>
                                <img src={curWeatherData.weather_img} />
                                <span>{curWeatherData.weather_descript}</span>
                            </div>
                        </div>
                        
                    </section>

                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper",`diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>

                    <section className="comment_wrap">
                        <Mybutton text={"댓글달기"} type={"positive"} onClick={()=>toggle()} />
                    </section>

                    <section className="comment_area">
                        <div className="input_comment">
                            {isComm ? 
                                <>
                                    <input type="text" value={commentTxt} onChange={(e)=>setCommentTxt(e.target.value)} />
                                    <div>
                                        <Mybutton text={"확인"} onClick={handleComments}/>
                                        <Mybutton text={"취소"} onClick={()=>{
                                                                            toggle();
                                                                            setCommentTxt("");
                                                                            }} />
                                    </div>
                                </> 
                                : 
                                <></>
                            }
                        </div>

                            <div className="comment_list">
                                {commentList.map((it) => (
                                    <CommentList key={it.commentId} {...it} />
                                ))}
                            </div>
                            
                    </section>
                </article>
            </div>
        }
    
}

export default Diary;