import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyHeader from "../components/MyHeader";
import Mybutton from "../components/Mybutton";
import DiaryEditor from "../components/DiaryEditor";


const New = () => {

    return(
        <div>
            <DiaryEditor />
        </div>
    );
}

export default New;