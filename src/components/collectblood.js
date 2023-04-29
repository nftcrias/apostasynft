import React, { useState, useEffect } from "react";

const CollectBlood = ({orderParam}) => {

    const [order, setOrder] = useState('');

    const [referralLink, setReferralLink] = useState('');

    const [contribution, setContribution] = useState(0);

    const [twitter, setTwitter] = useState('');

    const [missions, setMissions] = useState([0,0,0]);

    // run at start
    useEffect(()=> {
        // use this methods to update the infos in the page
        setOrder("Human");
        setReferralLink('https://apostasy.io/a13sSj');
        setContribution(1);
        setMissions([1,1,1]);
        setTwitter("@Example");
    },[]);

    async function ConnectTwitter() {

    }

    async function Follow() {

    }

    async function Retweet() {

    }

    function Copy() {
        navigator.clipboard.writeText(referralLink);
    }

    function plusBloodColor(i) {
        return (missions[i] === 0 ? "plusBlood" : "plusBloodDone");
    }

    return (
        <div>
            <div class="orderText">
                <p>Help your order:</p>
                <p>{order}</p>
            </div>
            <div class="contributionText">
                <p>Your contribution: {String(contribution).padStart(2, '0')}</p>
            </div>
            
            <div class="missionContainer">
                {missions[0] === 0 && <div class="buttonSmall" onClick={ConnectTwitter}>Connect Twitter</div>}
                {missions[0] === 1 && <div class="buttonSmall2" >Connected as <br /> {twitter}</div>}
                <p class={plusBloodColor(0)}>+1 Blood</p>
            </div>

            <div class="missionContainer">
                {missions[1] === 0 && <div class="buttonSmall" onClick={Follow}>Follow</div>}
                {missions[1] === 1 && <div class="buttonSmall3" >Already Following</div>}
                <p class={plusBloodColor(1)}>+1 Blood</p>
            </div>

            <div class="missionContainer">
                {missions[2] === 0 && <div class="buttonSmall" onClick={Retweet}>Retweet</div>}
                {missions[2] === 1 && <div class="buttonSmall3">Retweeted</div>}
                <p class={plusBloodColor(2)}>+1 Blood</p>
            </div>
            
            <div class="referralBox">
                <p class="referralText">Collect more blood:</p>
                <p class="referralLink">{referralLink}</p>
                <div class="buttonSmall" onClick={Copy}>Copy</div>
                <p class="plusBlood">+1 Blood per invite</p>
            </div>
            
        </div>
    )
}

export default CollectBlood;