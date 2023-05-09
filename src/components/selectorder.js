import React from "react";
import Angel from '../assets/images/angel.png';
import Demon from '../assets/images/demon.png';
import Human from '../assets/images/human.png';

const SelectOrder = ({user, userUpdate = (u) => {}}) => {

    // Fired when the order as been choseen
    // selected equals to 0 = Angel / 1 = Human / 2 = Demon
    async function SelectedOrder(selected) {   
        // Criar cabeçalho
        var headers = new Headers();
        headers.set("eth-address", user.data.eth_address);
        headers.set("index", selected);

        // Fazer a requisição POST
        var auth = await fetch(process.env.REACT_APP_SERVER + "/order", 
        {
            method: "POST",
            headers
        });

        // Se for tudo ok
        if (auth.ok) {
            var json = await auth.json();
            if (json.update) {
                userUpdate(json);
            }
        }
    }

    return (
        <div>
            <p class="selectText">Choose your order:</p>
            <div class="selectionContainer">
                <div class="selectItem">
                    <p>Angel</p>
                    <img class="selectImage" src={Angel} alt="" onClick={SelectedOrder.bind(this, 0)} />
                </div>
                <div class="selectItem">
                    <p>Human</p>
                    <img class="selectImage" src={Human} alt="" onClick={SelectedOrder.bind(this, 1)} />
                </div>
                <div class="selectItem">
                    <p>Demon</p>
                    <img class="selectImage" src={Demon} alt="" onClick={SelectedOrder.bind(this, 2)} />
                </div>
            </div>
        </div>
    )
}

export default SelectOrder;