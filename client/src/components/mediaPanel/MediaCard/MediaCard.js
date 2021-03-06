import React, { useEffect, useState, useContext, useRef } from 'react';
import UserService from "../../../services/UserService";
import LockedMedia from "../LockedMedia/lockedMedia";
import history from '../../../history';
import { AuthContext } from '../../../context/AuthContext';
import NewTipModal from "../../newTipModal";
// import FeedImageView from "../../FeedImageView";
import CommentSection from "../Comments/CommentSections";
import "./MediaCardStyle.css";

function MediaCard(props) {
    const [hexColor, setHexColor] = useState();
    const [userImg, setUserImg] = useState("https://northcliftonestates.ca/wp-content/uploads/2019/06/placeholder-images-image_large.png");
    const [commentIcon, setCommentIcon] = useState("https://image.flaticon.com/icons/svg/876/876221.svg");
    const [paywall, setPaywall] = useState(false);
    const [height, setHeight] = useState("73vh");
    const [containerInfoHeight, setContainerInfoHeight] = useState(60);
    const [comments, setComments] = useState(false);
    const [imageView, setImageView] = useState(false);
    const [imageError, setImageError] = useState(false);
    const authContext = useContext(AuthContext);

    document.body.style.overflow = "scroll"

    const style = {
        profileImgSmall: {
            borderColor: hexColor
        },
        imageArea: {
            maxWidth: 540,
        },
        containerInfo: {
            height: containerInfoHeight,
            display: "flex",
            alignItems: "start",
            transition: "all 0.3s ease-in-out",
            width: "95vw",
            maxWidth: 540
        }
    };

    useEffect(() => {
        getDisplayUserInfo();
        checkPaywall();
        getDimensions();
    }, []);

    const getDimensions = () => {
        var img = new Image();
        img.onload = function () {
            setHeight((this.height / this.width) * 540);
        }
        img.src = props.imgUrl;
    }

    const checkPaywall = () => {
        if (props.price) {
            setPaywall(true);
        } if (authContext.user.username === props.username) {
            setPaywall(false);
        } else {
            UserService.getUserInfo().then(data => {
                if (props.privileged.includes(data.id)) {
                    setPaywall(false);
                }
            })
        }
    }

    const getDisplayUserInfo = () => {
        UserService.getOtherUserInfo(props.username).then(data => {
            const { message } = data;
            if (!message) {
                setUserImg(data.profileImgSrc);
                setHexColor(data.color)
            }
        });
    }

    const toggleImageView = () => {
        setImageView(!imageView);
    }

    const toggleComments = () => {
        if (!comments) {
            setContainerInfoHeight(400);
            setCommentIcon("https://image.flaticon.com/icons/svg/876/876170.svg");
            setComments(!comments);
        } else {
            setContainerInfoHeight(60);
            setCommentIcon("https://image.flaticon.com/icons/svg/876/876221.svg");
            setComments(!comments);
        }
    }

    if (paywall) {
        //paywall
        return (
            <div className="card panel">
                <div className="imageArea" style={style.imageArea}>
                    <LockedMedia price={props.price} updatePaywall={() => (setPaywall(false))} id={props.id} username={props.username} getBalance={props.getBalance} imgUrl={props.imgUrl} height={height}></LockedMedia>
                </div>
                <div className="containerInfo" style={style.containerInfo}>
                    <div className="basicInfo">
                        <div className="outerProfileImageUsername clickable" onClick={() => (authContext.user.username === props.username ? history.push('/profile') : history.push('/user/' + props.username))}>
                            <div className="profileImageUsername">
                                <img className="profileImgSmall" style={style.profileImgSmall} src={userImg} alt="Avatar"></img>
                                <h4 className="userLink" >{props.username}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        //no paywall video post
        if (props.type === "video") {
            return (
                <div className="card panel">
                    <div >
                        <video style={style.imageArea}
                            id="my-player"
                            class="video-js vjs-theme-city"
                            controls
                            preload="auto"
                            poster="//vjs.zencdn.net/v/oceans.png"
                            data-setup='{}'>
                            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
                            <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
                            <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
                            <p class="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a
                                web browser that
                            <a href="https://videojs.com/html5-video-support/" target="_blank">
                                    supports HTML5 video
                            </a>
                            </p>
                        </video>
                    </div>
                    <div className="containerInfo">
                        <div className="userInfoMedia">
                            <div className="innerUserInfoMedia">
                                <img className="profileImgSmall" style={style.profileImgSmall} src={userImg} alt="Avatar"></img>
                                <a className="userLink" onClick={() => (authContext.user.username === props.username ? history.push('/profile') : history.push('/user/' + props.username))}><h4>{props.username}</h4></a>
                            </div>
                        </div>
                        <div className="containerTipArea">
                            {authContext.user.username === props.username ? null : <NewTipModal username={props.username} getBalance={props.getBalance} />}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                // no paywall photo post
                <div className={"card"}>
                    <div className="imageArea" style={style.imageArea}>
                        {imageError ? <div className="errorScreen" alt="Image not loading">Image not loading...</div> : <img className="feedImg" src={props.imgUrl} alt="post" onClick={() => toggleImageView()} onError={() => setImageError(true)} />}
                    </div>
                    <div className="containerInfo" style={style.containerInfo}>
                        <div className="basicInfo">
                            <div className="outerProfileImageUsername clickable" onClick={() => (authContext.user.username === props.username ? history.push('/profile') : history.push('/user/' + props.username))}>
                                <div className="profileImageUsername">
                                    <img className="profileImgSmall" style={style.profileImgSmall} src={userImg} alt="Avatar"></img>
                                    <h4 className="userLink" >{props.username}</h4>
                                </div>
                            </div>
                            <div className="outerButtons">
                                <div className="buttons">
                                    <img className="commentIcon clickable" src={commentIcon} alt="comment icon" onClick={() => toggleComments()}></img>
                                    <div className="tipIcon clickable">
                                        {authContext.user.username === props.username ? null : <NewTipModal username={props.username} getBalance={props.getBalance} ethPrice={props.ethPrice} />}
                                    </div>
                                </div>
                            </div>
                            {comments ? <CommentSection src={props.imgUrl} /> : null}
                            <button onClick={() => history.push("/17830921898230")}></button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MediaCard;