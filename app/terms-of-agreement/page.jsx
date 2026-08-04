// pages/terms-of-agreement.js
export default function TermsOfAgreement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gebruiksvoorwaarden</h1>
          
        <p className="mb-6 text-gray-600">
          Lees deze gebruiksvoorwaarden zorgvuldig voordat je onze website of diensten gebruikt. Door onze site te bezoeken of te gebruiken, ga je akkoord met deze voorwaarden.
        </p>

        <div className="space-y-6">

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Aanvaarding van voorwaarden</h2>
            <p className="text-gray-600">
              Door onze website te gebruiken, ga je akkoord met deze gebruiksvoorwaarden en met eventuele aanvullende voorwaarden, beleidsregels of richtlijnen die op de site zijn geplaatst.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Verantwoordelijkheden van gebruikers</h2>
            <p className="text-gray-600">
              Gebruikers moeten correcte informatie verstrekken, de rechten van anderen respecteren en de site niet gebruiken voor onwettige doeleinden. Overtredingen kunnen leiden tot opschorting of beëindiging van toegang.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Accountregistratie</h2>
            <p className="text-gray-600">
              Sommige functies vereisen een accountregistratie. Je bent verantwoordelijk voor de vertrouwelijkheid van je accountgegevens en voor alle activiteiten die via je account plaatsvinden.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Intellectuele eigendom</h2>
            <p className="text-gray-600">
              Alle inhoud op deze site is beschermd door auteursrecht, merkenrecht of andere wetgeving rond intellectuele eigendom. Gebruikers mogen inhoud niet kopiëren, verspreiden of wijzigen zonder geldige toestemming.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Beperking van aansprakelijkheid</h2>
            <p className="text-gray-600">
              Wij zijn niet aansprakelijk voor schade die voortvloeit uit het gebruik van deze website of diensten, inclusief directe, indirecte, incidentele of gevolgschade.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Wijzigingen van voorwaarden</h2>
            <p className="text-gray-600">
              Wij behouden ons het recht voor om deze gebruiksvoorwaarden op elk moment te wijzigen. Verder gebruik van de site na wijzigingen betekent dat je de bijgewerkte voorwaarden accepteert.
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Voorwaarden accepteren</button>
          <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition">Weigeren</button>
        </div>

    </div>
  )
}
