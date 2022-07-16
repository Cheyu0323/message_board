import React, { useState, useRef } from "react";
import styled from "styled-components";
import Text from "./Text";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const AddContainerLayout = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        width: 250px;
    }
`;
const Block = styled.div`
    margin: 5px 0;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Input = styled.input`
    line-height: 30px;
    font-size: 16px;
    font-weight: 300;
    margin: 3px 0;
`;
const Textarea = styled.textarea`
    line-height: 30px;
    font-size: 16px;
    font-weight: 300;
    margin: 5px 0 0;
    max-width: 100%;
`;

const AddContainer: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const infoRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const localStorage = useLocalStorageContext();

    const handlerTitleOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.currentTarget) {
            setTitle(event.currentTarget.value);
        }
    };
    const handlerTitleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        titleRef.current.style.border = "";
        setTitle(event.currentTarget.value);
    };
    const handlerInfoOnChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (event.currentTarget) {
            setInfo(event.currentTarget.value);
        }
    };
    const handlerInfoOnClick = (
        event: React.MouseEvent<HTMLTextAreaElement>
    ) => {
        infoRef.current.style.border = "";
    };
    const handlerSubmitOnClick = () => {
        let error = false;
        if (title === "") {
            titleRef.current.style.border = "1px solid red";
            error = true;
        }
        if (info === "") {
            infoRef.current.style.border = "1px solid red";
            error = true;
        }
        if (error) return;
        localStorage.addLocalStorage(title, info);
        titleRef.current.value = "";
        infoRef.current.value = "";
        setTitle("");
        setInfo("");
    };
    return (
        <AddContainerLayout>
            <Text size="24px" isWeight={true}>
                Message Board
            </Text>
            <Text size="14px">Now Leave First Message.</Text>
            <Block>
                <Text size="16px">Title</Text>
                <Input
                    type="text"
                    ref={titleRef}
                    onChange={handlerTitleOnChange}
                    onClick={handlerTitleOnClick}
                />
                <Text size="16px">Info</Text>
                <Textarea
                    ref={infoRef}
                    onChange={handlerInfoOnChange}
                    onClick={handlerInfoOnClick}
                ></Textarea>
            </Block>
            <Text
                size="16px"
                style={{
                    textAlign: "right",
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
                onClick={handlerSubmitOnClick}
            >
                Submit
            </Text>
        </AddContainerLayout>
    );
};

export default AddContainer;
