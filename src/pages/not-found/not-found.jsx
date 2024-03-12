import "./not-found.css"

const NotFound = () => {
    return (
        <div className="container">
            <div className="error-404-page">
                <div className="error-404-page__wrapper">
                    <div className="main-content d-flex justify-content-center">
                        <div className="text-center main-content__wrapper">
                            <h1 className="page-title">Oh Sorry!</h1>
                            <h6>The page you were looking for doesn’t exist</h6>
                            <p>You might have typed in the wrong address or the page has been moved. In the
                                meantime,
                                try again or Return to the home page</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;