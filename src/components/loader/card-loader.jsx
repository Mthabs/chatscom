import "./card-loader.css"

const CardLoader = () => {
    return (
        <div className="loading-skeleton mb-3">
            <div className="card">
                <div className="image"></div>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="">Some quick example</p>
                </div>
            </div>
        </div>
    );
};

export default CardLoader;