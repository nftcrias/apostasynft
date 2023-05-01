import React from "react";

const ChooseDialog = ({textOption1, textOption2, onDialogFinishCallback, setChooseDialog}) => {

    function OnSelectOption(e) {
        setChooseDialog(false);
        onDialogFinishCallback(e);
    }

    return (
        <div>
          <div class="chooseDialogContainer">
            <div class="chooseItem">
                <div class="chooseButton" onClick={OnSelectOption.bind(this, 1)}><div class="buttonText">{textOption1}</div></div>
            </div>
            <div class="chooseItem">
                <div class="chooseButton" onClick={OnSelectOption.bind(this, 2)}><div class="buttonText">{textOption2}</div></div>
            </div>
          </div>
        </div>
    )
}

export default ChooseDialog;