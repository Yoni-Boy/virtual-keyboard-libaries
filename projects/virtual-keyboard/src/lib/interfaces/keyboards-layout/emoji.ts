import { KeyboardLayout } from "./keyboard-layout"
//https://fsymbols.com/emoticons/
export const Emoji : KeyboardLayout =
{
  name: "Emoji",
  lang: "emo",
  default: [
    "; 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} / ' ☺ ☻ ♥ ♦ ♣ ✌ ☮ 🍾 ] [ \\",
    "\u05e9 ♂ ⚤ ✡ 🎸 🙈 👏 👌 🙏 ♥ , {enter}",
    "{shift} \\ 💋 💔 😍 ☠ 💰 🔥 🚑 👓 \u05e5 . {shift}",
    "{accept} {alt} {space} {alt} {cancel}"],
  shift: [
    "~ ! @ # $ % ^ & * ) ( _ + {bksp}",
    "{tab} Q W E R T Y U I O P } { |",
    "A S D F G H J K L : \" {enter}",
    "{shift} | Z X C V B N M > < / {shift}",
    "{accept} {alt} {space} {alt} {cancel}"
  ],
  alt: [
    "{empty} {empty} {empty} {empty} \u20aa {empty} {empty} {empty} {empty} {empty} {empty} \u05bf {empty} {bksp}",
    "{tab} {empty} {empty} \u20ac {empty} {empty} {empty} \u05f0 {empty} {empty} {empty} {empty} {empty} {empty}",
    "{empty} {empty} {empty} {empty} {empty} \u05f2 \u05f1 {empty} {empty} {empty} {empty} {enter}",
    "{shift} {empty} {empty} {empty} {empty} {empty} {empty} {empty} {empty} {empty} {empty} {empty} {shift}",
    "{accept} {alt} {space} {alt} {cancel}"
  ],
  getDefaultDiplay() {
    return {
      "{bksp}": "backspace",
      "{backspace}": "backspace",
      "{enter}": "< enter",
      "{shift}": "shift",
      "{shiftleft}": "shift",
      "{shiftright}": "shift",
      "{alt}": "alt",
      "{s}": "shift",
      "{tab}": "tab",
      "{lock}": "caps",
      "{capslock}": "caps",
      "{accept}": "Submit",
      "{space}": "רווח",
      "{//}": " ",
      "{esc}": "esc",
      "{escape}": "esc",
      "{f1}": "f1",
      "{f2}": "f2",
      "{f3}": "f3",
      "{f4}": "f4",
      "{f5}": "f5",
      "{f6}": "f6",
      "{f7}": "f7",
      "{f8}": "f8",
      "{f9}": "f9",
      "{f10}": "f10",
      "{f11}": "f11",
      "{f12}": "f12",
      "{numpaddivide}": "/",
      "{numlock}": "lock",
      "{arrowup}": "↑",
      "{arrowleft}": "←",
      "{arrowdown}": "↓",
      "{arrowright}": "→",
      "{prtscr}": "print",
      "{scrolllock}": "scroll",
      "{pause}": "pause",
      "{insert}": "ins",
      "{home}": "home",
      "{pageup}": "up",
      "{delete}": "del",
      "{forwarddelete}": "del",
      "{end}": "end",
      "{pagedown}": "down",
      "{numpadmultiply}": "*",
      "{numpadsubtract}": "-",
      "{numpadadd}": "+",
      "{numpadenter}": "enter",
      "{period}": ".",
      "{numpaddecimal}": ".",
      "{numpad0}": "0",
      "{numpad1}": "1",
      "{numpad2}": "2",
      "{numpad3}": "3",
      "{numpad4}": "4",
      "{numpad5}": "5",
      "{numpad6}": "6",
      "{numpad7}": "7",
      "{numpad8}": "8",
      "{numpad9}": "9",
    }
  }
}
