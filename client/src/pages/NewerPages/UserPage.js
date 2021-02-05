import React, { useEffect, useState } from "react";
import Header from '../../components/components3/Header';
import UserPost from "../../components/components3/UserPost";
import videos from "../../videos.json";
import "./styles/userPageStyle.css";

export default function UserPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(videos);
    });

    return (
        <div>
            <Header page="profile" />
            <div id="outerProfileBody">
                <div id="profileBody">
                    <div id="profileInfo">
                        <div>
                            <img id="profileImage" src="https://lh3.googleusercontent.com/ogw/ADGmqu9lR4YTUnjkgrgeuoE-JBqu8RHR4wzA8Xum5zfqWw=s64-c-mo"></img>
                        </div>
                        <div id="profileInfoArea">
                            Jawm42
                            <div id="profileNumbers">
                                <div className="number">
                                    200 followers
                                </div>
                                <div className="number">
                                    3.24 eth earned
                                </div>
                                <div className="number">
                                    20 posts
                                </div>
                            </div>
                            <div id="profileButtons">
                                <div className="profileButton">
                                    create post
                                </div>
                                <div className="profileButton">
                                    following
                                </div>
                                <div className="profileButton">
                                    settings
                                </div>
                                <div className="profileButton">
                                    favorites
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="line">

                    </div>

                    <div id="grid">
                        {posts.map(post => {
                            if (!post.deleted) {
                                return <UserPost
                                    // className="mediaCard"
                                    // getBalance={props.getBalance}
                                    key={post.description}
                                    descript={post.description}
                                    color={post.color}
                                // imgUrl={post.imgSrc}
                                // price={post.price}
                                // privileged={post.privileged}
                                // username={post.user}
                                // ethPrice={props.ethPrice}
                                />
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

}