import Header from "../header/header";

const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <div className="container" style={{marginTop: "100px"}}>
                {children}
            </div>
        </div>
    );
};

export default Layout;