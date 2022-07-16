import React from "react";
import GlobalStyle from "./components/GlobalStyle";
import Container from "./components/Container";
import AddContainer from "./components/AddContainer";
import MessageContainer from "./components/MessageContainer";
import { LocalStorageProvider } from "./context/LocalStorageContext";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Container>
                <LocalStorageProvider>
                    <AddContainer />
                    <MessageContainer />
                </LocalStorageProvider>
			</Container>
        </>
    );
};

export default App;
