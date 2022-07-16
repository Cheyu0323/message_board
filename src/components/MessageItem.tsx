import React, { useState, useRef } from "react";
import styled from "styled-components";
import COLORMAP from "./ColorMap";
import Text from "./Text";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const MessageItemContainer = styled.div`
    padding: 5px;
    margin: 5px 0;
    background-color: ${COLORMAP.secondary};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
`;

type FlexProps = {
    isColumn?: boolean;
};
const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${(props) => (props.isColumn ? "column" : "row")};
`;
const Textarea = styled.textarea`
    font-size: 14px;
    font-weight: 300;
    resize: vertical;
    width: 100%;
	white-space: pre-line;
`;
type replyType = {
    id: number;
    message: string;
};
type messageItemProps = {
    id: number;
    title: string;
    info: string;
    replyArray?: Array<replyType>;
};

const MessageItem: React.FC<messageItemProps> = ({
    id,
    title,
    info,
    replyArray,
}) => {
    const localStorage = useLocalStorageContext();
    const [reply, setReplay] = useState("");
    const replyRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

    const handleReplyOnChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (event.currentTarget) {
            setReplay(event.currentTarget.value);
        }
    };
    const handleReplyOnClick = (
        event: React.MouseEvent<HTMLTextAreaElement>
    ) => {
        replyRef.current.style.border = "";
    };
    const handlerSubmitOnClick = () => {
        let error = false;
        if (reply === "") {
            replyRef.current.style.border = "1px solid red";
            error = true;
        }
		if(error) return
        localStorage.addReply(id, reply);
		replyRef.current.value = ""
		setReplay("")
    };

    return (
        <MessageItemContainer>
            <Flex isColumn={true}>
                <Text size="18px" isWeight={true} lineHeight="30px">
                    {title}
                </Text>
                <Text size="14px">{info}</Text>
                <br></br>
                {replyArray?.length && (
                    <Text size="14px" isWeight={true} lineHeight="24px">
                        Reply
                    </Text>
                )}
                {replyArray?.map((item) => (
                    <Text key={item.id} size="14px">
                        {item.message}
                    </Text>
                ))}
            </Flex>
            <br></br>
            <Flex
                style={{
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <Textarea
                    rows={1}
                    ref={replyRef}
                    onClick={handleReplyOnClick}
                    onChange={handleReplyOnChange}
                ></Textarea>
                <Text
                    size="14px"
                    style={{
                        textAlign: "right",
                        textDecoration: "underline",
                        padding: "0 6px",
						cursor: "pointer"
                    }}
                    onClick={handlerSubmitOnClick}
                >
                    Submit
                </Text>
            </Flex>
        </MessageItemContainer>
    );
};

export default MessageItem;
