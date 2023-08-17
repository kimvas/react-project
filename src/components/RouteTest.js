import { Link } from "react-router-dom";

const RouteTest = () => {
    return (
    <div>
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={'/diary'}>DIARY</Link>
        <br />
        <Link to={'/new'}>New</Link>
        <br />
        <Link  to={"/edit"}>EDIT</Link>
    </div>
    );
}

export default RouteTest;