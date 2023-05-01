import React from "react";
import $ from 'jquery';

const TypeDialog = ({textQuestion, onDialogFinishCallback, setTypeDialog}) => {

    function OnSelectOption() {
      var typeField = $('#typeField');

      let answer = typeField.val();

      setTypeDialog(false);
      onDialogFinishCallback(answer);
    }

    return (
        <div>
          <div class="typeDialogContainer">
            <div class="typeDialogText">{textQuestion}</div>
            <div><input id="typeField" type="text" placeholder="" /></div>
            <div class="button" onClick={OnSelectOption}>
              <div class="buttonText">Answer</div>
            </div>
          </div>
        </div>
    )
}

export default TypeDialog;