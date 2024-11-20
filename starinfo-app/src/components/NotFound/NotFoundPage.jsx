import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>We couldn't find the page you're looking for.</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
};

export default NotFoundPage;