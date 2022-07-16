import React from "react";
import styled from "styled-components";
import COLORMAP from "./ColorMap";
import MessageItem from "./MessageItem";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const MessageContainerLayout = styled.div`
    padding: 20px;
    width: 100%;
    height: calc(100% - 321.8px);
    display: flex;
    flex-direction: column;
    background-color: ${COLORMAP.tertiary};
    @media only screen and (min-width: 768px) {
        height: 100%;
    }
`;
const MessageContainerScroll = styled.div`
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: ${COLORMAP.primary};
    }
`;

const MessageContainer: React.FC = () => {
    const localStorage = useLocalStorageContext();
    return (
        <MessageContainerLayout>
            <MessageContainerScroll>
                {localStorage.localStorageData.map((item) => (
                    <MessageItem
                        key={item.id}
						id={item.id}
                        title={item.title}
                        info={item.info}
						replyArray={item.reply}
                    />
                ))}
            </MessageContainerScroll>
        </MessageContainerLayout>
    );
};

export default MessageContainer;
