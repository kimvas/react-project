import './App.css';
import React , { useEffect, useReducer, useRef, useState } from 'react';
import { BrowserRouter,Routes,Route, json } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import CommentList from './components/CommentList';


const reducer = (state, action) => {
  let newState = [];

  switch(action.type){
    case 'INIT': {
      return action.data;
      break;
    }

    case 'CREATE' : {
      newState = [action.data, ...state];
      break;
    }

    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }

    case 'EDIT' : {
      newState = state.map((it) => it.id === action.data.id? {...action.data} : it);
      break;
    }

    default : return state;
  }
  localStorage.setItem('diary',JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const CommentsContext = React.createContext();

function App() {

  const [data , dispatch] = useReducer(reducer,[]);
  const [comment , setComment] = useState([]);
  const commentId = useRef(0);

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
      if(localData) {
        const diaryList = JSON.parse(localData).sort((a,b)=> parseInt(b.id) - parseInt(a.id));
        dataId.current = parseInt(diaryList[0].id + 1);
      
        dispatch({type : "INIT", data : diaryList})
      }
  },[])

  const dataId = useRef(0);

  // create
    const onCreate = (date, content , emotion, weather) => {
      dispatch({type : "CREATE", data : {
            id : dataId.current,
            date : new Date(date).getTime(),
            content,
            emotion,
            weather,
      }});

      dataId.current += 1;

    }

  // remove
    const onRemove = (targetId) => {
        dispatch({type : "REMOVE", targetId});
    }

  // edit
    const onEdit = (targetId , date, content, emotion, weather) => {
        dispatch({type : "EDIT", data :{
            id : targetId,
            date : new Date(date).getTime(),
            content,
            emotion,
            weather,
        }})
    }

    // comments 추가
      const onComment = (commentCont) => {
          const newCommentList = {
            commentId : commentId.current,
            commentCont,
          }
          setComment((prevComments) => [newCommentList , ...prevComments]);
          commentId.current += 1;
      }

    // comments 수정
      const onCommentEdit = (commentId , editComment) => {
        const newCommentList = comment.map((it) => it.commentId === commentId ? {...it , commentCont : editComment} : it);
        setComment(newCommentList);
      }

      // comments 삭제
        const onCommentRemove = (commentId) => {
            const filterComment = comment.filter((it) => it.commentId !== commentId);
            setComment(filterComment);
        }

  return (
  <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={{onCreate,onEdit,onRemove,onComment,onCommentEdit,onCommentRemove}}>
      <CommentsContext.Provider value={comment}>
        <BrowserRouter>
        <div className="App">
        
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path='/new' element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
            
        </div>
        </BrowserRouter>
      </CommentsContext.Provider>
    </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
  );
}

export default App;
