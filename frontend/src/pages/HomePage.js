import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner promocional */}
      <div className="bg-red-700 text-white py-2 text-center">
        ✨ Black de Ano Novo - Planos com 50% de desconto!
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Relógio do Amor" className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold mb-4">Surpreenda</h1>
          <h2 className="text-4xl font-bold text-red-500 mb-6">quem você ama</h2>
          <p className="text-xl mb-8">
            São os gestos simples que mais marcam. Demonstre seu carinho de
            maneira única, criando uma página especial para alguém que você ama.
          </p>

          {/* Formulário de início */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Nome do casal, Ex: Alan e Maria"
              className="w-full p-4 rounded-lg bg-gray-800 text-white mb-4"
            />
            <Link
              to="/criar"
              className="block w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Criar minha página →
            </Link>
          </div>
        </div>

        {/* Planos */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          {/* Plano Vitalício */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4">Vitalício</h3>
            <ul className="space-y-3 mb-6">
              <li>✓ Nome do Casal</li>
              <li>✓ Texto Dedicado</li>
              <li>✓ Contador de tempo</li>
              <li>✓ Máximo 6 imagens</li>
              <li>✓ Com Música</li>
              <li>✓ Sem prazo de validade</li>
            </ul>
            <div className="text-red-500">
              <span className="line-through">R$ 59,90</span>
              <div className="text-3xl font-bold">R$ 29,90</div>
              <span className="text-sm">uma vez</span>
            </div>
          </div>

          {/* Plano Anual */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4">Anual</h3>
            <ul className="space-y-3 mb-6">
              <li>✓ Nome do Casal</li>
              <li>✓ Texto Dedicado</li>
              <li>✓ Contador de tempo</li>
              <li>✓ Máximo 3 imagens</li>
              <li>✗ Com Música</li>
              <li>✗ Sem prazo de validade</li>
            </ul>
            <div className="text-red-500">
              <span className="line-through">R$ 39,90</span>
              <div className="text-3xl font-bold">R$ 19,90</div>
              <span className="text-sm">por ano</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
