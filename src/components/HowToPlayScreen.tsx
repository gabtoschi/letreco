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
        <div className="d-flex align-items-center justify-content-around mb-4">
          <GuessLetterView letter="V" state="right"></GuessLetterView>
          <GuessLetterView letter="E" state="disabled"></GuessLetterView>
          <GuessLetterView letter="R" state="disabled"></GuessLetterView>
          <GuessLetterView letter="D" state="disabled"></GuessLetterView>
          <GuessLetterView letter="E" state="disabled"></GuessLetterView>
        </div>

        <p className="text-center">Se uma letra ficar amarela, ela está na palavra, mas na posição errada.</p>
        <div className="d-flex align-items-center justify-content-around mb-4">
          <GuessLetterView letter="A" state="disabled"></GuessLetterView>
          <GuessLetterView letter="U" state="disabled"></GuessLetterView>
          <GuessLetterView letter="R" state="displaced"></GuessLetterView>
          <GuessLetterView letter="E" state="disabled"></GuessLetterView>
          <GuessLetterView letter="O" state="disabled"></GuessLetterView>
        </div>

        <p className="text-center">Se uma letra ficar vermelha, ela NÃO está na palavra.</p>
        <div className="d-flex align-items-center justify-content-around mb-4">
          <GuessLetterView letter="R" state="disabled"></GuessLetterView>
          <GuessLetterView letter="U" state="disabled"></GuessLetterView>
          <GuessLetterView letter="B" state="disabled"></GuessLetterView>
          <GuessLetterView letter="R" state="disabled"></GuessLetterView>
          <GuessLetterView letter="O" state="wrong"></GuessLetterView>
        </div>

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