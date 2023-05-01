import React, { useEffect, useState } from "react";
import autoType from './autotype.js';
import $ from 'jquery';
import ChooseDialog from './choosedialog.js';
import TypeDialog from './typedialog.js';

const RpgWindow = ({}) => {

    let defaultBoxId = 'rpgTextBox';

    const [chooseDialog, setChooseDialog] = useState(false);

    const [typeDialog, setTypeDialog] = useState(false);

    const [dialogTexts, setDialogTexts] = useState(['', '']);

    const [dialogFinishCallback, setDialogFinishCallback] = useState(() => (e) => {});

    function addInstaText(text) {
        var textBox = $('#' + defaultBoxId);

        textBox.text(text);

        textBox.scrollTop(Number.MAX_SAFE_INTEGER);
    }

    function addAutoTypeText(text, beforeLinesAdd, onFinishCallback) {
        autoType('#' + defaultBoxId, text, beforeLinesAdd, onFinishCallback);
    }

    function callChooseDialog(textOption1, textOption2, onDialogFinishCallback) {
        setDialogFinishCallback(() => (e) => { onDialogFinishCallback(e); });
        setChooseDialog(true);
        setDialogTexts([textOption1, textOption2]);
    }

    function callTypeDialog(textQuestion, onDialogFinishCallback) {
        setDialogFinishCallback(() => (e) => { onDialogFinishCallback(e); });
        setTypeDialog(true);
        setDialogTexts([textQuestion]);
    }

    useEffect(()=> {
        let text = "Darkness takes over the forest and the only source of light is your torch. Dangerous creatures are on the prowl, but there's something more sinister in the shadows. You feel that something mysterious is hiding around you and you don't know what it is. Will you find the way out before this presence reveals itself?";

        addInstaText(text);

        //addAutoTypeText(text, 2, function() { addAutoTypeText(text, 2, function() {  }); } );
        addAutoTypeText(text, 2, function() { callChooseDialog('Ir floresta adentro', 'Desviar pelo riacho', function(e) { alert(e); }); } );
        //addAutoTypeText(text, 2, function() { callTypeDialog('O que você deseja fazer?', function(e) { alert(e); }); } );
    },[]);

    return (
        <div class="rpgWindow">
            <div id={defaultBoxId}></div>
            {chooseDialog && <ChooseDialog textOption1={dialogTexts[0]} textOption2={dialogTexts[1]} onDialogFinishCallback={dialogFinishCallback} setChooseDialog={setChooseDialog} />}
            {typeDialog && <TypeDialog textQuestion={dialogTexts[0]} onDialogFinishCallback={dialogFinishCallback} setTypeDialog={setTypeDialog} />}
        </div>
    )
}

export default RpgWindow;