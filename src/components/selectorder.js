import React from "react";
import Angel from '../assets/images/angel.png';
import Demon from '../assets/images/demon.png';
import Human from '../assets/images/human.png';

const SelectOrder = ({wallets}) => {

    // Fired when the order as been choseen
    // selected equals to 1 = Angel / 2 = Human / 3 = Demon
    function SelectedOrder(selected) {
        // after select save in db and redirect to /collect
        
    }

    return (
        <div>
            <p class="selectText">Choose your order:</p>
            <div class="selectionContainer">
                <div class="selectItem">
                    <p>Angel</p>
                    <img class="selectImage" src={Angel} alt="" onClick={SelectedOrder.bind(this, 1)} />
                </div>
                <div class="selectItem">
                    <p>Human</p>
                    <img class="selectImage" src={Human} alt="" onClick={SelectedOrder.bind(this, 2)} />
                </div>
                <div class="selectItem">
                    <p>Demon</p>
                    <img class="selectImage" src={Demon} alt="" onClick={SelectedOrder.bind(this, 3)} />
                </div>
            </div>
        </div>
    )
}

export default SelectOrder;