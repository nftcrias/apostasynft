import React from "react";

const CollectBlood = ({order}) => {

    /* 
    FAZER O PÓS DEPOIS QUE AS MISSÕES SÃO FEITAS
    FAZER O PLAY COM O SOM DAS TOCHAS
    FAZER O CHAT COM DOIS DIFERENTES TIPOS DE INPUTS
    */

    order = "Human"
    let contribution = 2;
    let referralLink = 'https://apostasy.io/a13sSj';

    async function ConnectTwitter() {

    }

    async function Follow() {

    }

    async function Retweet() {

    }

    function Copy() {
        navigator.clipboard.writeText(referralLink);
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
                <div class="buttonSmall" onClick={ConnectTwitter}>Connect Twitter</div>
                <p class="plusBlood">+1 Blood</p>
            </div>

            <div class="missionContainer">
                <div class="buttonSmall" onClick={Follow}>Follow</div>
                <p class="plusBlood">+1 Blood</p>
            </div>

            <div class="missionContainer">
                <div class="buttonSmall" onClick={Retweet}>Retweet</div>
                <p class="plusBlood">+1 Blood</p>
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