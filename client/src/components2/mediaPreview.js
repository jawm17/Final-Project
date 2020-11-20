import React, { useEffect, useState } from 'react';
import history from '../history';
import Media from "./media";
import "./mediaPreviewStyle.css";

export default function MediaPreview(props) {
    const [open, setOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState("https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/jennifer_dark_throated9_big.jpg?alt=media&token=e7a5e215-285b-477d-96de-8d859132c6cf");
    const [opacity, setOpacity] = useState(100);
    const [flagPos, setFlagPos] = useState(-50);
    const [flagDisplay, setFlagDisplay] = useState("initial");
    const [infoDisplay, setInfoDisplay] = useState("none")

    const style = {
        thumbnail: {
                position: "absolute",
                width: 196,
                height: 260,
                objectFit: "cover",
                borderRadius: 12,
                zIndex: 4,
                opacity: opacity
        },
        bottom: {
            position: "absolute",
            width: "100%",
            height: 70,
            bottom: 0,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: infoDisplay
        },
        flagBlock: {
            position: "absolute",
            zIndex: 10,
            backgroundColor: "#EFEFEF",
            width: 200,
            height: 60,
            top: -60,
            left: 0
        },
        flag: {
            display: flagDisplay,
            position: "absolute",
            zIndex: 2,
            width: 20,
            height: 50,
            top: flagPos,
            right: 10,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
            backgroundColor: "#5DE900",
        }
    }
    useEffect(() => {
        let figure = document.getElementById(props.id + "vid");
        if (figure.duration) {
            figure.currentTime = parseInt(figure.duration) / 2;
        } else {
            figure.currentTime = 2;
        }
    }, []);

    function openMedia(e) {
        setOpen(true);
        history.push("/p/" + props.id);
    }

    function startPreview() {
        let exited = false;
        document.getElementById(props.id).addEventListener("mouseleave", () => exited = true);
        let figure = document.getElementById(props.id + "vid");
        setTimeout(() => {
            if (!exited) {
                figure.style.display = "initial";
                setInfoDisplay("initial");
                setOpacity(0);
                figure.play();
                setTimeout(() => {
                    if (!exited) {
                        setFlagPos(0);
                    }
                }, 150);
            }
        }, 450);
    }

    function endPreview() {
        let figure = document.getElementById(props.id + "vid");
        figure.pause();
        figure.style.display = "none";
        setOpacity(100);
        setFlagPos(-50);
        setInfoDisplay("none");
    }

    return (
        <div className="inlineBlock">
            <div className="item" id={props.id}>
                <div className="flag" style={style.flag}>
                    <img className="dolla" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fpreview%2Fwhite%2Fus-dollar-xxl.png&f=1&nofb=1" alt="money"></img>
                </div>
                <div style={style.flagBlock}></div>
                <img src={thumbnail} style={style.thumbnail} alt="video thumbnail" className="thumbnail" onClick={(e) => openMedia(e)} onMouseEnter={() => startPreview()} onMouseLeave={() => endPreview()}></img>
                <video className="sample" id={props.id + "vid"} muted>
                    <source src={props.imgUrl[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                </video>
                <div style={style.bottom} className="bottomPopUp">
                    <div className="popUpUser">
                        <img className="popUpPic" src="https://avatars3.githubusercontent.com/u/56066513?s=460&u=2724432d8929c333aea5ea6751128b6db55c747e&v=4" alt="profile picture"></img>
                       <div className="popUpName">
                       Jawm42
                       </div>
                    </div>
                    <div className="popUpTitle">
                        Where the wild things are
                    </div>
                </div>
            </div>
            {/* {open ? <Media id={props.id}></Media> : null} */}

        </div>
    );
}