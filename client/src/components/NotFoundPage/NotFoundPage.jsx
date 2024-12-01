import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div style={{minHeight:"100vh"}} className="d-flex flex-column justify-content-center align-items-center " >
            <span className="bg-danger p-4 rounded fs-1 m-2">Page Not Found</span>
            <Link to="/" className="btn btn-primary px-4 py-3 rounded fs-4">Go back to home</Link>
        </div>
    );
}

export default NotFoundPage;
