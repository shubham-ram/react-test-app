import { useState } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import Header from "./component/Header";
import Content from "./component/Content";
import Footer from "./component/Footer";

function App() {
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [footer, setFooter] = useState("");

    return (
        <AppContext.Provider
            value={{
                header,
                setHeader,
                content,
                setContent,
                footer,
                setFooter,
            }}
        >
            <Header />
            <Content />
            <Footer />
        </AppContext.Provider>
    );
}

export default App;
