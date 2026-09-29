'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PESSOAS = ['Paulo', 'Miguel', 'Rodolfo', 'Rodrigo', 'Tiago', 'Antonio'];

const DESCRICOES = {
  Paulo: {
    imagem: '/imagens/paulo.jpg',
    titulo: 'PaPaPaulo',
    frase: '"BENFICAAA CRLLL"',
  },
  Miguel: {
    imagem: '/imagens/miguel.png',
    titulo: 'Bilo',
    frase: 'Aldeano e Autista',
  
  },
  Rodolfo: {
    imagem: '/imagens/rodolfo.jpg',
    titulo: 'Beto Espanhol',
    frase: 'Viva aroche',
  },
  Rodrigo: {
    imagem: '/imagens/rodrigo.jpg',
    titulo: 'Piruka',
    frase: 'Safadinho do poço acima',
  },
  Tiago: {
    imagem: '/imagens/tiago.jpg',
    titulo: 'Mister',
    frase: 'Aldeanos é no chão',
  },
  Antonio: {
    imagem: '/imagens/antonio.jpg',
    titulo: 'Rato',
    frase: 'Ginasio, corridas e bater sacanas',
  },
};

const PERGUNTAS = [
  {
    texto: 'Hoje joga o Benfica, o que vou fazer?',
    opcoes: [
      { texto: 'BENFICAAA CRLLL', pontos: { Paulo: 3, Tiago: 1, Antonio: 1 } },
      { texto: 'Quero que o Benfica se foda', pontos: { Miguel: 3, Rodolfo: 1 } },
      { texto: 'Vou mas é para o estádio', pontos: { Antonio: 3, Tiago: 3 } },
      { texto: 'Prefiro bater a sacana', pontos: { Rodrigo: 3, Miguel: 2 } },
    ],
  },
  {
    texto: 'Uma gaja mandou-me mensagem',
    opcoes: [
      { texto: 'FORA MEDO', pontos: { Miguel: 3, Rodolfo: 2 } },
      { texto: 'Prefiro homens', pontos: { Rodrigo: 3, Tiago: 1 } },
      { texto: 'Lenhaaaa', pontos: { Antonio: 2, Rodrigo: 2 } },
      { texto: 'BENFICA CRLLL', pontos: { Paulo: 3, Tiago: 2 } },
    ],
  },
  {
    texto: 'Quero ir beber uma mini esta tarde, onde vou?',
    opcoes: [
      { texto: 'Bica', pontos: { Paulo: 2, Tiago: 2, Miguel: 1 } },
      { texto: 'Não bebo', pontos: { Antonio: 3, Rodrigo: 1 } },
      { texto: 'Rosal', pontos: { Rodolfo: 3 } },
      { texto: 'Zé Luís', pontos: { Miguel: 3, Antonio: 1 } },
    ],
  },
  {
    texto: 'Tou aborrecido, o que vou fazer?',
    opcoes: [
      { texto: 'Bater uma sacana', pontos: { Rodrigo: 2, Miguel: 3, Antonio: 1 } },
      { texto: 'Apanhar um pau', pontos: { Paulo: 3, Rodolfo: 1 } },
      {
        texto: 'Ir ver highlights do Óscar Cardozo (GOAT)',
        pontos: { Antonio: 2, Tiago: 3 },
      },
      { texto: 'Conduzir bêbado e perder a carta', pontos: { Rodolfo: 3 } },
    ],
  },
  {
    texto: 'Ofereceram-me 1 mês grátis no HBFitness, o que vou fazer?',
    opcoes: [
      {
        texto: 'Dar uma sova na pessoa que me fez isso, aldeia é merda',
        pontos: { Tiago: 4, Paulo: 1 },
      },
      { texto: 'Vou aceitar porque sou aldeano', pontos: { Miguel: 3, Rodolfo: 1 } },
      {
        texto: 'Vou recusar mas sou aldeano na mesma',
        pontos: { Rodolfo: 3, Rodrigo: 2 },
      },
      { texto: 'Sou team Finnis', pontos: { Antonio: 3, Tiago: 2 } },
    ],
  },
  {
    texto: 'Qual a derivada de 2x + 2?',
    opcoes: [
      { texto: 'Os americanos o quê?', pontos: { Miguel: 3, Rodolfo: 1 } },
      { texto: '2', pontos: { Paulo: 3, Tiago: 2 } },
      {
        texto: '7 e 7 são 14, cala a boca e não me chateies',
        pontos: { Antonio: 3, Tiago: 1 },
      },
      { texto: 'Fds já chega dessa merda', pontos: { Rodrigo: 3, Rodolfo: 2 } },
    ],
  },
  {
    texto: 'Completa a frase: EU SOU ___________',
    opcoes: [
      { texto: 'BENFICAAA CRLLL', pontos: { Paulo: 3, Tiago: 2, Antonio: 1 } },
      { texto: 'Aldeano', pontos: { Miguel: 3, Rodolfo: 3 } },
      { texto: 'China', pontos: { Antonio: 3, Paulo: 2, Miguel: 2 } },
      { texto: 'Paneleiro', pontos: { Rodrigo: 3, Miguel: 1 } },
    ],
  },
  {
    texto: 'Vou de férias para onde?',
    opcoes: [
      { texto: 'Rosal', pontos: { Rodolfo: 3, Miguel: 1 } },
      { texto: 'Ficalho', pontos: { Tiago: 3, Antonio: 1 } },
      { texto: 'Algarve', pontos: { Rodrigo: 1, Paulo: 1 } },
      { texto: 'Aldeia', pontos: { Rodrigo: 3, Rodolfo: 1 } },
    ],
  },
  {
    texto: 'Quero ir pinar, para onde vou?',
    opcoes: [
      {
        texto: 'Cruzeiro da Aldeia',
        pontos: { Rodrigo: 3, Paulo: 1, Miguel: 1 },
      },
      { texto: 'Putas do Rosal', pontos: { Miguel: 1, Rodolfo: 3 } },
      { texto: 'Estádio da Luz', pontos: { Antonio: 1, Tiago: 3 } },
      { texto: 'Ermida', pontos: { Miguel: 2, Paulo: 2 } },
    ],
  },
  {
    texto: 'Estive em Lisboa hoje, mas...',
    opcoes: [
      { texto: 'Isto é uma merda, tou farto disto', pontos: { Tiago: 4 } },
      { texto: 'Só quero saber do Benfica', pontos: { Antonio: 3, Tiago: 1 } },
      { texto: 'Até não é mau', pontos: { Paulo: 3, Rodrigo: 2 } },
      { texto: 'Prefiro a Aldeia', pontos: { Miguel: 3, Rodolfo: 2 } },
    ],
  },
];

