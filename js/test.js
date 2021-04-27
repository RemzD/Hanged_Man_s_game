 'use strict';

 import { WORDS } from './words.js';


 let sounds = [new Audio('./music/error.mp3'),
     new Audio('./music/gameover1.mp3'),
     new Audio('./music/continue.mp3'),
     new Audio('./music/winner.mp3'),
     new Audio('./music/kick.mp3')
 ];
 let Music1 = [new Audio('./music/Bleeps_Galore.mp3'),
     'audioBtn'
 ];
 let word = "";
 let underscore = [];
 let life = 12;
 let score = 0;

 let yes = document.getElementById('yes');
 let no = document.getElementById('no');
 let restart = document.getElementById('restart');

 let titlescreen = document.getElementById('titlescreen');
 let gamescreen = document.getElementById('gamescreen');
 let gameoverscreen = document.getElementById('gameoverscreen');

 yes.onclick = insertCoins;
 no.onclick = turnOff;

 document.getElementById('fade').onclick = fader;
 document.getElementById('ready').onclick = readyPlayer;
 let listeLettres = document.getElementsByClassName('touche');
 for (let i = 0; i < listeLettres.length; i++) {
     let id = listeLettres[i].id;
     listeLettres[i].onclick = function() { lettreSaisie(id) };
 };

 function rotate(buttonid) {
     let currentrotation = document.getElementById(buttonid).style.transform;
     if (currentrotation === "rotate(0deg)" || !currentrotation) {
         document.getElementById(buttonid).style.transform = "rotate(90deg)";
     } else {
         document.getElementById(buttonid).style.transform = "rotate(0deg)";
     }
 };

 function playPause(boutton) {
     let audio = boutton[0]; //met en pause la musique
     audio.volume = 0.08;
     audio.loop = true;
     if (audio.paused) {
         audio.play();


     } else {
         audio.pause();
     }

     if (window.innerWidth > 1080 && window.innerHeight < window.innerWidth) {
         rotate('audioBtn');
     }
 };

 document.getElementById('audioBtn').onclick = function() { playPause(Music1) };


 function fader() { //fait disparaître l'écran noir et affiche titlescreen
     let fadeTarget = document.getElementById("screenOff");
     let fadeEffect = setInterval(function() {
         if (!fadeTarget.style.opacity) {
             fadeTarget.style.opacity = 1;
         }
         if (fadeTarget.style.opacity > 0) {
             fadeTarget.style.opacity -= 0.1;
         } else {
             clearInterval(fadeEffect);
             fadeTarget.style.display = "none";
         }
     }, 170);

     if (window.innerWidth > 1080 && window.innerHeight < window.innerWidth) {
         rotate('fade');
     }

     document.getElementById('fade').disabled = true;
     document.getElementById('screen').style.boxShadow = "0px 0px 40px #eee";

     sounds[4].play();
     setTimeout(function() {
         Music1[0].play();
         Music1[0].volume = 0.08;
         Music1[0].loop = true;
         if (window.innerWidth > 1080 && window.innerHeight < window.innerWidth) {
             rotate('audioBtn');
         }
     }, 2500);

     titlescreen.style.display = "flex";
     score = 0;

 };

 function readyPlayer() { //lance l'interface de jeu
     titlescreen.style.display = "none";
     gamescreen.style.display = "flex";
     new_game();

 };



 function new_word() {
     let i = Math.floor(Math.random() * WORDS.length);
     let word = WORDS[i];
     return word;
 };

 function new_game() { //lancer une nouvelle partie
     life = 12;
     restart.style.display = "none";
     document.images['hangedman'].src = "images/" + life + ".png";
     underscore = [];
     word = new_word();
     for (let i = 0; i < word.length; i++) {
         underscore[i] = "_ ";
     };
     let wordDisplayed = document.getElementById('wordDisplayed');
     wordDisplayed.innerText = underscore.join('');
     let listeLettres = document.getElementsByClassName('touche');
     for (let i = 0; i < listeLettres.length; i++) {
         listeLettres[i].disabled = false;
         listeLettres[i].style.backgroundColor = "transparent";
     };

 };

 function saisie(btn) { //vérifie la saisie d'une lettre et vérifie si elle est contenue dans le mot
     let contient = false;
     for (let i = 0; i < word.length; i++) {
         if (btn == word[i]) {
             contient = true;
             underscore[i] = btn;
             document.getElementById(btn).style.backgroundColor = "green";

         }
     };

     if (!contient) {
         life--;
         document.images['hangedman'].src = "images/" + life + ".png";
         sounds[0].play();
     }

     if (life == 0) {
         gameoverscreen.style.display = "flex";
         gamescreen.style.display = "none";
         let listeLettres = document.getElementsByClassName('touche');
         for (let i = 0; i < listeLettres.length; i++) {
             listeLettres[i].disabled = true;
             if (!Music1[0].paused) {
                 rotate('audioBtn');
                 Music1[0].pause();
             }
             sounds[1].play();
             setTimeout(function() {
                 sounds[2].play();
                 sounds[2].volume = 0.3;
             }, 1500)
         };
     }
     if (underscore.join('') == word) {
         score++;
         sounds[3].play();
         restart.innerText = "Nouvelle partie";
         restart.style.display = "block";
         restart.onclick = new_game;
         document.getElementById('score').innerText = score;
         let listeLettres = document.getElementsByClassName('touche');
         for (let i = 0; i < listeLettres.length; i++) {
             listeLettres[i].disabled = true;
             listeLettres[i].style.backgroundColor = "green";
         };
     }

     let wordDisplayed = document.getElementById('wordDisplayed');
     wordDisplayed.innerText = underscore.join('');


 };


 function insertCoins() { //relance une partie
     gameoverscreen.style.display = "none";
     gamescreen.style.display = "flex";
     document.getElementById('wordDisplayed').innerText = "le mot a trouver etait " + word;
     restart.innerText = "Nouvelle partie";
     restart.style.display = "block";
     restart.onclick = new_game;
     sounds[2].muted = "true";
     Music1[0].play();
     let listeLettres = document.getElementsByClassName('touche');
     for (let i = 0; i < listeLettres.length; i++) {
         listeLettres[i].disabled = true;
         listeLettres[i].style.backgroundColor = "black";
     };
 }

 function turnOff() { //éteint la tv
     document.getElementById('screenOff').style.display = "block";
     document.getElementById('screenOff').style.opacity = 1;
     document.getElementById('fade').disabled = false;
     if (window.innerWidth > 1080 && window.innerHeight < window.innerWidth) {
         rotate('fade');
     }
     document.getElementById('titlescreen').style.display = "none";
     document.getElementById('gameoverscreen').style.display = "none";

 }

 function lettreSaisie(btn) { //désactive la touche déjà tapée
     document.getElementById(btn).disabled = true;
     document.getElementById(btn).style.backgroundColor = "black";
     saisie(btn);

 };