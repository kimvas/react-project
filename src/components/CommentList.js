import React,{ useCallback, useContext, useState } from "react";

import Mybutton from "./Mybutton";

import { DiaryDispatchContext } from "../App";

const CommentList = ({commentId , commentCont}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [editText , setEditText] = useState(commentCont);

    const {onCommentEdit, onCommentRemove} = useContext(DiaryDispatchContext);

    const goEdit = useCallback(() => {
        if(editText.length < 1) {
            alert("내용을 입력해주세요");
        }else {
            onCommentEdit(commentId , editText);
            setIsEdit(!isEdit);
        }
    },[commentId, editText , onCommentEdit])

    const goRemove = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onCommentRemove(commentId);
        }
    }

    return (
        <div className="CommentList">
            <img src={process.env.PUBLIC_URL + `/assets/icon.png`} />
            <span>
                {isEdit ? 
                (
                    <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} />
                ) : (
                    commentCont
                )}
            </span>

            <div>
                {isEdit ? (
                    <>
                        <Mybutton text={"수정완료"} onClick={goEdit}/>
                        <Mybutton text={"수정취소"} onClick={() => {
                                                                    setIsEdit(!isEdit);
                                                                    setEditText(commentCont);
                                                                    }} />
                    </>
                    ) : (
                    <>
                        <Mybutton text={"수정"} onClick={() => setIsEdit(!isEdit)}/>
                        <Mybutton text={"삭제"} onClick={goRemove} />
                    </>
                )}
            
            </div>
        </div>
    );
}

export default React.memo(CommentList);