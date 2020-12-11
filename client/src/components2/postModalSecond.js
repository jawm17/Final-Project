import React, { useState } from 'react';
import UploadPlayer from "./uploadPlayer";
import "./modalSecondStyle.css";

export default function PostModalSecond(props) {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState();

    function back() {
        document.getElementById("modalSecond").style.display = "none";
        document.getElementById("whiteFirst").style.display = "initial";
    }

    function titleChange(e) {
        let newTitle = e.target.value;
        setTitle(newTitle);

        // styling
        if (newTitle) {
            document.getElementById("titleLabel").style.color = "#8A62E2";
        } else {
            document.getElementById("titleLabel").style.color = "gray";
        }
    }

    function priceChange(e) {
        let price = e.target.value;
        setPrice(price);

        /// styling
        if (price) {
            document.getElementById("priceLabel").style.color = "#8A62E2";
        } else {
            document.getElementById("priceLabel").style.color = "gray";
        }
    }

    return (
        <div id="modalSecond" style={{ "display": "none" }}>
            <div id="whiteSecond">
                <div id="banner">
                    <p id="bannerText">Create a Post</p>
                </div>
                <div id="optionTitle">
                    Slide to choose a thumbnail
                </div>
                <div id="thumbArea">
                    {props.url ? <UploadPlayer url={props.url}/> : null}
                </div>

                    <div className="vl"></div>

                <div className="vidInfo">
 
                    <div className="enterTitle">
                        <div id="titleLabel">
                            Enter a title
                        </div>
                        <div id="textAreaTitle">
                            <textarea id="title" onChange={(e) => titleChange(e)} onClick={() => document.getElementById("textAreaTitle").style.borderColor = "#8A62E2"} onBlur={() => document.getElementById("textAreaTitle").style.borderColor = "white"}></textarea>
                        </div>
                    </div>
                    <div className="enterPrice">
                        <div id="priceLabel">
                            Enter a price
                        </div>
                        <div id="priceLabelTag">
                            (optional)
                        </div>
                        <div id="textAreaPrice">
                            <textarea id="price" onChange={(e) => priceChange(e)} onClick={() => document.getElementById("textAreaPrice").style.borderColor = "#8A62E2"} onBlur={() => document.getElementById("textAreaPrice").style.borderColor = "white"}></textarea>
                        </div>
                        <div id="cncyType">
                            USD
                        </div>
                    </div>
                </div>
                <div id="back" onClick={() => back()}>back</div>
                <div id="forward2" onClick={() => console.log()}>post</div>
            </div>
        </div>
    );
}