const estadoInicial = () => Object.fromEntries(PESSOAS.map((p) => [p, 0]));

export default function Page() {
  const [ecra, setEcra] = useState('inicio');
  const [indice, setIndice] = useState(0);
  const [pontos, setPontos] = useState(estadoInicial);

  const responder = (opcao) => {
    const novos = { ...pontos };
    Object.entries(opcao.pontos).forEach(([p, v]) => {
      novos[p] = (novos[p] || 0) + v;
    });
    setPontos(novos);

    if (indice + 1 < PERGUNTAS.length) setIndice(indice + 1);
    else setEcra('resultado');
  };

  const reiniciar = () => {
    setIndice(0);
    setPontos(estadoInicial());
    setEcra('inicio');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {ecra === 'inicio' && <Inicio onComecar={() => setEcra('quiz')} />}
        {ecra === 'quiz' && (
          <PerguntaScreen
            key={indice}
            pergunta={PERGUNTAS[indice]}
            indice={indice}
            total={PERGUNTAS.length}
            onResponder={responder}
          />
        )}
        {ecra === 'resultado' && (
          <Resultado pontos={pontos} onReiniciar={reiniciar} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Inicio({ onComecar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-2xl"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
      >
        Qual dos 6 és tu?
      </motion.h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10">
        10 perguntas. 6 lendas. Descobre qual deles vive dentro de ti.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComecar}
        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow"
      >
        Começar 🚀
      </motion.button>
    </motion.div>
  );
}

function PerguntaScreen({ pergunta, indice, total, onResponder }) {
  const progresso = (indice / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl"
    >
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>
            Pergunta {indice + 1} / {total}
          </span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
        {pergunta.texto}
      </h2>

      <div className="grid gap-3">
        {pergunta.opcoes.map((opcao, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onResponder(opcao)}
            className="text-left p-4 md:p-5 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-purple-400/80 hover:bg-slate-800/80 transition-all backdrop-blur"
          >
            <span className="font-semibold">{opcao.texto}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function Resultado({ pontos, onReiniciar }) {
  const ranking = Object.entries(pontos).sort((a, b) => b[1] - a[1]);
  const [vencedor] = ranking[0];
  const info = DESCRICOES[vencedor];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl text-center"
    >
      <p className="text-slate-400 uppercase tracking-widest text-sm mb-4">
        O resultado é...
      </p>

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, delay: 0.15 }}
        className="relative inline-block mb-6"
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${info.cor} blur-2xl opacity-60`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={info.imagem}
          alt={vencedor}
          className={`relative w-56 h-56 md:w-72 md:h-72 rounded-2xl object-contain border-4 border-white/10 shadow-2xl bg-slate-900`}
        />
      </motion.div>

      <h1
        className={`text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r ${info.cor} bg-clip-text text-transparent`}
      >
        {vencedor}
      </h1>
      <p className="text-lg text-purple-300 font-bold mb-1">{info.titulo}</p>
      <p className="text-slate-400 italic mb-6">{info.frase}</p>
      <p className="text-slate-200 mb-10 max-w-lg mx-auto leading-relaxed">
        {info.descricao}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReiniciar}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold shadow-lg shadow-purple-500/40"
      >
        Jogar outra vez 🔁
      </motion.button>
    </motion.div>
  );
}