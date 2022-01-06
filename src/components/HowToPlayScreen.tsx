import { HowToPlayScreenProps } from "../models/header.model";
import GuessLetterView from "./GuessLetterView";
import Overlay from "./Overlay";
import '../styles/HowToPlayScreen.css';

function HowToPlayScreen(props: HowToPlayScreenProps) {
  return (
    <Overlay content={
      <div className="content">
        <h1 className="text-center">COMO JOGAR</h1>

        <p className="text-center">
          Todos os dias, uma nova palavra aparecerá no Letreco para você adivinhar.<br/>
          Você terá 6 tentativas. Cada uma delas deve ser uma palavra que exista.<br/>
          Acentos e cedilha são ignorados, tanto nas tentativas, quanto na resposta.<br/>
          Após enviar uma tentativa, a cor das letras mudará para indicar o quão perto você está da resposta.<br/>
          Ao fim do jogo, você pode compartilhar/copiar o seu resultado.
        </p>

        <hr/>

        <p className="text-center">Se uma letra ficar verde, ela está na palavra e na posição correta.</p>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="d-flex">
            <GuessLetterView letter="V" state="right" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="E" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="R" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="D" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="E" state="disabled"></GuessLetterView>
          </div>
        </div>

        <p className="text-center">Se uma letra ficar amarela, ela está na palavra, mas na posição errada.</p>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="d-flex">
            <GuessLetterView letter="A" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="U" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="R" state="displaced" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="E" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="O" state="disabled"></GuessLetterView>
          </div>
        </div>

        <p className="text-center">Se uma letra ficar vermelha, ela NÃO está na palavra.</p>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="d-flex">
            <GuessLetterView letter="R" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="U" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="B" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="R" state="disabled" marginRight={true}></GuessLetterView>
            <GuessLetterView letter="O" state="wrong"></GuessLetterView>
          </div>
        </div>

        <p className="text-center credits">
          criado por <a href="https://gabtoschi.com" target="_blank">Gabriel Toschi</a><br/>
          versão não-oficial do <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Wordle</a><br/>
          powered by <a href="https://pt-br.reactjs.org/" target="_blank">React</a>, <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="https://pages.github.com/" target="_blank">GitHub Pages</a><br/>
        </p>

        <div className="d-flex align-items-center justify-content-center">
          <button
            onClick={props.handleCloseScreen}
          >
            FECHAR
          </button>
        </div>

      </div>
    } />
  )
}

export default HowToPlayScreen;